"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { cn } from "../../lib/utils";
import {
    LayoutDashboard,
    Users,
    FileText,
    Briefcase,
    LogOut,
    Shield,
} from "lucide-react";
import { signOut } from "next-auth/react";
import { hasPermission } from "@/lib/permissions";
import { PERMISSIONS } from "@/lib/permissions";

const sidebarItems = [
    {
        title: "Dashboard",
        href: "/control",
        icon: LayoutDashboard,
        permission: PERMISSIONS.DASHBOARD.VIEW,
    },
    {
        title: "Users",
        href: "/control/users",
        icon: Users,
        permission: PERMISSIONS.USERS.VIEW,
    },
    {
        title: "User Types",
        href: "/control/user-types",
        icon: Shield,
        permission: PERMISSIONS.USER_TYPES.VIEW,
    },
    {
        title: "Blogs",
        href: "/control/blogs",
        icon: FileText,
        permission: PERMISSIONS.BLOGS.VIEW,
    },
    {
        title: "Case Studies",
        href: "/control/case-studies",
        icon: Briefcase,
        permission: PERMISSIONS.CASE_STUDIES.VIEW,
    },
];

interface UserWithPermissions {
    permissions?: string[];
}

export function Sidebar() {
    const pathname = usePathname();
    const { data: session } = useSession();
    const user = session?.user as UserWithPermissions | undefined;
    const userPermissions = user?.permissions || [];

    // Debug logging
    console.log("Sidebar - Session:", session);
    console.log("Sidebar - User:", session?.user);
    console.log("Sidebar - Permissions:", userPermissions);

    // Filter menu items based on user permissions
    const visibleItems = sidebarItems.filter((item) =>
        hasPermission(userPermissions, item.permission)
    );

    console.log("Sidebar - Visible items count:", visibleItems.length);

    return (
        <div className="flex h-full w-64 flex-col bg-gray-900 text-white">
            <div className="flex h-16 items-center justify-center border-b border-gray-800">
                <h1 className="text-xl font-bold">Flexiana CMS</h1>
            </div>
            <nav className="flex-1 space-y-1 px-2 py-4">
                {visibleItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "group flex items-center rounded-md px-2 py-2 text-sm font-medium",
                                isActive
                                    ? "bg-gray-800 text-white"
                                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                            )}
                        >
                            <item.icon
                                className={cn(
                                    "mr-3 h-6 w-6 flex-shrink-0",
                                    isActive
                                        ? "text-white"
                                        : "text-gray-400 group-hover:text-gray-300"
                                )}
                                aria-hidden="true"
                            />
                            {item.title}
                        </Link>
                    );
                })}
            </nav>
            <div className="border-t border-gray-800 p-4">
                <button
                    onClick={() => signOut({ callbackUrl: "/control/login" })}
                    className="group flex w-full items-center rounded-md px-2 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                >
                    <LogOut
                        className="mr-3 h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-300"
                        aria-hidden="true"
                    />
                    Sign Out
                </button>
            </div>
        </div>
    );
}
