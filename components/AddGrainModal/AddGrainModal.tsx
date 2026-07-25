"use client";

import {
  useState,
  type FormEvent,
} from "react";

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

import type {
  SxProps,
  Theme,
} from "@mui/material/styles";

import {
  FaPlus,
  FaSeedling,
} from "react-icons/fa";

import { FormModal } from "../FormModal";
import { ModalField } from "../ModalField";

export type GrainStatus =
  | "inStock"
  | "lowStock";

export type AddGrainFormValues = {
  name: string;
  unit: string;
  stock: string;
  minStock: string;
  price: string;
  status: GrainStatus;
};

type AddGrainFormErrors = Partial<
  Record<keyof AddGrainFormValues, string>
>;

type AddGrainModalProps = {
  open: boolean;
  onClose: () => void;
  onSave: (
    values: AddGrainFormValues,
  ) => void | Promise<void>;
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
  stock: "",
  minStock: "",
  price: "",
  status: "inStock",
};



const unitOptions = [
  "Libra",
  "Kilogramo",
  "Saco",
  "Quintal",
];

export function AddGrainModal({
  open,
  onClose,
  onSave,
}: Readonly<AddGrainModalProps>) {
  const [values, setValues] =
    useState<AddGrainFormValues>(
      initialValues,
    );

  const [errors, setErrors] =
    useState<AddGrainFormErrors>({});

  const [isPriceFocused, setIsPriceFocused] =
    useState(false);

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const showPriceSymbol =
    isPriceFocused ||
    values.price.trim() !== "";

  const updateField = <
    K extends keyof AddGrainFormValues,
  >(
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
    setIsSubmitting(false);
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
      nextErrors.name =
        "Ingresa el nombre del producto";
    }


    if (!values.unit) {
      nextErrors.unit =
        "Selecciona una unidad";
    }

    const stock = Number(values.stock);

    if (
      values.stock.trim() === "" ||
      Number.isNaN(stock) ||
      stock <= 0
    ) {
      nextErrors.stock =
        "Ingresa un stock mayor que cero";
    }

    const minStock = Number(
      values.minStock,
    );

    if (
      values.minStock.trim() === "" ||
      Number.isNaN(minStock) ||
      minStock < 0
    ) {
      nextErrors.minStock =
        "Ingresa un stock mínimo válido";
    }

    if (
      stock > 0 &&
      minStock > stock
    ) {
      nextErrors.minStock =
        "No puede superar el stock inicial";
    }

    const price = Number(values.price);

    if (
      values.price.trim() === "" ||
      Number.isNaN(price) ||
      price <= 0
    ) {
      nextErrors.price =
        "Ingresa un precio mayor que cero";
    }

    if (!values.status) {
      nextErrors.status =
        "Selecciona el estado del inventario";
    }

    setErrors(nextErrors);

    return (
      Object.keys(nextErrors).length === 0
    );
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    try {
      setIsSubmitting(true);
      await onSave(values);
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
        <ModalField
          label="Nombre del producto"
          htmlFor="grain-name"
        >
          <TextField
            id="grain-name"
            name="name"
            value={values.name}
            onChange={(event) => {
              updateField(
                "name",
                event.target.value,
              );
            }}
            placeholder="Ej. Maíz amarillo"
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

          <ModalField
            label="Unidad"
            htmlFor="grain-unit"
          >
            <TextField
              id="grain-unit"
              name="unit"
              value={values.unit}
              onChange={(event) => {
                updateField(
                  "unit",
                  event.target.value,
                );
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
                <MenuItem
                  key={unit}
                  value={unit}
                >
                  {unit}
                </MenuItem>
              ))}
            </TextField>
          </ModalField>
        </Box>

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
          <ModalField
            label="Stock inicial"
            htmlFor="grain-stock"
          >
            <TextField
              id="grain-stock"
              name="stock"
              type="number"
              value={values.stock}
              onChange={(event) => {
                updateField(
                  "stock",
                  event.target.value,
                );
              }}
              placeholder="0.00"
              error={Boolean(errors.stock)}
              helperText={errors.stock}
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

          <ModalField
            label="Stock mínimo"
            htmlFor="grain-min-stock"
          >
            <TextField
              id="grain-min-stock"
              name="minStock"
              type="number"
              value={values.minStock}
              onChange={(event) => {
                updateField(
                  "minStock",
                  event.target.value,
                );
              }}
              placeholder="0.00"
              error={Boolean(
                errors.minStock,
              )}
              helperText={errors.minStock}
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

          <ModalField
            label="Precio unitario"
            htmlFor="grain-price"
          >
            <TextField
              id="grain-price"
              name="price"
              type="number"
              value={values.price}
              onChange={(event) => {
                updateField(
                  "price",
                  event.target.value,
                );
              }}
              onFocus={() => {
                setIsPriceFocused(true);
              }}
              onBlur={() => {
                setIsPriceFocused(false);
              }}
              placeholder="0.00"
              error={Boolean(errors.price)}
              helperText={errors.price}
              disabled={isSubmitting}
              fullWidth
              slotProps={{
                htmlInput: {
                  min: 0,
                  step: "0.01",
                },
                input: {
                  startAdornment:
                    showPriceSymbol ? (
                      <InputAdornment position="start">
                        $
                      </InputAdornment>
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
          error={Boolean(errors.status)}
        >
          <Typography
            component="legend"
            sx={{
              mb: 1,
              color: errors.status
                ? colors.danger
                : colors.text,
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
            name="status"
            value={values.status}
            onChange={(event) => {
              updateField(
                "status",
                event.target
                  .value as GrainStatus,
              );
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
              value="inStock"
              label="En stock"
              description="Inventario disponible"
              selected={
                values.status === "inStock"
              }
            />

            <StatusOption
              value="lowStock"
              label="Stock bajo"
              description="Requiere reposición"
              selected={
                values.status === "lowStock"
              }
            />
          </RadioGroup>

          {errors.status && (
            <Typography
              sx={{
                mt: 0.75,
                color: colors.danger,
                fontSize: 10.5,
                fontWeight: 650,
              }}
            >
              {errors.status}
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
      borderColor: "#9eb0a9",
    },

    "&.Mui-focused": {
      bgcolor: "#ffffff",
      boxShadow:
        "0 0 0 3px rgba(6, 78, 59, 0.08)",
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
    WebkitTextFillColor:
      `${colors.text} !important`,
    py: 1.35,

    "&::placeholder": {
      color: "#94a3b8",
      WebkitTextFillColor: "#94a3b8",
      opacity: 1,
    },

    "&:-webkit-autofill": {
      WebkitBoxShadow:
        "0 0 0 1000px #ffffff inset",
      WebkitTextFillColor:
        `${colors.text} !important`,
      caretColor: colors.text,
    },
  },

  "& .MuiSelect-select": {
    color: `${colors.text} !important`,
    WebkitTextFillColor:
      `${colors.text} !important`,
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
    fontSize: 10.5,
    fontWeight: 650,
  },

  "& input[type='number']": {
    MozAppearance: "textfield",
  },

  "& input[type='number']::-webkit-outer-spin-button":
    {
      WebkitAppearance: "none",
      margin: 0,
    },

  "& input[type='number']::-webkit-inner-spin-button":
    {
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
  boxShadow:
    "0 14px 34px rgba(15, 23, 42, 0.16)",

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

function StatusOption({
  value,
  label,
  description,
  selected,
}: {
  value: GrainStatus;
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
        border: `1px solid ${
          selected
            ? colors.primary
            : colors.border
        }`,
        bgcolor: selected
          ? "#ecfdf5"
          : "#ffffff",
        transition: "all 0.18s ease",

        "&:hover": {
          borderColor: selected
            ? colors.primary
            : "#9eb0a9",
          bgcolor: selected
            ? "#ecfdf5"
            : "#f8faf9",
        },

        "& .MuiFormControlLabel-label": {
          flex: 1,
        },
      }}
    />
  );
}