import { prisma } from "@/lib/prisma";
import { CaseStudyForm } from "@/components/cms/CaseStudyForm";
import { PERMISSIONS } from "@/lib/permissions";
import { getUserPermissions } from "@/lib/auth-helpers";
import { hasPermission } from "@/lib/permissions";
import { PermissionDenied } from "@/components/cms/PermissionDenied";
import type { CaseStudy } from "@prisma/client";

export default async function CaseStudyEditPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const isNew = id === "new";

    // Check permissions
    const userPermissions = await getUserPermissions();
    if (isNew) {
        if (!hasPermission(userPermissions, PERMISSIONS.CASE_STUDIES.CREATE)) {
            return <PermissionDenied />;
        }
    } else {
        if (!hasPermission(userPermissions, PERMISSIONS.CASE_STUDIES.EDIT)) {
            return <PermissionDenied />;
        }
    }

    let caseStudy: CaseStudy | null = null;
    if (!isNew) {
        caseStudy = await prisma.caseStudy.findUnique({
            where: { id },
        });
    }

    return (
        <div>
            <h1 className="mb-6 text-2xl font-bold text-gray-900">
                {isNew ? "Create New Case Study" : "Edit Case Study"}
            </h1>
            <CaseStudyForm initialData={caseStudy} isNew={isNew} />
        </div>
    );
}
