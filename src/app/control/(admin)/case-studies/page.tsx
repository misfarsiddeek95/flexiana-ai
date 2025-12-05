import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { CaseStudy } from "@prisma/client";
import { Plus, Edit } from "lucide-react";
import { DeleteButton } from "@/components/cms/DeleteButton";
import { ViewButton } from "@/components/cms/ViewButton";

import { PERMISSIONS } from "@/lib/permissions";
import { getUserPermissions } from "@/lib/auth-helpers";
import { hasPermission } from "@/lib/permissions";

export default async function CaseStudiesPage() {
    const caseStudies = await prisma.caseStudy.findMany({
        orderBy: {
            createdAt: "desc",
        },
    });

    // Get current user's permissions server-side
    const userPermissions = await getUserPermissions();
    const canCreate = hasPermission(userPermissions, PERMISSIONS.CASE_STUDIES.CREATE);
    const canEdit = hasPermission(userPermissions, PERMISSIONS.CASE_STUDIES.EDIT);
    const canDelete = hasPermission(userPermissions, PERMISSIONS.CASE_STUDIES.DELETE);

    return (
        <div>
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">Case Studies</h1>
                {canCreate && (
                    <Link
                        href="/control/case-studies/new"
                        className="flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                    >
                        <Plus className="mr-2 h-4 w-4" />
                        Create New
                    </Link>
                )}
            </div>

            <div className="overflow-hidden rounded-lg bg-white shadow">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                            >
                                Title
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                            >
                                Client
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                            >
                                Industry
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                            >
                                Status
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                            >
                                Home
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500"
                            >
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                        {caseStudies.map((cs: CaseStudy) => (
                            <tr key={cs.id}>
                                <td className="whitespace-nowrap px-6 py-4">
                                    <div className="text-sm font-medium text-gray-900">
                                        {cs.title}
                                    </div>
                                    <div className="text-sm text-gray-500">{cs.slug}</div>
                                </td>
                                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                    {cs.client}
                                </td>
                                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                    {cs.industry}
                                </td>
                                <td className="whitespace-nowrap px-6 py-4">
                                    <span
                                        className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${cs.active
                                            ? "bg-green-100 text-green-800"
                                            : "bg-red-100 text-red-800"
                                            }`}
                                    >
                                        {cs.active ? "Active" : "Inactive"}
                                    </span>
                                </td>
                                <td className="whitespace-nowrap px-6 py-4">
                                    <span
                                        className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${(cs as any).showInHome
                                            ? "bg-blue-100 text-blue-800"
                                            : "bg-gray-100 text-gray-800"
                                            }`}
                                    >
                                        {(cs as any).showInHome ? "Yes" : "No"}
                                    </span>
                                </td>
                                <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                                    <div className="flex justify-end">
                                        <ViewButton href={`/control/case-studies/${cs.id}/view`} />
                                        {canEdit && (
                                            <Link
                                                href={`/control/case-studies/${cs.id}`}
                                                className="mr-4 text-indigo-600 hover:text-indigo-900"
                                                title="Edit"
                                            >
                                                <Edit className="h-4 w-4" />
                                            </Link>
                                        )}
                                        {canDelete && (
                                            <DeleteButton
                                                id={cs.id}
                                                endpoint="/api/control/case-studies"
                                                itemType="case study"
                                            />
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
