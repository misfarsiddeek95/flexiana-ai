import Link from "next/link";
import { Eye } from "lucide-react";

interface ViewButtonProps {
    href: string;
}

export function ViewButton({ href }: ViewButtonProps) {
    return (
        <Link
            href={href}
            className="mr-4 text-gray-600 hover:text-gray-900"
            title="View Details"
        >
            <Eye className="h-4 w-4" />
        </Link>
    );
}
