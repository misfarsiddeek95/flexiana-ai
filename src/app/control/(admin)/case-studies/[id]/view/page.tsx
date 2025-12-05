import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { ArrowLeft, Edit } from "lucide-react";
import { notFound } from "next/navigation";

import { PERMISSIONS } from "@/lib/permissions";
import { getUserPermissions } from "@/lib/auth-helpers";
import { hasPermission } from "@/lib/permissions";
import { PermissionDenied } from "@/components/cms/PermissionDenied";

export default async function CaseStudyViewPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    // Check view permission
    const userPermissions = await getUserPermissions();
    if (!hasPermission(userPermissions, PERMISSIONS.CASE_STUDIES.VIEW)) {
        return <PermissionDenied />;
    }

    const canEdit = hasPermission(userPermissions, PERMISSIONS.CASE_STUDIES.EDIT);

    const cs = await prisma.caseStudy.findUnique({
        where: { id },
    });

    if (!cs) {
        notFound();
    }

    const parseJSON = (jsonString: string | null) => {
        if (!jsonString) return null;
        try {
            return JSON.parse(jsonString);
        } catch (e) {
            return null;
        }
    };

    const challenge = parseJSON(cs.challenge);
    const solution = parseJSON(cs.solution);
    const techStack = parseJSON(cs.techStack);
    const results = parseJSON(cs.results);
    const carouselData = parseJSON(cs.carouselData);
    const tags = parseJSON(cs.tags);
    const metaKeywords = parseJSON(cs.metaKeywords);

    return (
        <div className="space-y-8 pb-20">
            {/* Header Actions */}
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <Link
                        href="/control/case-studies"
                        className="rounded-full bg-white p-2 text-gray-500 shadow-sm hover:bg-gray-50 hover:text-gray-700 transition-colors"
                    >
                        <ArrowLeft className="h-5 w-5" />
                    </Link>
                    <h1 className="text-2xl font-bold text-gray-900">View Case Study</h1>
                </div>
                {canEdit && (
                    <Link
                        href={`/control/case-studies/${cs.id}`}
                        className="flex items-center rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-blue-700 transition-colors"
                    >
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Case Study
                    </Link>
                )}
            </div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                {/* Left Column: Main Content */}
                <div className="space-y-8 lg:col-span-2">
                    {/* Basic Info Card */}
                    <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-900/5">
                        <h2 className="mb-6 text-lg font-semibold text-gray-900 border-b pb-4">
                            Basic Information
                        </h2>
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            <div className="sm:col-span-2">
                                <label className="block text-sm font-medium text-gray-500">
                                    Title
                                </label>
                                <div className="mt-1 text-gray-900">{cs.title}</div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-500">
                                    Slug
                                </label>
                                <div className="mt-1 text-gray-900">{cs.slug}</div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-500">
                                    Client
                                </label>
                                <div className="mt-1 text-gray-900">{cs.client || "-"}</div>
                            </div>

                            <div className="sm:col-span-2">
                                <label className="block text-sm font-medium text-gray-500">
                                    Subtitle
                                </label>
                                <div className="mt-1 text-gray-900">{cs.subtitle || "-"}</div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-500">
                                    Industry
                                </label>
                                <div className="mt-1 text-gray-900">{cs.industry || "-"}</div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-500">
                                    Year
                                </label>
                                <div className="mt-1 text-gray-900">{cs.year || "-"}</div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-500">
                                    Duration
                                </label>
                                <div className="mt-1 text-gray-900">{cs.duration || "-"}</div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-500">
                                    Status
                                </label>
                                <div className="mt-1">
                                    <span
                                        className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${cs.active
                                            ? "bg-green-100 text-green-800"
                                            : "bg-red-100 text-red-800"
                                            }`}
                                    >
                                        {cs.active ? "Active" : "Inactive"}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Overview Card */}
                    <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-900/5">
                        <h2 className="mb-6 text-lg font-semibold text-gray-900 border-b pb-4">
                            Overview
                        </h2>
                        <div
                            className="prose max-w-none"
                            dangerouslySetInnerHTML={{ __html: cs.overview || "" }}
                        />
                    </div>

                    {/* Challenge */}
                    <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-900/5">
                        <h2 className="mb-6 text-lg font-semibold text-gray-900 border-b pb-4">
                            Challenge
                        </h2>
                        {challenge ? (
                            <div className="space-y-4">
                                <p className="text-gray-900">{challenge.description}</p>
                                {challenge.points && challenge.points.length > 0 && (
                                    <ul className="list-disc pl-5 text-gray-600">
                                        {challenge.points.map((point: string, i: number) => (
                                            <li key={i}>{point}</li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        ) : (
                            <p className="text-gray-500">No challenge data.</p>
                        )}
                    </div>

                    {/* Solution */}
                    <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-900/5">
                        <h2 className="mb-6 text-lg font-semibold text-gray-900 border-b pb-4">
                            Solution
                        </h2>
                        {solution ? (
                            <div className="space-y-6">
                                <p className="text-gray-900">{solution.description}</p>
                                {solution.approach &&
                                    solution.approach.map((item: any, i: number) => (
                                        <div key={i} className="rounded-lg bg-gray-50 p-4">
                                            <h4 className="font-medium text-gray-900">
                                                {item.title}
                                            </h4>
                                            <p className="mt-1 text-sm text-gray-600">
                                                {item.description}
                                            </p>
                                            {item.details && item.details.length > 0 && (
                                                <ul className="mt-2 list-disc pl-5 text-sm text-gray-600">
                                                    {item.details.map((detail: string, j: number) => (
                                                        <li key={j}>{detail}</li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>
                                    ))}
                            </div>
                        ) : (
                            <p className="text-gray-500">No solution data.</p>
                        )}
                    </div>

                    {/* Results */}
                    <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-900/5">
                        <h2 className="mb-6 text-lg font-semibold text-gray-900 border-b pb-4">
                            Results
                        </h2>
                        {results ? (
                            <div className="space-y-6">
                                <p className="text-gray-900">{results.description}</p>
                                {results.metrics && results.metrics.length > 0 && (
                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                                        {results.metrics.map((metric: any, i: number) => (
                                            <div
                                                key={i}
                                                className="rounded-lg border border-gray-200 p-4 text-center"
                                            >
                                                <div className="text-2xl font-bold text-blue-600">
                                                    {metric.value}
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    {metric.label}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                                {results.outcomes && results.outcomes.length > 0 && (
                                    <div>
                                        <h4 className="mb-2 font-medium text-gray-900">Outcomes</h4>
                                        <ul className="list-disc pl-5 text-gray-600">
                                            {results.outcomes.map((outcome: string, i: number) => (
                                                <li key={i}>{outcome}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <p className="text-gray-500">No results data.</p>
                        )}
                    </div>
                </div>

                {/* Right Column: Sidebar Settings */}
                <div className="space-y-8">
                    {/* Media Card */}
                    <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-900/5">
                        <h2 className="mb-6 text-lg font-semibold text-gray-900 border-b pb-4">
                            Media
                        </h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-500">
                                    Hero Image URL
                                </label>
                                <div className="mt-1 break-all text-gray-900">
                                    {cs.heroImage || "-"}
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500">
                                    Hero Image Alt
                                </label>
                                <div className="mt-1 text-gray-900">
                                    {cs.heroImageAlt || "-"}
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500">
                                    Hero Video URL
                                </label>
                                <div className="mt-1 break-all text-gray-900">
                                    {cs.heroVideo || "-"}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Tech Stack */}
                    <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-900/5">
                        <h2 className="mb-6 text-lg font-semibold text-gray-900 border-b pb-4">
                            Tech Stack
                        </h2>
                        {techStack && techStack.categories ? (
                            <div className="space-y-4">
                                {techStack.categories.map((cat: any, i: number) => (
                                    <div key={i}>
                                        <h4 className="font-medium text-gray-900">{cat.name}</h4>
                                        <div className="mt-2 flex flex-wrap gap-2">
                                            {cat.technologies.map((tech: string, j: number) => (
                                                <span
                                                    key={j}
                                                    className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-800"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500">No tech stack data.</p>
                        )}
                    </div>

                    {/* Carousel Data */}
                    <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-900/5">
                        <h2 className="mb-6 text-lg font-semibold text-gray-900 border-b pb-4">
                            Carousel Data
                        </h2>
                        {carouselData ? (
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-500">
                                        Title
                                    </label>
                                    <div className="mt-1 text-gray-900">{carouselData.title}</div>
                                </div>
                                {carouselData.points && carouselData.points.length > 0 && (
                                    <ul className="list-disc pl-5 text-gray-600">
                                        {carouselData.points.map((point: string, i: number) => (
                                            <li key={i}>{point}</li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        ) : (
                            <p className="text-gray-500">No carousel data.</p>
                        )}
                    </div>

                    {/* SEO & Tags */}
                    <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-900/5">
                        <h2 className="mb-6 text-lg font-semibold text-gray-900 border-b pb-4">
                            SEO & Tags
                        </h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-500">
                                    Tags
                                </label>
                                <div className="mt-2 flex flex-wrap gap-2">
                                    {tags ? (
                                        tags.map((tag: string, index: number) => (
                                            <span
                                                key={index}
                                                className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800"
                                            >
                                                {tag}
                                            </span>
                                        ))
                                    ) : (
                                        <span className="text-gray-500">-</span>
                                    )}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-500">
                                    Meta Description
                                </label>
                                <div className="mt-1 text-gray-900">
                                    {cs.metaDescription || "-"}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-500">
                                    Meta Keywords
                                </label>
                                <div className="mt-2 flex flex-wrap gap-2">
                                    {metaKeywords ? (
                                        metaKeywords.map((keyword: string, index: number) => (
                                            <span
                                                key={index}
                                                className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-800"
                                            >
                                                {keyword}
                                            </span>
                                        ))
                                    ) : (
                                        <span className="text-gray-500">-</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
