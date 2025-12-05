"use client";

import { ArrayField } from "../ArrayField";
import { Label } from "@/components/ui/Label";
import { Textarea } from "@/components/ui/Textarea";

interface ChallengeFormProps {
    value: { description: string; points: string[] };
    onChange: (value: { description: string; points: string[] }) => void;
}

export function ChallengeForm({ value, onChange }: ChallengeFormProps) {
    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Challenge</h3>
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
            <ArrayField
                label="Points"
                values={value.points}
                onChange={(points) => onChange({ ...value, points })}
            />
        </div>
    );
}
