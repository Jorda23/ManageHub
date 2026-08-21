"use client";

import type { ReactNode } from "react";
import { FaMapMarkedAlt, FaPlusCircle, FaTimes, FaUserTie } from "react-icons/fa";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";

import { ImageUploadField } from "../ImageUploadField/ImageUploadField";

export type PropertyForm = {
  name: string;
  code: string;
  location: string;
  size: string;
  price: string;
  imageUrl: string;
  ownerName: string;
  ownerPhone: string;
  ownerDocument: string;
};

type AddPropertyDialogProps = {
  open: boolean;
  form: PropertyForm;
  error: string;
  onChange: (field: keyof PropertyForm, value: string) => void;
  onClose: () => void;
  onSubmit: () => void;
};

const fieldSx: SxProps<Theme> = {
  "& .MuiOutlinedInput-root": {
    minHeight: 44,
    borderRadius: 2.5,
    bgcolor: "#ffffff",
    color: "#17251f",
    fontSize: 13,
    fontWeight: 700,
    "& fieldset": { borderColor: "#cbd8d2" },
    "&:hover fieldset": { borderColor: "#819b90" },
    "&.Mui-focused fieldset": {
      borderColor: "#0b5a43",
      borderWidth: 1.5,
    },
  },
  "& .MuiInputBase-input": {
    color: "#17251f !important",
    WebkitTextFillColor: "#17251f !important",
    opacity: "1 !important",
  },
  "& .MuiInputBase-input::placeholder": {
    color: "#7a8d85",
    WebkitTextFillColor: "#7a8d85",
    opacity: "1 !important",
  },
};

export default function AddPropertyDialog({
  open,
  form,
  error,
  onChange,
  onClose,
  onSubmit,
}: AddPropertyDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth={false}
      slotProps={{
        backdrop: {
          sx: {
            bgcolor: "rgba(9, 32, 25, 0.42)",
            backdropFilter: "blur(4px)",
          },
        },
        paper: {
          sx: {
            width: { xs: "calc(100% - 24px)", sm: 620 },
            maxWidth: 620,
            maxHeight: "calc(100vh - 32px)",
            m: { xs: 1.5, sm: 2 },
            borderRadius: 1,
            overflow: "hidden",
            border: "1px solid rgba(4, 77, 55, 0.18)",
            boxShadow: "0 28px 70px rgba(8, 34, 26, 0.32)",
          },
        },
      }}
    >
      <DialogTitle
        component="div"
        sx={{
          px: { xs: 2, sm: 2.5 },
          py: 2,
          bgcolor: "#064b36",
          color: "#ffffff",
          borderBottom: "1px solid rgba(255,255,255,0.12)",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}>
          <Box sx={{ minWidth: 0 }}>
            <Typography sx={{ fontSize: 18, fontWeight: 950, lineHeight: 1.15 }}>
              Agregar nuevo terreno
            </Typography>
            <Typography
              sx={{
                mt: 0.45,
                color: "rgba(255,255,255,0.82)",
                fontSize: 11.5,
                fontWeight: 650,
              }}
            >
              Registra un terreno captado por el cliente propietario.
            </Typography>
          </Box>

          <IconButton
            aria-label="Cerrar"
            onClick={onClose}
            size="small"
            sx={{
              mt: -0.4,
              mr: -0.6,
              color: "#ffffff",
              width: 32,
              height: 32,
              "&:hover": { bgcolor: "rgba(255,255,255,0.12)" },
            }}
          >
            <FaTimes size={15} />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ p: 0, bgcolor: "#ffffff", overflowY: "auto" }}>
        <Box sx={{ px: { xs: 2, sm: 2.5 }, py: 2.25 }}>
          {error ? <ErrorMessage>{error}</ErrorMessage> : null}

          <SectionTitle icon={<FaUserTie size={12} />} title="Datos del cliente propietario" />
          <FieldGrid sx={{ mb: 2.5 }}>
            <FormField label="Nombre del cliente *">
              <PropertyTextField
                placeholder="Ej. Juan Pérez"
                value={form.ownerName}
                onChange={(value) => onChange("ownerName", value)}
              />
            </FormField>
            <FormField label="Teléfono">
              <PropertyTextField
                placeholder="+505 0000-0000"
                value={form.ownerPhone}
                onChange={(value) => onChange("ownerPhone", value)}
              />
            </FormField>
            <FormField label="Cédula / documento" fullRow>
              <PropertyTextField
                placeholder="000-000000-0000X"
                value={form.ownerDocument}
                onChange={(value) => onChange("ownerDocument", value)}
              />
            </FormField>
          </FieldGrid>

          <SectionTitle icon={<FaMapMarkedAlt size={12} />} title="Datos del terreno" />
          <FieldGrid>
            <FormField label="Nombre del terreno *">
              <PropertyTextField
                placeholder="Ej. Lote D-15"
                value={form.name}
                onChange={(value) => onChange("name", value)}
              />
            </FormField>
            <FormField label="Código *">
              <PropertyTextField
                placeholder="PRP-LT-001"
                value={form.code}
                onChange={(value) => onChange("code", value)}
              />
            </FormField>
            <FormField label="Ubicación *" fullRow>
              <PropertyTextField
                placeholder="Ej. Managua, carretera sur"
                value={form.location}
                onChange={(value) => onChange("location", value)}
              />
            </FormField>
            <FormField label="Medida *">
              <PropertyTextField
                placeholder="Ej. 500 m²"
                value={form.size}
                onChange={(value) => onChange("size", value)}
              />
            </FormField>
            <FormField label="Precio de venta *">
              <PropertyTextField
                type="number"
                placeholder="0.00"
                value={form.price}
                onChange={(value) => onChange("price", value)}
                inputProps={{ min: 0, step: 0.01 }}
              />
            </FormField>
          </FieldGrid>

          <Box sx={{ mt: 2.5 }}>
            <ImageUploadField
              label="Imagen para la tarjeta"
              value={form.imageUrl}
              onChange={(imageUrl) => onChange("imageUrl", imageUrl)}
            />
          </Box>
        </Box>
      </DialogContent>

      <DialogActions
        sx={{
          px: { xs: 2, sm: 2.5 },
          py: 1.6,
          gap: 1,
          borderTop: "1px solid #d9e2de",
          bgcolor: "#f7f9f8",
        }}
      >
        <Button
          onClick={onClose}
          sx={{ textTransform: "none", fontWeight: 850, color: "#4b5f57", px: 2 }}
        >
          Cancelar
        </Button>
        <Button
          variant="contained"
          startIcon={<FaPlusCircle size={13} />}
          onClick={onSubmit}
          sx={{
            color: "white",
            bgcolor: "#064b36",
            borderRadius: 1,
            px: 2.2,
            py: 1,
            textTransform: "none",
            fontSize: 12.5,
            fontWeight: 900,
            boxShadow: "none",
            "&:hover": { bgcolor: "#043d2d", boxShadow: "none" },
          }}
        >
          Guardar terreno
        </Button>
      </DialogActions>
    </Dialog>
  );
}

function PropertyTextField({
  value,
  onChange,
  placeholder,
  type = "text",
  inputProps,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  inputProps?: Record<string, string | number>;
}) {
  return (
    <TextField
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      size="small"
      fullWidth
      sx={fieldSx}
      slotProps={{ htmlInput: inputProps }}
    />
  );
}

function FieldGrid({ children, sx }: { children: ReactNode; sx?: SxProps<Theme> }) {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", sm: "repeat(2, minmax(0, 1fr))" },
        gap: 1.5,
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}

function FormField({
  label,
  children,
  fullRow = false,
}: {
  label: string;
  children: ReactNode;
  fullRow?: boolean;
}) {
  return (
    <Box sx={{ gridColumn: fullRow ? { xs: "auto", sm: "1 / -1" } : "auto" }}>
      <Typography
        sx={{
          mb: 0.55,
          color: "#344b42",
          fontSize: 9.5,
          fontWeight: 950,
          textTransform: "uppercase",
          letterSpacing: "0.035em",
        }}
      >
        {label}
      </Typography>
      {children}
    </Box>
  );
}

function SectionTitle({ icon, title }: { icon: ReactNode; title: string }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.35 }}>
      <Box sx={{ color: "#0b5a43", display: "grid", placeItems: "center" }}>{icon}</Box>
      <Typography
        sx={{
          color: "#23483b",
          fontSize: 10.5,
          fontWeight: 950,
          textTransform: "uppercase",
          letterSpacing: "0.045em",
          whiteSpace: "nowrap",
        }}
      >
        {title}
      </Typography>
      <Divider sx={{ flex: 1, borderColor: "#d7e0dc" }} />
    </Box>
  );
}

function ErrorMessage({ children }: { children: ReactNode }) {
  return (
    <Box
      sx={{
        mb: 2,
        px: 1.5,
        py: 1.1,
        borderRadius: 2,
        bgcolor: "#fee2e2",
        border: "1px solid #fecaca",
        color: "#dc2626",
        fontSize: 12,
        fontWeight: 800,
      }}
    >
      {children}
    </Box>
  );
}
