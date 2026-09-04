const IMAGEKIT_ENDPOINT = "https://ik.imagekit.io/c8wqy5d3a";

type ImageKitTransformOptions = {
  width?: number;
  height?: number;
  quality?: number;
  format?: "auto" | "jpg" | "png" | "webp";
};

export function getImageKitUrl(
  url: string | undefined | null,
  options: ImageKitTransformOptions = {},
): string {
  if (!url || url.trim().length === 0) {
    return "";
  }

  const trimmed = url.trim();

  if (!trimmed.startsWith(IMAGEKIT_ENDPOINT)) {
    return trimmed;
  }

  const transformations: string[] = [];

  if (options.width) {
    transformations.push(`w-${options.width}`);
  }

  if (options.height) {
    transformations.push(`h-${options.height}`);
  }

  if (options.quality) {
    transformations.push(`q-${options.quality}`);
  }

  if (options.format) {
    transformations.push(`f-${options.format}`);
  }

  if (transformations.length === 0) {
    return trimmed;
  }

  const separator = trimmed.includes("?") ? "&" : "?";

  return `${trimmed}${separator}tr=${transformations.join(",")}`;
}
