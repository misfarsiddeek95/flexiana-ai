"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { showSuccess, handleApiError } from "@/lib/toast";

interface UserType {
    id: string;
    name: string;
}

interface UserFormData {
    name: string;
    email: string;
    password?: string;
    userTypeId: string;
    active: boolean;
}

interface UserFormProps {
    initialData?: {
        id: string;
        name: string;
        email: string;
        userTypeId: string;
        active: boolean;
    } | null;
    isNew?: boolean;
}

export function UserForm({ initialData, isNew }: UserFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [userTypes, setUserTypes] = useState<UserType[]>([]);
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<UserFormData>({
        defaultValues: {
            name: initialData?.name || "",
            email: initialData?.email || "",
            password: "",
            userTypeId: initialData?.userTypeId || "",
            active: initialData?.active ?? true,
        },
    });

    // Ensure the select reflects the current user type when editing
    // Fetch user types and set the selected user type when editing
    useEffect(() => {
        const fetchUserTypes = async () => {
            try {
                const response = await axios.get("/api/control/user-types", {
                    withCredentials: true,
                });
                setUserTypes(response.data);
                // After loading types, set the selected user type if editing
                if (initialData?.userTypeId) {
                    setValue('userTypeId', initialData.userTypeId);
                }
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    if (error.response?.status === 403) {
                        // Silent fail or handled by UI elsewhere if needed
                    } else if (error.response?.status === 401) {
                        window.location.href = "/control/login";
                    }
                }
            }
        };
        fetchUserTypes();
    }, [initialData?.userTypeId, setValue]);

    // After user types are loaded, set the selected user type if editing
    useEffect(() => {
        if (userTypes.length > 0 && initialData?.userTypeId) {
            setValue('userTypeId', initialData.userTypeId);
        }
    }, [userTypes, initialData?.userTypeId, setValue]);
    const onSubmit = async (data: UserFormData) => {
        setLoading(true);
        try {
            if (isNew) {
                await axios.post("/api/control/users", data);
                showSuccess(`User "${data.name}" has been created successfully!`);
            } else {
                // Remove password if empty to avoid overwriting with empty string
                const updateData = { ...data };
                if (!updateData.password) {
                    delete updateData.password;
                }
                await axios.put(`/api/control/users/${initialData?.id}`, updateData);
                showSuccess(`User "${data.name}" has been updated successfully!`);
            }
            router.push("/control/users");
            router.refresh();
        } catch (error) {
            handleApiError(error, `${isNew ? "create" : "update"} user`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6 rounded-lg bg-white p-6 shadow"
        >
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Name
                    </label>
                    <input
                        {...register("name", { required: "Name is required" })}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                    />
                    {errors.name && (
                        <p className="mt-1 text-sm text-red-600">
                            {errors.name.message as string}
                        </p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Email
                    </label>
                    <input
                        type="email"
                        {...register("email", { required: "Email is required" })}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                    />
                    {errors.email && (
                        <p className="mt-1 text-sm text-red-600">
                            {errors.email.message as string}
                        </p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Password {!isNew && "(Leave blank to keep current)"}
                    </label>
                    <input
                        type="password"
                        {...register("password", {
                            required: isNew ? "Password is required" : false,
                        })}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                    />
                    {errors.password && (
                        <p className="mt-1 text-sm text-red-600">
                            {errors.password.message as string}
                        </p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        User Type
                    </label>
                    <select
                        {...register("userTypeId", { required: "User Type is required" })}
                        defaultValue={initialData?.userTypeId || ""}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                    >
                        <option value="">Select a type</option>
                        {userTypes.map((type) => (
                            <option key={type.id} value={type.id}>
                                {type.name}
                            </option>
                        ))}
                    </select>
                    {errors.userTypeId && (
                        <p className="mt-1 text-sm text-red-600">
                            {errors.userTypeId.message as string}
                        </p>
                    )}
                </div>

                <div className="flex items-center">
                    <input
                        type="checkbox"
                        {...register("active")}
                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <label className="ml-2 block text-sm text-gray-900">Active</label>
                </div>
            </div>

            <div className="sticky bottom-0 z-10 -mx-6 -mb-6 border-t border-gray-200 bg-gray-50 px-6 py-4 flex justify-end rounded-b-lg">
                <button
                    type="submit"
                    disabled={loading}
                    className="flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50 shadow-sm"
                >
                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {isNew ? "Create User" : "Update User"}
                </button>
            </div>
        </form>
    );
}
