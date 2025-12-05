"use client";

import { ArrayField } from "../ArrayField";
import { Plus, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Textarea } from "@/components/ui/Textarea";

export interface ResultsData {
    description: string;
    metrics: { value: string; label: string; icon?: string }[];
    outcomes: string[];
}

interface ResultsFormProps {
    value: ResultsData;
    onChange: (value: ResultsData) => void;
}

export function ResultsForm({ value, onChange }: ResultsFormProps) {
    const addMetric = () => {
        onChange({
            ...value,
            metrics: [...value.metrics, { value: "", label: "", icon: "" }],
        });
    };

    const removeMetric = (index: number) => {
        const newMetrics = [...value.metrics];
        newMetrics.splice(index, 1);
        onChange({ ...value, metrics: newMetrics });
    };

    const updateMetric = (index: number, field: string, val: string) => {
        const newMetrics = [...value.metrics];
        newMetrics[index] = { ...newMetrics[index], [field]: val };
        onChange({ ...value, metrics: newMetrics });
    };

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Results</h3>
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
                <Label>Metrics</Label>
                <div className="mt-3 space-y-4">
                    {value.metrics.map((metric, index) => (
                        <div
                            key={index}
                            className="relative grid grid-cols-1 gap-4 rounded-lg border border-gray-200 bg-gray-50 p-4 sm:grid-cols-3"
                        >
                            <button
                                type="button"
                                onClick={() => removeMetric(index)}
                                className="absolute right-2 top-2 text-gray-400 hover:text-red-500 sm:right-3 sm:top-3"
                            >
                                <Trash2 className="h-4 w-4" />
                            </button>
                            <div>
                                <Label className="text-xs text-gray-500">Value</Label>
                                <Input
                                    value={metric.value}
                                    onChange={(e) =>
                                        updateMetric(index, "value", e.target.value)
                                    }
                                    placeholder="e.g. 50%"
                                />
                            </div>
                            <div>
                                <Label className="text-xs text-gray-500">Label</Label>
                                <Input
                                    value={metric.label}
                                    onChange={(e) =>
                                        updateMetric(index, "label", e.target.value)
                                    }
                                    placeholder="e.g. Efficiency"
                                />
                            </div>
                            <div>
                                <Label className="text-xs text-gray-500">Icon (Lucide Name)</Label>
                                <Input
                                    value={metric.icon}
                                    onChange={(e) =>
                                        updateMetric(index, "icon", e.target.value)
                                    }
                                    placeholder="e.g. TrendingUp"
                                />
                            </div>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={addMetric}
                        className="flex items-center text-sm font-medium text-blue-600 hover:text-blue-700"
                    >
                        <Plus className="mr-1 h-4 w-4" /> Add Metric
                    </button>
                </div>
            </div>

            <ArrayField
                label="Outcomes"
                values={value.outcomes}
                onChange={(outcomes) => onChange({ ...value, outcomes })}
            />
        </div>
    );
}
