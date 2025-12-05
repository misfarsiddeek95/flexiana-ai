"use client";

import { ArrayField } from "../ArrayField";
import { Plus, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";

export interface TechStackData {
    categories: { name: string; technologies: string[] }[];
}

interface TechStackFormProps {
    value: TechStackData;
    onChange: (value: TechStackData) => void;
}

export function TechStackForm({ value, onChange }: TechStackFormProps) {
    const addCategory = () => {
        onChange({
            ...value,
            categories: [...value.categories, { name: "", technologies: [] }],
        });
    };

    const removeCategory = (index: number) => {
        const newCategories = [...value.categories];
        newCategories.splice(index, 1);
        onChange({ ...value, categories: newCategories });
    };

    const updateCategory = (index: number, field: keyof TechStackData['categories'][0], val: string | string[]) => {
        const newCategories = [...value.categories];
        newCategories[index] = { ...newCategories[index], [field]: val };
        onChange({ ...value, categories: newCategories });
    };

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Tech Stack</h3>
            <div className="space-y-4">
                {value.categories.map((category, index) => (
                    <div
                        key={index}
                        className="relative rounded-lg border border-gray-200 bg-gray-50 p-4"
                    >
                        <button
                            type="button"
                            onClick={() => removeCategory(index)}
                            className="absolute right-3 top-3 text-gray-400 hover:text-red-500"
                        >
                            <Trash2 className="h-4 w-4" />
                        </button>
                        <div className="grid grid-cols-1 gap-4">
                            <div>
                                <Label className="text-xs text-gray-500">Category Name</Label>
                                <Input
                                    value={category.name}
                                    onChange={(e) =>
                                        updateCategory(index, "name", e.target.value)
                                    }
                                    placeholder="e.g. Frontend"
                                />
                            </div>
                            <ArrayField
                                label="Technologies"
                                values={category.technologies}
                                onChange={(techs) =>
                                    updateCategory(index, "technologies", techs)
                                }
                            />
                        </div>
                    </div>
                ))}
                <button
                    type="button"
                    onClick={addCategory}
                    className="flex items-center text-sm font-medium text-blue-600 hover:text-blue-700"
                >
                    <Plus className="mr-1 h-4 w-4" /> Add Category
                </button>
            </div>
        </div>
    );
}
