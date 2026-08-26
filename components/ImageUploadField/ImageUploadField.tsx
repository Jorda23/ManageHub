"use client";

import { ChangeEvent, DragEvent, KeyboardEvent, useId, useRef, useState } from "react";

import { Box, Button, Typography } from "@mui/material";

import { FaImage, FaTrashAlt, FaUpload } from "react-icons/fa";
import { colors } from "@/theme/sharedColors";

type ImageUploadFieldProps = {
  label?: string;
  value: string;
  disabled?: boolean;
  accept?: string;
  maxSizeMb?: number;
  onChange: (value: string) => void;
};

export function ImageUploadField({
  label = "Imagen",
  value,
  disabled = false,
  accept = "image/png,image/jpeg,image/webp",
  maxSizeMb = 10,
  onChange,
}: Readonly<ImageUploadFieldProps>) {
  const inputId = useId();

  const inputRef = useRef<HTMLInputElement | null>(null);

  const [isDragging, setIsDragging] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const openFilePicker = (): void => {
    if (disabled) {
      return;
    }

    inputRef.current?.click();
  };

  const validateFile = (file: File): boolean => {
    if (!file.type.startsWith("image/")) {
      setError("Selecciona un archivo de imagen válido.");

      return false;
    }

    const maxBytes = maxSizeMb * 1024 * 1024;

    if (file.size > maxBytes) {
      setError(`La imagen no puede superar los ${maxSizeMb} MB.`);

      return false;
    }

    setError(null);

    return true;
  };

  const processFile = (file: File | undefined): void => {
    if (!file || disabled) {
      return;
    }

    if (!validateFile(file)) {
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result === "string") {
        onChange(reader.result);
      }
    };

    reader.readAsDataURL(file);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    processFile(event.target.files?.[0]);

    event.target.value = "";
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>): void => {
    event.preventDefault();

    if (!disabled) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = (event: DragEvent<HTMLDivElement>): void => {
    event.preventDefault();

    setIsDragging(false);
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>): void => {
    event.preventDefault();

    setIsDragging(false);

    processFile(event.dataTransfer.files?.[0]);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>): void => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();

      openFilePicker();
    }
  };

  const handleRemove = (): void => {
    if (disabled) {
      return;
    }

    setError(null);
    onChange("");
  };

  if (value) {
    return (
      <Box>
        <Box
          sx={{
            position: "relative",

            width: "100%",
            minHeight: 220,

            borderRadius: "14px",
            overflow: "hidden",

            border: `1px solid ${colors.cardBorder}`,

            bgcolor: colors.cardBg,
          }}
        >
          <Box
            component="img"
            src={value}
            alt={label}
            sx={{
              display: "block",

              width: "100%",
              height: 220,

              objectFit: "cover",
            }}
          />

          <Box
            sx={{
              position: "absolute",
              inset: 0,

              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",

              p: 1.5,

              background: "linear-gradient(to top, rgba(15, 23, 42, 0.72), transparent 55%)",
            }}
          >
            <Typography
              sx={{
                color: "#ffffff",
                fontSize: 12,
                fontWeight: 700,

                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",

                maxWidth: "65%",
              }}
            >
              {label}
            </Typography>

            <Box
              sx={{
                display: "flex",
                gap: 1,
              }}
            >
              <Button
                type="button"
                disabled={disabled}
                onClick={openFilePicker}
                startIcon={<FaUpload size={11} />}
                sx={{
                  minHeight: 34,

                  px: 1.5,

                  borderRadius: "8px",

                  bgcolor: "#ffffff",
                  color: colors.text,

                  fontSize: 11,
                  fontWeight: 800,
                  textTransform: "none",

                  "&:hover": {
                    bgcolor: "#f8fafc",
                  },
                }}
              >
                Cambiar
              </Button>

              <Button
                type="button"
                disabled={disabled}
                onClick={handleRemove}
                sx={{
                  minWidth: 36,
                  width: 36,
                  height: 34,

                  p: 0,

                  borderRadius: "8px",

                  bgcolor: "rgba(220, 38, 38, 0.95)",

                  color: "#ffffff",

                  "&:hover": {
                    bgcolor: "rgba(185, 28, 28, 1)",
                  },
                }}
              >
                <FaTrashAlt size={12} />
              </Button>
            </Box>
          </Box>
        </Box>

        {error && (
          <Typography
            sx={{
              mt: 0.75,

              color: colors.danger,

              fontSize: 10.5,
              fontWeight: 650,
            }}
          >
            {error}
          </Typography>
        )}

        <input
          ref={inputRef}
          id={inputId}
          type="file"
          accept={accept}
          disabled={disabled}
          hidden
          onChange={handleInputChange}
        />
      </Box>
    );
  }

  return (
    <Box>
      <Box
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-disabled={disabled}
        onClick={openFilePicker}
        onKeyDown={handleKeyDown}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        sx={{
          position: "relative",

          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",

          minHeight: {
            xs: 200,
            sm: 220,
          },

          px: 3,
          py: 3,

          borderRadius: "14px",

          border: "1.5px dashed",

          borderColor: isDragging ? colors.primaryLight : "#93c5fd",

          bgcolor: isDragging ? "#eff6ff" : "#fafcff",

          cursor: disabled ? "not-allowed" : "pointer",

          opacity: disabled ? 0.6 : 1,

          outline: "none",

          transition:
            "border-color 0.18s ease, background-color 0.18s ease, box-shadow 0.18s ease, transform 0.18s ease",

          "&:hover": disabled
            ? undefined
            : {
                borderColor: colors.primaryLight,

                bgcolor: colors.primarySoft,
              },

          "&:focus-visible": {
            boxShadow: "0 0 0 3px rgba(37, 99, 235, 0.12)",
          },
        }}
      >
        <Box
          sx={{
            position: "relative",

            display: "flex",
            alignItems: "center",
            justifyContent: "center",

            width: 76,
            height: 64,

            mb: 1.75,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",

              width: 62,
              height: 54,

              borderRadius: "12px",

              bgcolor: "#e0f2fe",

              color: "#38bdf8",

              border: "2px solid #7dd3fc",
            }}
          >
            <FaImage size={27} />
          </Box>

          <Box
            sx={{
              position: "absolute",

              right: 0,
              bottom: -3,

              display: "flex",
              alignItems: "center",
              justifyContent: "center",

              width: 32,
              height: 32,

              borderRadius: "50%",

              bgcolor: colors.primaryLight,

              color: "#ffffff",

              border: "3px solid #ffffff",

              boxShadow: "0 4px 10px rgba(37, 99, 235, 0.25)",
            }}
          >
            <FaUpload size={12} />
          </Box>
        </Box>

        <Typography
          sx={{
            color: colors.text,

            fontSize: 13,
            fontWeight: 800,

            textAlign: "center",
          }}
        >
          Arrastra y suelta una imagen aquí
        </Typography>

        <Typography
          sx={{
            mt: 0.4,

            color: "#94a3b8",

            fontSize: 11,
            fontWeight: 600,
          }}
        >
          o
        </Typography>

        <Button
          component="span"
          type="button"
          disabled={disabled}
          onClick={(event) => {
            event.stopPropagation();

            openFilePicker();
          }}
          startIcon={<FaImage size={12} />}
          sx={{
            mt: 1.2,

            minHeight: 38,

            px: 2.6,

            borderRadius: "8px",

            bgcolor: colors.primaryLight,

            color: "#ffffff",

            fontSize: 11.5,
            fontWeight: 800,
            textTransform: "none",

            boxShadow: "0 5px 12px rgba(37, 99, 235, 0.18)",

            "&:hover": {
              bgcolor: colors.primary,
            },

            "&.Mui-disabled": {
              bgcolor: "#cbd5e1",
              color: "#ffffff",
            },
          }}
        >
          Seleccionar imagen
        </Button>

        <Typography
          sx={{
            mt: 1.4,

            color: colors.muted,

            fontSize: 10.5,
            fontWeight: 600,

            textAlign: "center",
          }}
        >
          PNG, JPG o WEBP hasta {maxSizeMb} MB
        </Typography>

        <input
          ref={inputRef}
          id={inputId}
          type="file"
          accept={accept}
          disabled={disabled}
          hidden
          onChange={handleInputChange}
        />
      </Box>

      {error && (
        <Typography
          sx={{
            mt: 0.75,

            color: colors.danger,

            fontSize: 10.5,
            fontWeight: 650,
          }}
        >
          {error}
        </Typography>
      )}
    </Box>
  );
}
