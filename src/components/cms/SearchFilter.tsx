"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState, useEffect } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { useDebounce } from "@/hooks/use-debounce";

export function SearchFilter({ placeholder = "Search..." }: { placeholder?: string }) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();

    const [val, setVal] = useState(searchParams.get("search") || "");
    const debouncedVal = useDebounce(val, 500);

    useEffect(() => {
        if (debouncedVal !== (searchParams.get("search") || "")) {
            const params = new URLSearchParams(searchParams.toString());
            if (debouncedVal) {
                params.set("search", debouncedVal);
            } else {
                params.delete("search");
            }
            params.set("page", "1");
            router.push(pathname + "?" + params.toString());
        }
    }, [debouncedVal, pathname, router, searchParams]);

    return (
        <div className="relative w-full max-w-sm">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Search className="h-4 w-4 text-gray-400" />
            </div>
            <Input
                type="text"
                placeholder={placeholder}
                className="pl-10"
                value={val}
                onChange={(e) => setVal(e.target.value)}
            />
        </div>
    );
}
