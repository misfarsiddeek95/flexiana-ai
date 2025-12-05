import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { FileText, Briefcase, Users } from "lucide-react";

export default async function DashboardPage() {
    const blogCount = await prisma.blog.count();
    const caseStudyCount = await prisma.caseStudy.count();
    const userCount = await prisma.systemUser.count();

    return (
        <div>
            <h1 className="mb-8 text-3xl font-bold text-gray-900">Dashboard</h1>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <div className="rounded-lg bg-white p-6 shadow-md">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Total Blogs</p>
                            <p className="mt-2 text-3xl font-bold text-gray-900">
                                {blogCount}
                            </p>
                        </div>
                        <FileText className="h-10 w-10 text-blue-500" />
                    </div>
                    <Link
                        href="/control/blogs"
                        className="mt-4 block text-sm font-medium text-blue-600 hover:text-blue-500"
                    >
                        Manage Blogs &rarr;
                    </Link>
                </div>
                <div className="rounded-lg bg-white p-6 shadow-md">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">
                                Total Case Studies
                            </p>
                            <p className="mt-2 text-3xl font-bold text-gray-900">
                                {caseStudyCount}
                            </p>
                        </div>
                        <Briefcase className="h-10 w-10 text-green-500" />
                    </div>
                    <Link
                        href="/control/case-studies"
                        className="mt-4 block text-sm font-medium text-blue-600 hover:text-blue-500"
                    >
                        Manage Case Studies &rarr;
                    </Link>
                </div>
                <div className="rounded-lg bg-white p-6 shadow-md">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Total Users</p>
                            <p className="mt-2 text-3xl font-bold text-gray-900">
                                {userCount}
                            </p>
                        </div>
                        <Users className="h-10 w-10 text-purple-500" />
                    </div>
                    <Link
                        href="/control/users"
                        className="mt-4 block text-sm font-medium text-blue-600 hover:text-blue-500"
                    >
                        Manage Users &rarr;
                    </Link>
                </div>
            </div>
        </div>
    );
}
