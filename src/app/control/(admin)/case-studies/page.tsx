import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { CaseStudy } from "@prisma/client";
import { Plus, Edit } from "lucide-react";
import { DeleteButton } from "@/components/cms/DeleteButton";
import { ViewButton } from "@/components/cms/ViewButton";

import { PERMISSIONS } from "@/lib/permissions";
import { getUserPermissions } from "@/lib/auth-helpers";
import { hasPermission } from "@/lib/permissions";
import { SearchFilter } from "@/components/cms/SearchFilter";
import { Pagination } from "@/components/cms/Pagination";
import { Prisma } from "@prisma/client";

export default async function CaseStudiesPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const { page, search } = await searchParams;
    const currentPage = Number(page) || 1;
    const itemsPerPage = 10;
    const searchTerm = typeof search === 'string' ? search : "";

    const userPermissions = await getUserPermissions();
    const canCreate = hasPermission(userPermissions, PERMISSIONS.CASE_STUDIES.CREATE);
    const canEdit = hasPermission(userPermissions, PERMISSIONS.CASE_STUDIES.EDIT);
    const canDelete = hasPermission(userPermissions, PERMISSIONS.CASE_STUDIES.DELETE);

    const where: Prisma.CaseStudyWhereInput = searchTerm
        ? {
            OR: [
                { title: { contains: searchTerm } },
                { client: { contains: searchTerm } },
                { industry: { contains: searchTerm } },
                { slug: { contains: searchTerm } },
            ],
        }
        : {};

    const totalItems = await prisma.caseStudy.count({ where });
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const caseStudies = await prisma.caseStudy.findMany({
        where,
        orderBy: {
            createdAt: "desc",
        },
        skip: (currentPage - 1) * itemsPerPage,
        take: itemsPerPage,
    });

    return (
        <div className="space-y-4">
            <h1 className="text-2xl font-bold text-gray-900">Case Studies</h1>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="w-full max-w-sm">
                    <SearchFilter placeholder="Search case studies..." />
                </div>
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
                <div className="overflow-x-auto">
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
                            {caseStudies.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
                                        No case studies found.
                                    </td>
                                </tr>
                            ) : (
                                caseStudies.map((cs: CaseStudy) => (
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
                                            <div className="flex justify-end gap-4">
                                                <ViewButton href={`/control/case-studies/${cs.id}/view`} />
                                                {canEdit && (
                                                    <Link
                                                        href={`/control/case-studies/${cs.id}`}
                                                        className="text-indigo-600 hover:text-indigo-900"
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
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    totalItems={totalItems}
                    itemsPerPage={itemsPerPage}
                />
            </div>
        </div>
    );
}
