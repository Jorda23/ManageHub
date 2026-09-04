"use client";

import { useRef, useState } from "react";

import type { DragEvent, ChangeEvent } from "react";

import { Box, CircularProgress, IconButton, Typography } from "@mui/material";

import { FaCloudUploadAlt, FaTrashAlt } from "react-icons/fa";

import { colors } from "@/theme/sharedColors";

import { useUploadBase64Image } from "@/hook";

type ImageUrlFieldProps = {
  label?: string;
  value: string;
  disabled?: boolean;
  onChange: (value: string) => void;
};

export function ImageUrlField({
  label = "Imagen",
  value,
  disabled = false,
  onChange,
}: Readonly<ImageUrlFieldProps>) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const hasImage = value.trim().length > 0;

  const { mutateAsync: uploadBase64Image, isPending: isUploading } = useUploadBase64Image();

  const readFileAsDataUrl = (file: File) => {
    if (!file.type.startsWith("image/")) {
      return;
    }

    const reader = new FileReader();

    reader.onload = async () => {
      if (typeof reader.result !== "string") {
        return;
      }

      const url = await uploadBase64Image({
        base64Image: reader.result,
      });

      onChange(url);
    };

    reader.readAsDataURL(file);
  };

  const handleDrop = (event: DragEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsDragOver(false);

    if (disabled || isUploading) {
      return;
    }

    const file = event.dataTransfer.files[0];

    if (file) {
      readFileAsDataUrl(file);
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (disabled || isUploading) {
      return;
    }

    const file = event.target.files?.[0];

    if (file) {
      readFileAsDataUrl(file);
    }

    event.target.value = "";
  };

  return (
    <Box>
      {hasImage && (
        <Box
          sx={{
            position: "relative",
            mb: 1.5,
            borderRadius: "12px",
            overflow: "hidden",
            border: `1px solid ${colors.cardBorder}`,
            bgcolor: colors.cardBg,
          }}
        >
          <Box
            component="img"
            src={value.trim()}
            alt={label}
            sx={{
              display: "block",
              width: "100%",
              height: 180,
              objectFit: "cover",
            }}
          />

          <Box
            sx={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              gap: 1,
              p: 1.25,
              background: "linear-gradient(to top, rgba(15, 23, 42, 0.55), transparent 60%)",
            }}
          >
            <Typography
              sx={{
                color: "#ffffff",
                fontSize: 11,
                fontWeight: 700,
                bgcolor: "rgba(15, 23, 42, 0.55)",
                px: 1,
                py: 0.5,
                borderRadius: "7px",
                maxWidth: "70%",
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
              }}
            >
              {label}
            </Typography>

            <IconButton
              aria-label="Quitar imagen"
              size="small"
              disabled={disabled}
              onClick={() => onChange("")}
              sx={{
                width: 34,
                height: 34,
                bgcolor: "rgba(220, 38, 38, 0.95)",
                color: "#ffffff",

                "&:hover": {
                  bgcolor: "rgba(185, 28, 28, 1)",
                },

                "&.Mui-disabled": {
                  bgcolor: "#cbd5e1",
                  color: "#64748b",
                },
              }}
            >
              <FaTrashAlt size={12} />
            </IconButton>
          </Box>
        </Box>
      )}

      <Box
        component="button"
        type="button"
        disabled={disabled || isUploading}
        aria-label={hasImage ? "Reemplazar imagen" : "Subir imagen"}
        onClick={() => inputRef.current?.click()}
        onDragOver={(event: DragEvent<HTMLButtonElement>) => {
          event.preventDefault();
          if (!disabled && !isUploading) {
            setIsDragOver(true);
          }
        }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={handleDrop}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 0.75,
          width: "100%",
          minHeight: 118,
          cursor: disabled || isUploading ? "not-allowed" : "pointer",
          borderRadius: "12px",
          border: `2px dashed ${isDragOver ? colors.primaryLight : "rgba(37, 99, 235, 0.35)"}`,
          bgcolor: isDragOver ? colors.primarySoft : "rgba(241, 245, 249, 0.6)",
          color: isDragOver ? colors.primaryLight : colors.muted,
          padding: "14px",
          transition: "all 0.18s ease",
          fontFamily: "inherit",

          "&:focus-visible": {
            outline: `2px solid ${colors.primaryLight}`,
            outlineOffset: "2px",
          },

          "&:hover": {
            bgcolor: disabled || isUploading ? "rgba(241, 245, 249, 0.6)" : colors.primarySoft,
            borderColor: disabled || isUploading ? "rgba(37, 99, 235, 0.35)" : colors.primaryLight,
          },

          "&.Mui-disabled": {
            opacity: 0.6,
          },
        }}
      >
        <Box component="span" sx={{ display: "flex", fontSize: 26, lineHeight: 1 }}>
          {isUploading ? <CircularProgress size={26} thickness={4} /> : <FaCloudUploadAlt />}
        </Box>

        <Typography
          sx={{
            fontSize: 13,
            fontWeight: 700,
            color: isDragOver ? colors.primaryLight : colors.text,
            textAlign: "center",
          }}
        >
          {isUploading
            ? "Subiendo imagen..."
            : hasImage
              ? "Arrastra o haz clic para reemplazar"
              : "Arrastra tu imagen aquí o haz clic para seleccionar"}
        </Typography>

        <Typography
          sx={{
            fontSize: 10.5,
            fontWeight: 600,
            color: colors.softMuted,
            textAlign: "center",
            lineHeight: 1.45,
          }}
        >
          Solo imágenes (JPG, PNG, WebP). Se convertirá a URL automáticamente.
        </Typography>
      </Box>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        disabled={disabled || isUploading}
        onChange={handleFileChange}
      />
    </Box>
  );
}
