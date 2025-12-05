"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import axios from "axios";
import { RichTextEditor } from "@/components/cms/RichTextEditor";
import { ArrayField } from "@/components/cms/ArrayField";
import { ImageUpload } from "@/components/cms/ImageUpload";
import { Loader2, Save, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { showSuccess, handleApiError } from "@/lib/toast";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Textarea } from "@/components/ui/Textarea";

interface BlogFormData {
    title: string;
    slug: string;
    subtitle?: string;
    active: boolean;
    content: string;
    author: string;
    publishDate: string;
    readTime?: string;
    imageUrl?: string;
    imageAlt?: string;
    tags: string[];
    metaDescription?: string;
    metaKeywords: string[];
    showInHome: boolean;
}

interface BlogFormProps {
    initialData?: {
        id: string;
        title: string;
        slug: string;
        subtitle?: string | null;
        active: boolean;
        content: string;
        author: string;
        publishDate: string;
        readTime?: string | null;
        imageUrl?: string | null;
        imageAlt?: string | null;
        tags: string; // JSON string in DB
        metaDescription?: string | null;
        metaKeywords: string | null; // JSON string in DB
        showInHome: boolean;
    } | null;
    isNew?: boolean;
}

export function BlogForm({ initialData, isNew }: BlogFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    // Parse initial JSON data
    const defaultValues: BlogFormData = initialData
        ? {
            title: initialData.title,
            slug: initialData.slug,
            subtitle: initialData.subtitle || undefined,
            active: initialData.active,
            content: initialData.content,
            author: initialData.author,
            readTime: initialData.readTime || undefined,
            imageUrl: initialData.imageUrl || undefined,
            imageAlt: initialData.imageAlt || undefined,
            metaDescription: initialData.metaDescription || undefined,
            publishDate: initialData.publishDate
                ? new Date(initialData.publishDate).toISOString().split("T")[0]
                : new Date().toISOString().split("T")[0],
            tags: initialData.tags ? JSON.parse(initialData.tags) : [],
            metaKeywords: initialData.metaKeywords
                ? JSON.parse(initialData.metaKeywords)
                : [],
            showInHome: initialData.showInHome,
        }
        : {
            title: "",
            slug: "",
            active: true,
            content: "",
            author: "",
            publishDate: new Date().toISOString().split("T")[0],
            tags: [],
            metaKeywords: [],
            showInHome: false,
        };

    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<BlogFormData>({
        defaultValues,
    });

    const onSubmit = async (data: BlogFormData) => {
        setLoading(true);
        try {
            // Stringify JSON fields before sending
            const formattedData = {
                ...data,
                tags: JSON.stringify(data.tags),
                metaKeywords: JSON.stringify(data.metaKeywords),
                publishDate: new Date(data.publishDate),
            };

            if (isNew) {
                await axios.post("/api/control/blogs", formattedData);
            } else {
                await axios.put(`/api/control/blogs/${initialData?.id}`, formattedData);
            }
            router.push("/control/blogs");
            router.refresh();
        } catch (error) {
            handleApiError(error, "save blog");
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
                        href="/control/blogs"
                        className="rounded-full bg-white p-2 text-gray-500 shadow-sm hover:bg-gray-50 hover:text-gray-700 transition-colors"
                    >
                        <ArrowLeft className="h-5 w-5" />
                    </Link>
                    <h1 className="text-2xl font-bold text-gray-900">
                        {isNew ? "Create Blog Post" : "Edit Blog Post"}
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
                    {isNew ? "Create Blog" : "Save Changes"}
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
                        <div className="space-y-6">
                            <div>
                                <Label>Title</Label>
                                <Input
                                    {...register("title", { required: "Title is required" })}
                                    placeholder="e.g. The Future of AI"
                                />
                                {errors.title && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.title.message as string}
                                    </p>
                                )}
                            </div>

                            <div>
                                <Label>Slug</Label>
                                <Input
                                    {...register("slug", { required: "Slug is required" })}
                                    placeholder="e.g. future-of-ai"
                                />
                                {errors.slug && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.slug.message as string}
                                    </p>
                                )}
                            </div>

                            <div>
                                <Label>Subtitle</Label>
                                <Input {...register("subtitle")} />
                            </div>

                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    {...register("active")}
                                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                />
                                <label className="ml-2 block text-sm text-gray-900">
                                    Active (Visible on site)
                                </label>
                            </div>

                            <div className="flex items-center">
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

                    {/* Content Card */}
                    <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-900/5">
                        <h2 className="mb-6 text-lg font-semibold text-gray-900 border-b pb-4">
                            Content
                        </h2>
                        <Controller
                            name="content"
                            control={control}
                            render={({ field }) => (
                                <RichTextEditor
                                    value={field.value || ""}
                                    onChange={field.onChange}
                                    uploadType="blog"
                                />
                            )}
                        />
                    </div>
                </div>

                {/* Right Column: Sidebar Settings */}
                <div className="space-y-8">
                    {/* Publishing Card */}
                    <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-900/5">
                        <h2 className="mb-6 text-lg font-semibold text-gray-900 border-b pb-4">
                            Publishing
                        </h2>
                        <div className="space-y-4">
                            <div>
                                <Label>Author</Label>
                                <Input
                                    {...register("author", { required: "Author is required" })}
                                />
                            </div>
                            <div>
                                <Label>Publish Date</Label>
                                <Input
                                    type="date"
                                    {...register("publishDate", { required: "Date is required" })}
                                />
                            </div>
                            <div>
                                <Label>Read Time</Label>
                                <Input
                                    {...register("readTime")}
                                    placeholder="e.g. 5 min read"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Media Card */}
                    <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-900/5">
                        <h2 className="mb-6 text-lg font-semibold text-gray-900 border-b pb-4">
                            Media
                        </h2>
                        <div className="space-y-4">
                            <div>
                                <Label>Image URL</Label>
                                <Controller
                                    name="imageUrl"
                                    control={control}
                                    render={({ field }) => (
                                        <ImageUpload
                                            value={field.value || undefined}
                                            onChange={field.onChange}
                                            type="blog"
                                            label="Featured Image"
                                        />
                                    )}
                                />
                            </div>
                            <div>
                                <Label>Image Alt</Label>
                                <Input {...register("imageAlt")} />
                            </div>
                        </div>
                    </div>

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
