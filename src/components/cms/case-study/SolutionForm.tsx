"use client";

import { ArrayField } from "../ArrayField";
import { Plus, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Textarea } from "@/components/ui/Textarea";

export interface SolutionData {
    description: string;
    approach: { title: string; description: string; details: string[] }[];
}

interface SolutionFormProps {
    value: SolutionData;
    onChange: (value: SolutionData) => void;
}

export function SolutionForm({ value, onChange }: SolutionFormProps) {
    const addApproach = () => {
        onChange({
            ...value,
            approach: [
                ...value.approach,
                { title: "", description: "", details: [] },
            ],
        });
    };

    const removeApproach = (index: number) => {
        const newApproach = [...value.approach];
        newApproach.splice(index, 1);
        onChange({ ...value, approach: newApproach });
    };

    const updateApproach = (index: number, field: keyof SolutionData['approach'][0], val: string | string[]) => {
        const newApproach = [...value.approach];
        newApproach[index] = { ...newApproach[index], [field]: val };
        onChange({ ...value, approach: newApproach });
    };

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Solution</h3>
            <div>
                <Label>Description</Label>
                <Textarea
                    value={value.description}
                    onChange={(e) =>
                        onChange({ ...value, description: e.target.value })
                    }
                    rows={3}
                />
            </div>

            <div>
                <Label>Approach Steps</Label>
                <div className="mt-3 space-y-4">
                    {value.approach.map((item, index) => (
                        <div
                            key={index}
                            className="relative rounded-lg border border-gray-200 bg-gray-50 p-4"
                        >
                            <button
                                type="button"
                                onClick={() => removeApproach(index)}
                                className="absolute right-3 top-3 text-gray-400 hover:text-red-500"
                            >
                                <Trash2 className="h-4 w-4" />
                            </button>
                            <div className="grid grid-cols-1 gap-4">
                                <div>
                                    <Label className="text-xs text-gray-500">Title</Label>
                                    <Input
                                        value={item.title}
                                        onChange={(e) =>
                                            updateApproach(index, "title", e.target.value)
                                        }
                                    />
                                </div>
                                <div>
                                    <Label className="text-xs text-gray-500">Description</Label>
                                    <Textarea
                                        value={item.description}
                                        onChange={(e) =>
                                            updateApproach(index, "description", e.target.value)
                                        }
                                        rows={2}
                                    />
                                </div>
                                <ArrayField
                                    label="Details"
                                    values={item.details}
                                    onChange={(details) =>
                                        updateApproach(index, "details", details)
                                    }
                                />
                            </div>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={addApproach}
                        className="flex items-center text-sm font-medium text-blue-600 hover:text-blue-700"
                    >
                        <Plus className="mr-1 h-4 w-4" /> Add Approach Step
                    </button>
                </div>
            </div>
        </div>
    );
}
