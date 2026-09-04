import { randomUUID } from "node:crypto";

import { NextResponse } from "next/server";
import ImageKit from "@imagekit/nodejs";

const imagekit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
});

type UploadImageRequest = {
  base64Image: string;
};

const IMAGE_MIME_MAP: Record<string, string> = {
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

    const extension = IMAGE_MIME_MAP[mimeType];

    if (!extension) {
      return NextResponse.json({ message: `Unsupported image type: ${mimeType}` }, { status: 400 });
    }

    const fileName = `${randomUUID()}.${extension}`;

    const result = await imagekit.files.upload({
      file: `data:${mimeType};base64,${base64Data}`,
      fileName,
      folder: "/uploads",
      useUniqueFileName: false,
    });

    return NextResponse.json({
      url: result.url,
    });
  } catch (error) {
    console.error("Image upload error:", error);

    return NextResponse.json({ message: "Unable to upload image" }, { status: 500 });
  }
}
