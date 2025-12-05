import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Sidebar } from "@/components/cms/Sidebar";
import { AuthProvider } from "@/components/AuthProvider";

export default async function CMSLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/control/login");
    }

    return (
        <AuthProvider>
            <div className="flex min-h-screen bg-gray-100">
                <aside className="sticky top-0 h-screen shrink-0">
                    <Sidebar />
                </aside>
                <main className="flex-1 p-8">{children}</main>
            </div>
        </AuthProvider>
    );
}
