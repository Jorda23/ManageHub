import { useMutation } from "@tanstack/react-query";

type UploadImageResponse = {
  url: string;
};

type UploadBase64ImageParams = {
  base64Image: string;
};

async function uploadBase64Image(
  base64Image: string,
): Promise<string> {
  const response = await fetch("/api/images/upload", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      base64Image,
    }),
  });

  if (!response.ok) {
    throw new Error("Unable to upload image");
  }

  const data =
    (await response.json()) as UploadImageResponse;

  return data.url;
}

export function useUploadBase64Image() {
  return useMutation<
    string,
    Error,
    UploadBase64ImageParams
  >({
    mutationFn: ({ base64Image }) =>
      uploadBase64Image(base64Image),
  });
}