import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";

import { NextResponse } from "next/server";

type UploadImageRequest = {
  base64Image: string;
};

const IMAGE_TYPES: Record<string, string> = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
  "image/webp": "webp",
};

export async function POST(request: Request) {
  try {
    const { base64Image } = (await request.json()) as UploadImageRequest;

    if (!base64Image) {
      return NextResponse.json({ message: "base64Image is required" }, { status: 400 });
    }

    const match = base64Image.match(/^data:(image\/[a-zA-Z0-9.+-]+);base64,(.+)$/);

    if (!match) {
      return NextResponse.json({ message: "Invalid base64 image" }, { status: 400 });
    }

    const [, mimeType, base64Data] = match;

    const extension = IMAGE_TYPES[mimeType];

    if (!extension) {
      return NextResponse.json({ message: `Unsupported image type: ${mimeType}` }, { status: 400 });
    }

    const fileName = `${randomUUID()}.${extension}`;

    const uploadDirectory = path.join(process.cwd(), "public", "uploads");

    await mkdir(uploadDirectory, {
      recursive: true,
    });

    await writeFile(path.join(uploadDirectory, fileName), Buffer.from(base64Data, "base64"));

    const url = new URL(`/uploads/${fileName}`, request.url).toString();

    return NextResponse.json({
      url,
    });
  } catch (error) {
    console.error("Image upload error:", error);

    return NextResponse.json({ message: "Unable to upload image" }, { status: 500 });
  }
}
