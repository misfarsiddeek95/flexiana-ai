import Link from "next/link";
import { ShieldAlert } from "lucide-react";

export function PermissionDenied() {
    return (
        <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
            <div className="rounded-full bg-red-100 p-4">
                <ShieldAlert className="h-12 w-12 text-red-600" />
            </div>
            <h2 className="mt-6 text-2xl font-bold text-gray-900">Permission Denied</h2>
            <p className="mt-2 max-w-md text-gray-600">
                You do not have permission to access this page. If you believe this is an error, please contact your administrator.
            </p>
            <Link
                href="/control"
                className="mt-8 rounded-md bg-blue-600 px-6 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
                Return to Dashboard
            </Link>
        </div>
    );
}
