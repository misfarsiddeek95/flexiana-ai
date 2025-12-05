import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/control/login",
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                const user = await prisma.systemUser.findUnique({
                    where: {
                        email: credentials.email,
                    },
                    include: {
                        userType: true,
                    },
                });

                if (!user || !user.active) {
                    return null;
                }

                const isPasswordValid = await bcrypt.compare(
                    credentials.password,
                    user.password
                );

                if (!isPasswordValid) {
                    return null;
                }

                // Parse permissions from JSON string
                console.log("Raw permissions from DB:", user.userType.permissions);
                const permissions = JSON.parse(user.userType.permissions || "[]");
                console.log("Parsed permissions:", permissions);

                return {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    userType: user.userType.name,
                    permissions,
                };
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            console.log("JWT callback - user:", user);
            console.log("JWT callback - token before:", token);
            if (user) {
                token.userType = (user as any).userType;
                token.permissions = (user as any).permissions;
                token.id = user.id;
            }
            console.log("JWT callback - token after:", token);
            return token;
        },
        async session({ session, token }) {
            console.log("Session callback - token:", token);
            console.log("Session callback - session before:", session);
            if (session.user) {
                (session.user as any).userType = token.userType;
                (session.user as any).permissions = token.permissions as string[];
                (session.user as any).id = token.id;
            }
            console.log("Session callback - session after:", session);
            return session;
        },
    },
};
