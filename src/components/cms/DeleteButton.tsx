"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2, Loader2 } from "lucide-react";
import axios from "axios";
import { handleApiError, showSuccess } from "@/lib/toast";

interface DeleteButtonProps {
    id: string;
    endpoint: string;
    itemType: string;
}

export function DeleteButton({ id, endpoint, itemType }: DeleteButtonProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        if (!confirm(`Are you sure you want to delete this ${itemType}?`)) {
            return;
        }

        setLoading(true);
        try {
            await axios.delete(`${endpoint}/${id}`);
            showSuccess(`The ${itemType} has been successfully deleted.`);
            router.refresh();
            router.refresh();
        } catch (error) {
            handleApiError(error, `delete this ${itemType}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            onClick={handleDelete}
            disabled={loading}
            className="text-red-600 hover:text-red-900 disabled:opacity-50"
            title={`Delete ${itemType}`}
        >
            {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
                <Trash2 className="h-4 w-4" />
            )}
        </button>
    );
}
