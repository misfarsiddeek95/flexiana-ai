"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { PERMISSIONS, ALL_PERMISSIONS } from "@/lib/permissions";
import { showSuccess, handleApiError } from "@/lib/toast";

interface UserTypeFormProps {
    initialData?: {
        id?: string;
        name: string;
        permissions: string;
        active: boolean;
    };
}

export function UserTypeForm({ initialData }: UserTypeFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    // Parse permissions from JSON string
    const initialPermissions = initialData?.permissions
        ? JSON.parse(initialData.permissions)
        : [];

    const [formData, setFormData] = useState({
        name: initialData?.name || "",
        permissions: initialPermissions as string[],
        active: initialData?.active ?? true,
    });

    const handlePermissionToggle = (permission: string) => {
        setFormData((prev) => ({
            ...prev,
            permissions: prev.permissions.includes(permission)
                ? prev.permissions.filter((p) => p !== permission)
                : [...prev.permissions, permission],
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const url = initialData?.id
                ? `/api/control/user-types/${initialData.id}`
                : "/api/control/user-types";
            const method = initialData?.id ? "PUT" : "POST";

            const response = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: formData.name,
                    permissions: JSON.stringify(formData.permissions),
                    active: formData.active,
                }),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || "Failed to save user type");
            }

            showSuccess(
                `User type "${formData.name}" has been ${initialData?.id ? "updated" : "created"} successfully!`
            );

            router.push("/control/user-types");
            router.refresh();
        } catch (error) {
            handleApiError(error, `${initialData?.id ? "update" : "create"} user type`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="rounded-lg bg-white p-6 shadow">
                <h2 className="mb-4 text-lg font-semibold text-gray-900">
                    User Type Information
                </h2>

                <div className="space-y-4">
                    <div>
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="name"
                            required
                            value={formData.name}
                            onChange={(e) =>
                                setFormData({ ...formData, name: e.target.value })
                            }
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Permissions
                        </label>
                        <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                            {Object.entries(PERMISSIONS).map(([category, permissions]) => (
                                <div key={category} className="rounded-md border border-gray-200 p-4">
                                    <h3 className="mb-3 text-sm font-semibold text-gray-900 capitalize">
                                        {category.toLowerCase().replace(/_/g, " ")}
                                    </h3>
                                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                        {Object.values(permissions).map((permission) => (
                                            <label
                                                key={permission}
                                                className="flex items-center space-x-2 text-sm"
                                            >
                                                <input
                                                    type="checkbox"
                                                    checked={formData.permissions.includes(permission)}
                                                    onChange={() => handlePermissionToggle(permission)}
                                                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                                />
                                                <span className="text-gray-700">{permission}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <p className="mt-1 text-xs text-gray-500">
                            {formData.permissions.length} permission(s) selected
                        </p>
                    </div>

                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="active"
                            checked={formData.active}
                            onChange={(e) =>
                                setFormData({ ...formData, active: e.target.checked })
                            }
                            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <label
                            htmlFor="active"
                            className="ml-2 block text-sm text-gray-900"
                        >
                            Active
                        </label>
                    </div>
                </div>
            </div>

            <div className="flex justify-end space-x-4">
                <button
                    type="button"
                    onClick={() => router.back()}
                    className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={loading}
                    className="flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
                >
                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {initialData?.id ? "Update" : "Create"} User Type
                </button>
            </div>
        </form>
    );
}
