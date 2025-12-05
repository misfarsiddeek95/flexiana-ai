// Simple toast notification utility for user feedback
import { toast } from "sonner";

export function showSuccess(message: string, title: string = "✅ Success") {
    toast.success(message, {
        description: title !== "✅ Success" ? title : undefined,
    });
}

export function showError(message: string, title: string = "❌ Error") {
    toast.error(message, {
        description: title !== "❌ Error" ? title : undefined,
    });
}

export function showWarning(message: string, title: string = "⚠️ Warning") {
    toast.warning(message, {
        description: title !== "⚠️ Warning" ? title : undefined,
    });
}

export function showInfo(message: string, title: string = "ℹ️ Info") {
    toast.info(message, {
        description: title !== "ℹ️ Info" ? title : undefined,
    });
}

/**
 * Handle API errors with user-friendly messages
 */
import axios from "axios";

/**
 * Handle API errors with user-friendly messages
 */
export function handleApiError(error: unknown, operation: string = "operation") {
    if (axios.isAxiosError(error)) {
        if (error.response?.status === 403) {
            showError(
                `You don't have permission to perform this action. Please contact an administrator if you need access.`,
                "Permission Denied"
            );
        } else if (error.response?.status === 401) {
            showError(
                "Your session has expired. Please log in again.",
                "Session Expired"
            );
            setTimeout(() => {
                window.location.href = "/control/login";
            }, 1000);
        } else if (error.response?.status === 404) {
            showError(
                "The requested resource was not found.",
                "Not Found"
            );
        } else if (error.response?.status === 400) {
            const errorMessage = error.response?.data?.error || "Invalid data provided.";
            showError(errorMessage, "Validation Error");
        } else {
            showError(
                `An error occurred while trying to ${operation}. Please try again or contact support if the problem persists.`,
                "Operation Failed"
            );
        }
    } else {
        showError(
            `An unexpected error occurred while trying to ${operation}.`,
            "Unexpected Error"
        );
        console.error("Non-Axios error:", error);
    }
}
