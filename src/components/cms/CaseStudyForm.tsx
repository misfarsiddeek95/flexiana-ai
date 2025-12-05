"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import axios from "axios";
import { RichTextEditor } from "@/components/cms/RichTextEditor";
import { ArrayField } from "@/components/cms/ArrayField";
import { ImageUpload } from "@/components/cms/ImageUpload";
import { ChallengeForm } from "@/components/cms/case-study/ChallengeForm";
import { SolutionForm } from "@/components/cms/case-study/SolutionForm";
import { TechStackForm } from "@/components/cms/case-study/TechStackForm";
import { ResultsForm } from "@/components/cms/case-study/ResultsForm";
import { CarouselDataForm } from "@/components/cms/case-study/CarouselDataForm";
import { Loader2, Save, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { showSuccess, handleApiError } from "@/lib/toast";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Textarea } from "@/components/ui/Textarea";
import type { CaseStudy } from "@prisma/client";

import { SolutionData } from "@/components/cms/case-study/SolutionForm";
import { TechStackData } from "@/components/cms/case-study/TechStackForm";
import { ResultsData } from "@/components/cms/case-study/ResultsForm";
import { CarouselData } from "@/components/cms/case-study/CarouselDataForm";

interface CaseStudyFormData {
    title: string;
    slug: string;
    client: string;
    subtitle: string;
    industry: string;
    year: string;
    duration: string;
    active: boolean;
    showInHome: boolean;
    overview: string;
    challenge: { description: string; points: string[] };
    solution: SolutionData;
    results: ResultsData;
    techStack: TechStackData;
    carouselData: CarouselData;
    heroImage?: string | null;
    heroImageAlt?: string | null;
    heroVideo: string | null | undefined;
    tags: string[];
    metaDescription: string | null | undefined;
    metaKeywords: string[];
}

interface CaseStudyFormProps {
    initialData: (CaseStudy & { showInHome: boolean }) | null;
    isNew?: boolean;
}

export function CaseStudyForm({ initialData, isNew }: CaseStudyFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    // Parse initial JSON data
    const defaultValues: CaseStudyFormData = initialData
        ? {
            ...initialData,
            showInHome: initialData.showInHome ?? false,
            tags: initialData.tags ? JSON.parse(initialData.tags) : [],
            challenge: initialData.challenge
                ? JSON.parse(initialData.challenge)
                : { description: "", points: [] },
            solution: initialData.solution
                ? JSON.parse(initialData.solution)
                : { description: "", approach: [] },
            techStack: initialData.techStack
                ? JSON.parse(initialData.techStack)
                : { categories: [] },
            results: initialData.results
                ? JSON.parse(initialData.results)
                : { description: "", metrics: [], outcomes: [] },
            carouselData: initialData.carouselData
                ? JSON.parse(initialData.carouselData)
                : { title: "", points: [] },
            metaKeywords: initialData.metaKeywords
                ? JSON.parse(initialData.metaKeywords)
                : [],
        }
        : {
            title: "",
            slug: "",
            client: "",
            subtitle: "",
            industry: "",
            year: "",
            duration: "",
            active: true,
            showInHome: false,
            overview: "",
            heroImage: undefined,
            heroImageAlt: undefined,
            heroVideo: undefined,
            tags: [],
            challenge: { description: "", points: [] },
            solution: { description: "", approach: [] },
            techStack: { categories: [] },
            results: { description: "", metrics: [], outcomes: [] },
            carouselData: { title: "", points: [] },
            metaDescription: undefined,
            metaKeywords: [],
        };

    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<CaseStudyFormData>({
        defaultValues,
    });

    const onSubmit = async (data: CaseStudyFormData) => {
        setLoading(true);
        try {
            // Stringify JSON fields before sending
            const formattedData = {
                ...data,
                tags: JSON.stringify(data.tags),
                challenge: JSON.stringify(data.challenge),
                solution: JSON.stringify(data.solution),
                techStack: JSON.stringify(data.techStack),
                results: JSON.stringify(data.results),
                carouselData: JSON.stringify(data.carouselData),
                metaKeywords: JSON.stringify(data.metaKeywords),
            };

            if (isNew) {
                await axios.post("/api/control/case-studies", formattedData);
            } else {
                await axios.put(
                    `/api/control/case-studies/${initialData?.id}`,
                    formattedData
                );
            }
            router.push("/control/case-studies");
            router.refresh();
        } catch (error) {
            handleApiError(error, "save case study");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 pb-20">
            {/* Header Actions */}
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <Link
                        href="/control/case-studies"
                        className="rounded-full bg-white p-2 text-gray-500 shadow-sm hover:bg-gray-50 hover:text-gray-700 transition-colors"
                    >
                        <ArrowLeft className="h-5 w-5" />
                    </Link>
                    <h1 className="text-2xl font-bold text-gray-900">
                        {isNew ? "Create Case Study" : "Edit Case Study"}
                    </h1>
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className="flex items-center rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 transition-colors"
                >
                    {loading ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                        <Save className="mr-2 h-4 w-4" />
                    )}
                    {isNew ? "Create Case Study" : "Save Changes"}
                </button>
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
                                <Label>Title</Label>
                                <Input
                                    {...register("title", { required: "Title is required" })}
                                    placeholder="e.g. Gitrevio"
                                />
                            </div>

                            <div>
                                <Label>Slug</Label>
                                <Input
                                    {...register("slug", { required: "Slug is required" })}
                                    placeholder="e.g. gitrevio"
                                />
                            </div>

                            <div>
                                <Label>Client</Label>
                                <Input
                                    {...register("client")}
                                    placeholder="e.g. Gitrevio Inc."
                                />
                            </div>

                            <div className="sm:col-span-2">
                                <Label>Subtitle</Label>
                                <Input
                                    {...register("subtitle")}
                                    placeholder="e.g. Internal Tools Modernization"
                                />
                            </div>

                            <div>
                                <Label>Industry</Label>
                                <Input {...register("industry")} />
                            </div>

                            <div>
                                <Label>Year</Label>
                                <Input {...register("year")} />
                            </div>

                            <div>
                                <Label>Duration</Label>
                                <Input {...register("duration")} />
                            </div>

                            <div className="flex items-center pt-6">
                                <input
                                    type="checkbox"
                                    {...register("active")}
                                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                />
                                <label className="ml-2 block text-sm text-gray-900">
                                    Active (Visible on site)
                                </label>
                            </div>

                            <div className="flex items-center pt-6">
                                <input
                                    type="checkbox"
                                    {...register("showInHome")}
                                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                />
                                <label className="ml-2 block text-sm text-gray-900">
                                    Show in Home Page
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Overview Card */}
                    <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-900/5">
                        <h2 className="mb-6 text-lg font-semibold text-gray-900 border-b pb-4">
                            Overview
                        </h2>
                        <Controller
                            name="overview"
                            control={control}
                            render={({ field }) => (
                                <RichTextEditor
                                    value={field.value || ""}
                                    onChange={field.onChange}
                                    uploadType="case-study"
                                />
                            )}
                        />
                    </div>

                    {/* Challenge & Solution */}
                    <div className="space-y-8">
                        <Controller
                            name="challenge"
                            control={control}
                            render={({ field }) => (
                                <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-900/5">
                                    <ChallengeForm
                                        value={field.value || { description: "", points: [] }}
                                        onChange={field.onChange}
                                    />
                                </div>
                            )}
                        />

                        <Controller
                            name="solution"
                            control={control}
                            render={({ field }) => (
                                <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-900/5">
                                    <SolutionForm value={field.value || { description: "", approach: [] }} onChange={field.onChange} />
                                </div>
                            )}
                        />
                    </div>

                    {/* Results */}
                    <Controller
                        name="results"
                        control={control}
                        render={({ field }) => (
                            <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-900/5">
                                <ResultsForm value={field.value || { description: "", metrics: [], outcomes: [] }} onChange={field.onChange} />
                            </div>
                        )}
                    />
                </div>

                {/* Right Column: Sidebar Settings */}
                <div className="space-y-8">
                    {/* Media Card */}
                    <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-900/5">
                        <h2 className="mb-6 text-lg font-semibold text-gray-900 border-b pb-4">Media</h2>
                        <div className="space-y-4">
                            <div>
                                <Label>Hero Image URL</Label>
                                <Controller
                                    name="heroImage"
                                    control={control}
                                    render={({ field }) => (
                                        <ImageUpload
                                            value={field.value || undefined}
                                            onChange={field.onChange}
                                            type="case-study"
                                            label="Hero Image"
                                        />
                                    )}
                                />
                            </div>
                            <div>
                                <Label>Hero Image Alt</Label>
                                <Input {...register("heroImageAlt")} />
                            </div>
                            <div>
                                <Label>Hero Video URL</Label>
                                <Input {...register("heroVideo")} />
                                <span className="text-sm text-gray-500">Ex: https://player.vimeo.com/video/1137834872</span>
                            </div>
                        </div>
                    </div>

                    {/* Tech Stack */}
                    <Controller
                        name="techStack"
                        control={control}
                        render={({ field }) => (
                            <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-900/5">
                                <TechStackForm value={field.value || { categories: [] }} onChange={field.onChange} />
                            </div>
                        )}
                    />

                    {/* Carousel Data */}
                    <Controller
                        name="carouselData"
                        control={control}
                        render={({ field }) => (
                            <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-900/5">
                                <CarouselDataForm
                                    value={field.value || { title: "", points: [] }}
                                    onChange={field.onChange}
                                />
                            </div>
                        )}
                    />

                    {/* SEO & Tags */}
                    <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-900/5">
                        <h2 className="mb-6 text-lg font-semibold text-gray-900 border-b pb-4">
                            SEO & Tags
                        </h2>
                        <div className="space-y-4">
                            <Controller
                                name="tags"
                                control={control}
                                render={({ field }) => (
                                    <ArrayField
                                        label="Tags"
                                        values={field.value || []}
                                        onChange={field.onChange}
                                    />
                                )}
                            />

                            <div>
                                <Label>Meta Description</Label>
                                <Textarea {...register("metaDescription")} rows={3} />
                            </div>

                            <Controller
                                name="metaKeywords"
                                control={control}
                                render={({ field }) => (
                                    <ArrayField
                                        label="Meta Keywords"
                                        values={field.value || []}
                                        onChange={field.onChange}
                                    />
                                )}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}
