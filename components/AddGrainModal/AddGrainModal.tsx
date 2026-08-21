"use client";

import { useState, type FormEvent } from "react";

import { Box, InputAdornment, MenuItem, TextField } from "@mui/material";

import type { SxProps, Theme } from "@mui/material/styles";

import { FaPlus, FaSeedling } from "react-icons/fa";

import { FormModal } from "../FormModal";
import { ModalField } from "../ModalField";
import { ImageUploadField } from "../ImageUploadField/ImageUploadField";

export type AddGrainFormValues = {
  name: string;
  unit: string;
  location: string;
  initialStock: string;
  minimumStock: string;
  unitPrice: string;
  imageUrl: string;
};

type AddGrainFormErrors = Partial<Record<keyof AddGrainFormValues, string>>;

type AddGrainModalProps = {
  open: boolean;
  onClose: () => void;
  onSave: (values: AddGrainFormValues) => void | Promise<void>;
};

const colors = {
  primary: "#064e3b",
  primaryLight: "#0f766e",
  primarySoft: "#dcfce7",
  text: "#0f172a",
  muted: "#64748b",
  danger: "#ef4444",
  border: "#d7e0dc",
};

const initialValues: AddGrainFormValues = {
  name: "",
  unit: "Quintal",
  location: "",
  initialStock: "",
  minimumStock: "",
  unitPrice: "",
  imageUrl: "",
};

const unitOptions = ["Libra", "Kilogramo", "Saco", "Quintal"];

export function AddGrainModal({ open, onClose, onSave }: Readonly<AddGrainModalProps>) {
  const [values, setValues] = useState<AddGrainFormValues>(initialValues);

  const [errors, setErrors] = useState<AddGrainFormErrors>({});

  const [isPriceFocused, setIsPriceFocused] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const showPriceSymbol = isPriceFocused || values.unitPrice.trim() !== "";

  const updateField = <K extends keyof AddGrainFormValues>(
    field: K,
    value: AddGrainFormValues[K],
  ): void => {
    setValues((current) => ({
      ...current,
      [field]: value,
    }));

    setErrors((current) => ({
      ...current,
      [field]: undefined,
    }));
  };

  const resetForm = (): void => {
    setValues(initialValues);
    setErrors({});
    setIsPriceFocused(false);
  };

  const handleClose = (): void => {
    if (isSubmitting) {
      return;
    }

    resetForm();
    onClose();
  };

  const validate = (): boolean => {
    const nextErrors: AddGrainFormErrors = {};

    if (!values.name.trim()) {
      nextErrors.name = "Ingresa el nombre del producto";
    }

    if (!values.unit.trim()) {
      nextErrors.unit = "Selecciona una unidad";
    }

    if (!values.location.trim()) {
      nextErrors.location = "Ingresa la ubicación";
    }

    const initialStock = Number(values.initialStock);

    if (values.initialStock.trim() === "" || Number.isNaN(initialStock) || initialStock < 0) {
      nextErrors.initialStock = "Ingresa un stock inicial válido";
    }

    const minimumStock = Number(values.minimumStock);

    if (values.minimumStock.trim() === "" || Number.isNaN(minimumStock) || minimumStock < 0) {
      nextErrors.minimumStock = "Ingresa un stock mínimo válido";
    }

    if (initialStock >= 0 && minimumStock > initialStock) {
      nextErrors.minimumStock = "No puede superar el stock inicial";
    }

    const unitPrice = Number(values.unitPrice);

    if (values.unitPrice.trim() === "" || Number.isNaN(unitPrice) || unitPrice <= 0) {
      nextErrors.unitPrice = "Ingresa un precio mayor que cero";
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    const normalizedValues: AddGrainFormValues = {
      name: values.name.trim(),
      unit: values.unit,
      location: values.location.trim(),
      initialStock: values.initialStock.trim(),
      minimumStock: values.minimumStock.trim(),
      unitPrice: values.unitPrice.trim(),
      imageUrl: values.imageUrl.trim(),
    };

    try {
      setIsSubmitting(true);

      await onSave(normalizedValues);

      resetForm();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormModal
      open={open}
      title="Nuevo ingreso de grano"
      description="Registra un nuevo producto y su inventario inicial."
      icon={<FaSeedling size={18} />}
      submitLabel="Guardar ingreso"
      submitIcon={<FaPlus size={11} />}
      maxWidth={600}
      isSubmitting={isSubmitting}
      onClose={handleClose}
      onSubmit={handleSubmit}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2.5,
        }}
      >
        <ModalField label="Nombre del producto" htmlFor="grain-name">
          <TextField
            id="grain-name"
            name="name"
            value={values.name}
            onChange={(event) => {
              updateField("name", event.target.value);
            }}
            placeholder="Ej. Maíz amarillo"
            error={Boolean(errors.name)}
            helperText={errors.name}
            disabled={isSubmitting}
            fullWidth
            autoFocus
            autoComplete="off"
            sx={fieldStyles}
          />
        </ModalField>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "1fr 1fr",
            },
            gap: 2,
          }}
        >
          <ModalField label="Unidad" htmlFor="grain-unit">
            <TextField
              id="grain-unit"
              name="unit"
              value={values.unit}
              onChange={(event) => {
                updateField("unit", event.target.value);
              }}
              select
              fullWidth
              disabled={isSubmitting}
              error={Boolean(errors.unit)}
              helperText={errors.unit}
              slotProps={{
                select: {
                  MenuProps: {
                    slotProps: {
                      paper: {
                        sx: menuPaperStyles,
                      },
                    },
                  },
                },
              }}
              sx={fieldStyles}
            >
              {unitOptions.map((unit) => (
                <MenuItem key={unit} value={unit}>
                  {unit}
                </MenuItem>
              ))}
            </TextField>
          </ModalField>

          <ModalField label="Ubicación" htmlFor="grain-location">
            <TextField
              id="grain-location"
              name="location"
              value={values.location}
              onChange={(event) => {
                updateField("location", event.target.value);
              }}
              placeholder="Ej. Bodega principal"
              error={Boolean(errors.location)}
              helperText={errors.location}
              disabled={isSubmitting}
              fullWidth
              sx={fieldStyles}
            />
          </ModalField>
        </Box>

        <ModalField label="Imagen para la tarjeta" htmlFor="grain-image">
          <ImageUploadField
            label="Imagen del grano"
            value={values.imageUrl}
            disabled={isSubmitting}
            onChange={(imageUrl) => {
              updateField("imageUrl", imageUrl);
            }}
          />
        </ModalField>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(3, minmax(0, 1fr))",
            },
            gap: 2,
          }}
        >
          <ModalField label="Stock inicial" htmlFor="grain-initial-stock">
            <TextField
              id="grain-initial-stock"
              name="initialStock"
              type="number"
              value={values.initialStock}
              onChange={(event) => {
                updateField("initialStock", event.target.value);
              }}
              placeholder="0.00"
              error={Boolean(errors.initialStock)}
              helperText={errors.initialStock}
              disabled={isSubmitting}
              fullWidth
              slotProps={{
                htmlInput: {
                  min: 0,
                  step: "0.01",
                },
              }}
              sx={fieldStyles}
            />
          </ModalField>

          <ModalField label="Stock mínimo" htmlFor="grain-minimum-stock">
            <TextField
              id="grain-minimum-stock"
              name="minimumStock"
              type="number"
              value={values.minimumStock}
              onChange={(event) => {
                updateField("minimumStock", event.target.value);
              }}
              placeholder="0.00"
              error={Boolean(errors.minimumStock)}
              helperText={errors.minimumStock}
              disabled={isSubmitting}
              fullWidth
              slotProps={{
                htmlInput: {
                  min: 0,
                  step: "0.01",
                },
              }}
              sx={fieldStyles}
            />
          </ModalField>

          <ModalField label="Precio unitario" htmlFor="grain-unit-price">
            <TextField
              id="grain-unit-price"
              name="unitPrice"
              type="number"
              value={values.unitPrice}
              onChange={(event) => {
                updateField("unitPrice", event.target.value);
              }}
              onFocus={() => {
                setIsPriceFocused(true);
              }}
              onBlur={() => {
                setIsPriceFocused(false);
              }}
              placeholder="0.00"
              error={Boolean(errors.unitPrice)}
              helperText={errors.unitPrice}
              disabled={isSubmitting}
              fullWidth
              slotProps={{
                htmlInput: {
                  min: 0,
                  step: "0.01",
                },
                input: {
                  startAdornment: showPriceSymbol ? (
                    <InputAdornment position="start">$</InputAdornment>
                  ) : undefined,
                },
              }}
              sx={fieldStyles}
            />
          </ModalField>
        </Box>
      </Box>
    </FormModal>
  );
}

const fieldStyles: SxProps<Theme> = {
  "& .MuiOutlinedInput-root": {
    minHeight: 48,
    borderRadius: "9px",
    bgcolor: "#ffffff",
    color: colors.text,
    fontSize: 13,
    fontWeight: 650,
    transition: "all 0.18s ease",

    "& fieldset": {
      borderColor: colors.border,
    },

    "&:hover fieldset": {
      borderColor: "#9eb0a9",
    },

    "&.Mui-focused": {
      bgcolor: "#ffffff",
      boxShadow: "0 0 0 3px rgba(6, 78, 59, 0.08)",
    },

    "&.Mui-focused fieldset": {
      borderColor: colors.primary,
      borderWidth: "1px",
    },

    "&.Mui-error fieldset": {
      borderColor: colors.danger,
    },

    "&.Mui-disabled": {
      bgcolor: "#f8faf9",
    },
  },

  "& .MuiInputBase-input": {
    color: `${colors.text} !important`,

    WebkitTextFillColor: `${colors.text} !important`,

    py: 1.35,

    "&::placeholder": {
      color: "#94a3b8",

      WebkitTextFillColor: "#94a3b8",

      opacity: 1,
    },

    "&:-webkit-autofill": {
      WebkitBoxShadow: "0 0 0 1000px #ffffff inset",

      WebkitTextFillColor: `${colors.text} !important`,

      caretColor: colors.text,
    },
  },

  "& .MuiSelect-select": {
    color: `${colors.text} !important`,

    WebkitTextFillColor: `${colors.text} !important`,

    py: 1.35,
  },

  "& .MuiInputAdornment-root": {
    color: colors.muted,
  },

  "& .MuiSvgIcon-root": {
    color: colors.muted,
  },

  "& .MuiFormHelperText-root": {
    minHeight: 16,
    ml: 0,
    mt: 0.55,
    color: colors.danger,
    fontSize: 10.5,
    fontWeight: 650,
  },

  "& input[type='number']": {
    MozAppearance: "textfield",
  },

  "& input[type='number']::-webkit-outer-spin-button": {
    WebkitAppearance: "none",
    margin: 0,
  },

  "& input[type='number']::-webkit-inner-spin-button": {
    WebkitAppearance: "none",
    margin: 0,
  },
};

const menuPaperStyles: SxProps<Theme> = {
  mt: 0.75,
  maxHeight: 280,
  borderRadius: "10px",
  bgcolor: "#ffffff",

  border: `1px solid ${colors.border}`,

  boxShadow: "0 14px 34px rgba(15, 23, 42, 0.16)",

  "& .MuiMenuItem-root": {
    minHeight: 42,
    color: colors.text,
    fontSize: 13,
    fontWeight: 600,

    "&:hover": {
      bgcolor: "#f0fdf4",
    },

    "&.Mui-selected": {
      bgcolor: colors.primarySoft,

      color: colors.primary,

      "&:hover": {
        bgcolor: "#bbf7d0",
      },
    },
  },
};
