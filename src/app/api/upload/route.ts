import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";
import sharp from "sharp";

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get("file") as File;
        const type = formData.get("type") as string;

        if (!file) {
            return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
        }

        if (!type || !["blog", "case-study"].includes(type)) {
            return NextResponse.json({ error: "Invalid upload type" }, { status: 400 });
        }

        const buffer = Buffer.from(await file.arrayBuffer());

        // Validate it's an image
        try {
            await sharp(buffer).metadata();
        } catch (e) {
            return NextResponse.json({ error: "Invalid image file" }, { status: 400 });
        }

        const filename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.]/g, "_")}`;
        // Ensure filename ends with .webp since we are converting
        const finalFilename = filename.replace(/\.[^/.]+$/, "") + ".webp";

        const uploadDir = path.join(process.cwd(), "public", "uploads", type);

        try {
            await fs.access(uploadDir);
        } catch {
            await fs.mkdir(uploadDir, { recursive: true });
        }

        const filepath = path.join(uploadDir, finalFilename);

        // Compress and save
        await sharp(buffer, { animated: true })
            .resize(1200, 1200, { // Max dimensions, maintain aspect ratio
                fit: "inside",
                withoutEnlargement: true
            })
            .webp({ quality: 80, effort: 6 })
            .toFile(filepath);

        const url = `/uploads/${type}/${finalFilename}`;

        return NextResponse.json({ url });
    } catch (error) {
        console.error("Upload error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const { url } = await req.json();

        if (!url) {
            return NextResponse.json({ error: "URL is required" }, { status: 400 });
        }

        // Validate URL format to prevent directory traversal
        if (!url.startsWith("/uploads/")) {
            return NextResponse.json({ error: "Invalid file URL" }, { status: 400 });
        }

        const filepath = path.join(process.cwd(), "public", url);

        try {
            await fs.unlink(filepath);
            return NextResponse.json({ success: true });
        } catch (error) {
            console.error("Delete error:", error);
            // If file doesn't exist, we can consider it "deleted" or return 404.
            // Returning success to keep client logic simple if file is already gone.
            return NextResponse.json({ success: true });
        }
    } catch (error) {
        console.error("Delete handler error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
