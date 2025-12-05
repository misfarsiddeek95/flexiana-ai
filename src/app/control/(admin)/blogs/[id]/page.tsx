import { prisma } from "@/lib/prisma";
import { BlogForm } from "@/components/cms/BlogForm";
import { PERMISSIONS } from "@/lib/permissions";
import { getUserPermissions } from "@/lib/auth-helpers";
import { hasPermission } from "@/lib/permissions";
import { PermissionDenied } from "@/components/cms/PermissionDenied";

export default async function BlogEditPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const isNew = id === "new";

    // Check permissions
    const userPermissions = await getUserPermissions();
    if (isNew) {
        if (!hasPermission(userPermissions, PERMISSIONS.BLOGS.CREATE)) {
            return <PermissionDenied />;
        }
    } else {
        if (!hasPermission(userPermissions, PERMISSIONS.BLOGS.EDIT)) {
            return <PermissionDenied />;
        }
    }

    let blog = null;
    if (!isNew) {
        const rawBlog = await prisma.blog.findUnique({
            where: { id },
        });
        if (rawBlog) {
            blog = {
                ...rawBlog,
                publishDate: new Date(rawBlog.publishDate)
                    .toISOString()
                    .split("T")[0],
            };
        }
    }

    return (
        <div>
            <h1 className="mb-6 text-2xl font-bold text-gray-900">
                {isNew ? "Create New Blog" : "Edit Blog"}
            </h1>
            <BlogForm initialData={blog} isNew={isNew} />
        </div>
    );
}
