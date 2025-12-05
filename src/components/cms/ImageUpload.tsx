"use client";

import { useState, useRef } from "react";
import { Loader2, Upload, X, Image as ImageIcon } from "lucide-react";
import axios from "axios";
import Image from "next/image";
import { showSuccess, handleApiError } from "@/lib/toast";

interface ImageUploadProps {
    value?: string | null;
    onChange: (url: string) => void;
    type: "blog" | "case-study";
    label?: string;
    className?: string;
}

export function ImageUpload({ value, onChange, type, label = "Image", className = "" }: ImageUploadProps) {
    const [loading, setLoading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const deleteImage = async (url: string) => {
        if (!url) return;
        try {
            await axios.delete("/api/upload", { data: { url } });
        } catch (error) {
            console.error("Failed to delete image:", error);
            // We don't block UI if delete fails, just log it
        }
    };

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // If there's an existing image, delete it first (or after success? Let's do after success to be safe, or before? 
        // If we do before and upload fails, user loses image. 
        // But if we do after, we need to store old value.
        const oldUrl = value;

        setLoading(true);
        const formData = new FormData();
        formData.append("file", file);
        formData.append("type", type);

        try {
            const res = await axios.post("/api/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            // Upload success, now delete old image if it exists
            if (oldUrl) {
                await deleteImage(oldUrl);
            }

            onChange(res.data.url);
            showSuccess("Image uploaded successfully");
        } catch (error) {
            handleApiError(error, "upload image");
        } finally {
            setLoading(false);
            // Reset input so same file can be selected again if needed
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
        }
    };

    const handleRemove = async () => {
        if (value) {
            await deleteImage(value);
        }
        onChange("");
    };

    return (
        <div className={`space-y-2 ${className}`}>
            <label className="block text-sm font-medium text-gray-700">{label}</label>

            <div className="relative flex flex-col items-center justify-center w-full">
                {value ? (
                    <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
                        <Image
                            src={value}
                            alt="Uploaded image"
                            fill
                            className="object-cover"
                        />
                        <div className="absolute top-2 right-2 flex gap-2">
                            <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                className="p-1.5 bg-white/80 hover:bg-white text-gray-700 rounded-full shadow-sm transition-colors"
                                title="Change image"
                            >
                                <Upload className="w-4 h-4" />
                            </button>
                            <button
                                type="button"
                                onClick={handleRemove}
                                className="p-1.5 bg-white/80 hover:bg-white text-red-600 rounded-full shadow-sm transition-colors"
                                title="Remove image"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                ) : (
                    <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={loading}
                        className="flex flex-col items-center justify-center w-full h-48 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        {loading ? (
                            <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
                        ) : (
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <ImageIcon className="w-10 h-10 mb-3 text-gray-400" />
                                <p className="mb-2 text-sm text-gray-500">
                                    <span className="font-semibold">Click to upload</span> or drag and drop
                                </p>
                                <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF (MAX. 1200x1200px)</p>
                            </div>
                        )}
                    </button>
                )}

                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleUpload}
                    disabled={loading}
                />
            </div>
        </div>
    );
}
