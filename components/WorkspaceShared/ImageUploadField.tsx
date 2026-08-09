"use client";

import { useEffect, useRef, type ChangeEvent } from "react";

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
  helperText = "PNG, JPG o WEBP. Puedes subir una imagen desde tu equipo.",
  onChange,
}: ImageUploadFieldProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);

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

    const reader = new FileReader();

    reader.onload = () => {
      const result = reader.result;

      if (typeof result === "string") {
        onChange(result);
      }
    };

    reader.readAsDataURL(file);
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
          disabled={disabled}
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
          {value ? "Cambiar imagen" : "Subir imagen"}
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            hidden
            disabled={disabled}
            onChange={handleFileChange}
          />
        </Button>

        {value ? (
          <Button
            type="button"
            variant="text"
            disabled={disabled}
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
