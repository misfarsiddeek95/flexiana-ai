"use client";

import { Plus, X } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";

interface ArrayFieldProps {
    label: string;
    values: string[];
    onChange: (values: string[]) => void;
}

export function ArrayField({ label, values, onChange }: ArrayFieldProps) {
    const [inputValue, setInputValue] = useState("");

    const handleAdd = () => {
        if (inputValue.trim()) {
            onChange([...values, inputValue.trim()]);
            setInputValue("");
        }
    };

    const handleRemove = (index: number) => {
        const newValues = [...values];
        newValues.splice(index, 1);
        onChange(newValues);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleAdd();
        }
    };

    return (
        <div>
            <Label>{label}</Label>
            <div className="mt-2 flex flex-wrap gap-2">
                {values.map((value, index) => (
                    <span
                        key={index}
                        className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800"
                    >
                        {value}
                        <button
                            type="button"
                            onClick={() => handleRemove(index)}
                            className="ml-2 inline-flex h-4 w-4 items-center justify-center rounded-full text-blue-400 hover:bg-blue-200 hover:text-blue-600 focus:outline-none"
                        >
                            <X className="h-3 w-3" />
                        </button>
                    </span>
                ))}
            </div>
            <div className="mt-2 flex">
                <Input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Add item..."
                    className="rounded-r-none"
                />
                <button
                    type="button"
                    onClick={handleAdd}
                    className="inline-flex items-center rounded-r-md border border-l-0 border-gray-300 bg-gray-50 px-3 text-gray-500 hover:bg-gray-100"
                >
                    <Plus className="h-5 w-5" />
                </button>
            </div>
        </div>
    );
}
