"use client";

import { useEffect, useRef, useState, type ChangeEvent } from "react";

import { Box, Button, Paper, Typography } from "@mui/material";

type ImageUploadFieldProps = {
  label: string;
  value?: string;
  disabled?: boolean;
  helperText?: string;
  onChange: (value: string) => void;
};

export function ImageUploadField({
  label,
  value,
  disabled = false,
  helperText = "PNG, JPG o WEBP. La imagen se comprime automáticamente para guardar una versión más liviana.",
  onChange,
}: ImageUploadFieldProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (!value && inputRef.current) {
      inputRef.current.value = "";
    }
  }, [value]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      return;
    }

    setIsProcessing(true);

    void compressImage(file)
      .then((result) => {
        onChange(result);
      })
      .finally(() => {
        setIsProcessing(false);
      });
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      <Typography
        sx={{
          color: "#344b42",
          fontSize: 9.5,
          fontWeight: 950,
          textTransform: "uppercase",
          letterSpacing: "0.035em",
        }}
      >
        {label}
      </Typography>

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.25, alignItems: "center" }}>
        <Button
          component="label"
          variant="outlined"
          disabled={disabled || isProcessing}
          sx={{
            borderRadius: 2,
            textTransform: "none",
            fontWeight: 800,
            borderColor: "#cbd8d2",
            color: "#0b5a43",
            bgcolor: "#ffffff",
            "&:hover": {
              borderColor: "#0b5a43",
              bgcolor: "#f7faf8",
            },
          }}
        >
          {isProcessing ? "Optimizando..." : value ? "Cambiar imagen" : "Subir imagen"}
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            hidden
            disabled={disabled || isProcessing}
            onChange={handleFileChange}
          />
        </Button>

        {value ? (
          <Button
            type="button"
            variant="text"
            disabled={disabled || isProcessing}
            onClick={() => onChange("")}
            sx={{
              textTransform: "none",
              fontWeight: 800,
              color: "#dc2626",
            }}
          >
            Quitar imagen
          </Button>
        ) : null}
      </Box>

      <Typography
        sx={{
          color: "#64748b",
          fontSize: 12,
          lineHeight: 1.4,
        }}
      >
        {helperText}
      </Typography>

      {value ? (
        <Paper
          elevation={0}
          sx={{
            mt: 0.5,
            overflow: "hidden",
            borderRadius: 2,
            border: "1px solid #d7e0dc",
            bgcolor: "#f8fafc",
          }}
        >
          <Box
            component="img"
            src={value}
            alt="Vista previa de la imagen"
            sx={{
              display: "block",
              width: "100%",
              maxHeight: 180,
              objectFit: "cover",
            }}
          />
        </Paper>
      ) : null}
    </Box>
  );
}

async function compressImage(file: File): Promise<string> {
  const image = await loadImage(file);
  const { width, height } = fitWithin(image.width, image.height, 1280);
  const canvas = document.createElement("canvas");

  canvas.width = width;
  canvas.height = height;

  const context = canvas.getContext("2d");

  if (!context) {
    return readAsDataUrl(file);
  }

  context.imageSmoothingEnabled = true;
  context.imageSmoothingQuality = "high";
  context.drawImage(image, 0, 0, width, height);

  const blob = await canvasToBlob(canvas, "image/webp", 0.82);

  if (blob) {
    return await readBlobAsDataUrl(blob);
  }

  return canvas.toDataURL("image/webp", 0.82);
}

function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onerror = () => reject(new Error("No se pudo leer la imagen."));
    reader.onload = () => {
      const image = new Image();

      image.onload = () => resolve(image);
      image.onerror = () => reject(new Error("No se pudo cargar la imagen."));
      image.src = String(reader.result);
    };

    reader.readAsDataURL(file);
  });
}

function fitWithin(width: number, height: number, maxSide: number) {
  if (width <= maxSide && height <= maxSide) {
    return { width, height };
  }

  const scale = Math.min(maxSide / width, maxSide / height);

  return {
    width: Math.max(1, Math.round(width * scale)),
    height: Math.max(1, Math.round(height * scale)),
  };
}

function canvasToBlob(canvas: HTMLCanvasElement, type: string, quality: number) {
  return new Promise<Blob | null>((resolve) => {
    canvas.toBlob((blob) => resolve(blob), type, quality);
  });
}

function readBlobAsDataUrl(blob: Blob) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();

    reader.onerror = () => reject(new Error("No se pudo convertir la imagen."));
    reader.onload = () => resolve(String(reader.result));
    reader.readAsDataURL(blob);
  });
}

function readAsDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();

    reader.onerror = () => reject(new Error("No se pudo leer la imagen."));
    reader.onload = () => resolve(String(reader.result));
    reader.readAsDataURL(file);
  });
}
