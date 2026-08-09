"use client";

import { useState, type FormEvent } from "react";

import {
  Box,
  FormControl,
  FormControlLabel,
  InputAdornment,
  MenuItem,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";

import type { SxProps, Theme } from "@mui/material/styles";

import { FaPlus, FaTools } from "react-icons/fa";

import { FormModal } from "../FormModal";
import { ModalField } from "../ModalField";
import { ImageUploadField } from "../WorkspaceShared/ImageUploadField";

export type AddHardwareProductValues = {
  name: string;
  detail: string;
  category: string;
  initialStock: string;
  minimumStock: string;
  unitPrice: string;
  inventoryStatus: string;
  imageUrl: string;
};

type AddHardwareProductErrors = Partial<Record<keyof AddHardwareProductValues, string>>;

type AddHardwareProductModalProps = {
  open: boolean;
  onClose: () => void;
  onSave: (values: AddHardwareProductValues) => void | Promise<void>;
};

const colors = {
  primary: "#92400e",
  primaryLight: "#f59e0b",
  primarySoft: "#ffedd5",
  text: "#0f172a",
  muted: "#64748b",
  danger: "#dc2626",
  border: "#d7e0dc",
};

const initialValues: AddHardwareProductValues = {
  name: "",
  detail: "",
  category: "",
  initialStock: "",
  minimumStock: "",
  unitPrice: "",
  inventoryStatus: "Available",
  imageUrl: "",
};

const categoryOptions = [
  "Herramientas eléctricas",
  "Herramientas manuales",
  "Tornillería",
  "Materiales de construcción",
  "Plomería",
  "Electricidad",
  "Pintura",
  "Seguridad industrial",
];

export function AddHardwareProductModal({
  open,
  onClose,
  onSave,
}: Readonly<AddHardwareProductModalProps>) {
  const [values, setValues] = useState<AddHardwareProductValues>(initialValues);

  const [errors, setErrors] = useState<AddHardwareProductErrors>({});

  const [isPriceFocused, setIsPriceFocused] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const showPriceSymbol = isPriceFocused || values.unitPrice.trim() !== "";

  const updateField = <K extends keyof AddHardwareProductValues>(
    field: K,
    value: AddHardwareProductValues[K],
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
    const nextErrors: AddHardwareProductErrors = {};

    if (!values.name.trim()) {
      nextErrors.name = "Ingresa el nombre del producto";
    }

    if (!values.detail.trim()) {
      nextErrors.detail = "Ingresa una descripción o presentación";
    }

    if (!values.category.trim()) {
      nextErrors.category = "Selecciona una categoría";
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

    if (!values.inventoryStatus) {
      nextErrors.inventoryStatus = "Selecciona el estado del inventario";
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    const normalizedValues: AddHardwareProductValues = {
      name: values.name.trim(),

      detail: values.detail.trim(),

      category: values.category.trim(),

      initialStock: values.initialStock.trim(),

      minimumStock: values.minimumStock.trim(),

      unitPrice: values.unitPrice.trim(),

      inventoryStatus: values.inventoryStatus,

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
      title="Nuevo producto de ferretería"
      description="Registra un producto y su inventario inicial."
      icon={<FaTools size={18} />}
      submitLabel="Guardar producto"
      submitIcon={<FaPlus size={11} />}
      maxWidth={620}
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
        <ModalField label="Nombre del producto" htmlFor="hardware-product-name">
          <TextField
            id="hardware-product-name"
            name="name"
            value={values.name}
            onChange={(event) => {
              updateField("name", event.target.value);
            }}
            placeholder="Ej. Taladro inalámbrico"
            error={Boolean(errors.name)}
            helperText={errors.name}
            disabled={isSubmitting}
            fullWidth
            autoFocus
            autoComplete="off"
            slotProps={{
              htmlInput: {
                autoComplete: "off",
              },
            }}
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
          <ModalField label="Detalle o presentación" htmlFor="hardware-product-detail">
            <TextField
              id="hardware-product-detail"
              name="detail"
              value={values.detail}
              onChange={(event) => {
                updateField("detail", event.target.value);
              }}
              placeholder="Ej. 18V Kit"
              error={Boolean(errors.detail)}
              helperText={errors.detail}
              disabled={isSubmitting}
              fullWidth
              sx={fieldStyles}
            />
          </ModalField>

          <ModalField label="Categoría" htmlFor="hardware-product-category">
            <TextField
              id="hardware-product-category"
              name="category"
              value={values.category}
              onChange={(event) => {
                updateField("category", event.target.value);
              }}
              select
              fullWidth
              disabled={isSubmitting}
              error={Boolean(errors.category)}
              helperText={errors.category}
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
              {categoryOptions.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </TextField>
          </ModalField>
        </Box>

        <ModalField label="Imagen para la tarjeta" htmlFor="hardware-product-image">
          <ImageUploadField
            label="Imagen del producto"
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
          <ModalField label="Stock inicial" htmlFor="hardware-product-initial-stock">
            <TextField
              id="hardware-product-initial-stock"
              name="initialStock"
              type="number"
              value={values.initialStock}
              onChange={(event) => {
                updateField("initialStock", event.target.value);
              }}
              placeholder="0"
              error={Boolean(errors.initialStock)}
              helperText={errors.initialStock}
              disabled={isSubmitting}
              fullWidth
              slotProps={{
                htmlInput: {
                  min: 0,
                  step: "1",
                },
              }}
              sx={fieldStyles}
            />
          </ModalField>

          <ModalField label="Stock mínimo" htmlFor="hardware-product-minimum-stock">
            <TextField
              id="hardware-product-minimum-stock"
              name="minimumStock"
              type="number"
              value={values.minimumStock}
              onChange={(event) => {
                updateField("minimumStock", event.target.value);
              }}
              placeholder="0"
              error={Boolean(errors.minimumStock)}
              helperText={errors.minimumStock}
              disabled={isSubmitting}
              fullWidth
              slotProps={{
                htmlInput: {
                  min: 0,
                  step: "1",
                },
              }}
              sx={fieldStyles}
            />
          </ModalField>

          <ModalField label="Precio unitario" htmlFor="hardware-product-unit-price">
            <TextField
              id="hardware-product-unit-price"
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

        <FormControl
          component="fieldset"
          disabled={isSubmitting}
          error={Boolean(errors.inventoryStatus)}
        >
          <Typography
            component="legend"
            sx={{
              mb: 1,
              color: errors.inventoryStatus ? colors.danger : colors.text,
              fontSize: 10,
              fontWeight: 950,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            Estado del inventario
          </Typography>

          <RadioGroup
            row
            name="inventoryStatus"
            value={values.inventoryStatus}
            onChange={(event) => {
              updateField("inventoryStatus", event.target.value);
            }}
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "1fr 1fr",
              },
              gap: 1.5,
            }}
          >
            <StatusOption
              value="Available"
              label="En stock"
              description="Producto disponible"
              selected={values.inventoryStatus === "Available"}
            />

            <StatusOption
              value="LowStock"
              label="Stock bajo"
              description="Requiere reposición"
              selected={values.inventoryStatus === "LowStock"}
            />
          </RadioGroup>

          {errors.inventoryStatus && (
            <Typography
              sx={{
                mt: 0.75,
                color: colors.danger,
                fontSize: 10.5,
                fontWeight: 650,
              }}
            >
              {errors.inventoryStatus}
            </Typography>
          )}
        </FormControl>
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
      borderColor: "#c58a52",
    },

    "&.Mui-focused": {
      bgcolor: "#ffffff",
      boxShadow: "0 0 0 3px rgba(146, 64, 14, 0.09)",
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
      bgcolor: "#fff7ed",
    },

    "&.Mui-selected": {
      bgcolor: colors.primarySoft,

      color: colors.primary,

      "&:hover": {
        bgcolor: "#fed7aa",
      },
    },
  },
};

function StatusOption({
  value,
  label,
  description,
  selected,
}: {
  value: string;
  label: string;
  description: string;
  selected: boolean;
}) {
  return (
    <FormControlLabel
      value={value}
      control={
        <Radio
          size="small"
          sx={{
            color: "#cbd5e1",

            "&.Mui-checked": {
              color: colors.primary,
            },
          }}
        />
      }
      label={
        <Box>
          <Typography
            sx={{
              color: colors.text,

              fontSize: 11,

              fontWeight: 850,
            }}
          >
            {label}
          </Typography>

          <Typography
            sx={{
              mt: 0.15,

              color: colors.muted,

              fontSize: 9.5,
            }}
          >
            {description}
          </Typography>
        </Box>
      }
      sx={{
        m: 0,
        px: 1.5,
        py: 0.65,
        minHeight: 54,

        borderRadius: "9px",

        border: `1px solid ${selected ? colors.primary : colors.border}`,

        bgcolor: selected ? "#fff7ed" : "#ffffff",

        transition: "all 0.18s ease",

        "&:hover": {
          borderColor: selected ? colors.primary : "#c58a52",

          bgcolor: selected ? "#fff7ed" : "#fffbf5",
        },

        "& .MuiFormControlLabel-label": {
          flex: 1,
        },
      }}
    />
  );
}
