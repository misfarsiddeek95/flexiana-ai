"use client";

import { ArrayField } from "../ArrayField";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";

export interface CarouselData {
    title: string;
    points: string[];
}

interface CarouselDataFormProps {
    value: CarouselData;
    onChange: (value: CarouselData) => void;
}

export function CarouselDataForm({ value, onChange }: CarouselDataFormProps) {
    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Carousel Data</h3>
            <div>
                <Label>Title</Label>
                <Input
                    value={value.title}
                    onChange={(e) => onChange({ ...value, title: e.target.value })}
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
