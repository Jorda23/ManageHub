"use client";

import { useState, type FormEvent } from "react";

import { Box, Button, InputAdornment, MenuItem, TextField, Typography } from "@mui/material";

import type { SxProps, Theme } from "@mui/material/styles";

import { useFormik } from "formik";

import { FaBoxesStacked, FaDollarSign, FaSeedling } from "react-icons/fa6";

import { FaPlusCircle, FaTimes } from "react-icons/fa";

import { colors } from "@/theme/sharedColors";

import { addGrainSchema } from "@/validations";
import { useToast } from "@/components/Toast";

import { ImageUrlField } from "../ImageUrlField";

import { ModalField } from "../ModalField";
import { FormSection } from "../FormSection";
import {
  currencies,
  currencyLabels,
  normalizeCurrency,
  getCurrencySymbol,
} from "@/shared/utils/currency";

export type AddGrainFormValues = {
  name: string;
  unit: string;
  location: string;
  initialStock: string;
  minimumStock: string;
  unitPrice: string;
  currency: "USD" | "NIO";
  imageUrl: string;
};

type AddGrainFormProps = {
  onCancel: () => void;

  onSave: (values: AddGrainFormValues) => void | Promise<void>;

  isSubmitting?: boolean;
};

const initialValues: AddGrainFormValues = {
  name: "",
  unit: "Quintal",
  location: "",
  initialStock: "",
  minimumStock: "",
  unitPrice: "",
  currency: "NIO",
  imageUrl: "",
};

const unitOptions = ["Libra", "Kilogramo", "Saco", "Quintal"];

export function AddGrainForm({
  onCancel,
  onSave,
  isSubmitting = false,
}: Readonly<AddGrainFormProps>) {
  const [isPriceFocused, setIsPriceFocused] = useState(false);
  const { showError } = useToast();

  const formik = useFormik<AddGrainFormValues>({
    initialValues,

    validationSchema: addGrainSchema,

    validateOnBlur: true,

    validateOnChange: false,

    onSubmit: async (values, helpers) => {
      const normalizedCurrency = normalizeCurrency(values.currency);

      const normalizedValues: AddGrainFormValues = {
        name: values.name.trim(),

        unit: values.unit.trim(),

        location: values.location.trim(),

        initialStock: String(values.initialStock ?? "").trim(),

        minimumStock: String(values.minimumStock ?? "").trim(),

        unitPrice: String(values.unitPrice ?? "").trim(),
        currency: normalizedCurrency,

        imageUrl: values.imageUrl.trim(),
      };

      await onSave(normalizedValues);

      helpers.resetForm();

      setIsPriceFocused(false);
    },
  });

  const showPriceSymbol = isPriceFocused || String(formik.values.unitPrice ?? "").trim() !== "";

  const getFieldError = (field: keyof AddGrainFormValues): string | undefined => {
    if (!formik.touched[field]) {
      return undefined;
    }

    return formik.errors[field];
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();

    const errors = await formik.validateForm();

    if (Object.keys(errors).length > 0) {
      await formik.setTouched({
        name: true,
        unit: true,
        location: true,
        initialStock: true,
        minimumStock: true,
        unitPrice: true,
        currency: true,
        imageUrl: true,
      });
      showError("Revisa los campos marcados antes de continuar.");
      return;
    }

    await formik.submitForm();
  };

  const handleCancel = (): void => {
    if (isSubmitting) {
      return;
    }

    formik.resetForm();

    setIsPriceFocused(false);

    onCancel();
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        width: "100%",

        display: "flex",

        flexDirection: "column",

        gap: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",

          alignItems: {
            xs: "flex-start",

            sm: "center",
          },

          justifyContent: "space-between",

          flexDirection: {
            xs: "column",

            sm: "row",
          },

          gap: 1.5,
        }}
      >
        <Box>
          <Typography
            component="h2"
            sx={{
              color: colors.text,

              fontSize: {
                xs: 18,

                md: 20,
              },

              lineHeight: 1.2,

              fontWeight: 850,
            }}
          >
            Registrar nuevo grano
          </Typography>

          <Typography
            sx={{
              mt: 0.5,

              color: colors.muted,

              fontSize: 12,

              fontWeight: 500,
            }}
          >
            Registra el producto, inventario inicial y precio de venta.
          </Typography>
        </Box>

        <Button
          type="button"
          variant="outlined"
          startIcon={<FaTimes size={11} />}
          disabled={isSubmitting}
          onClick={handleCancel}
          sx={{
            minHeight: 38,

            borderRadius: "8px",

            px: 2,

            borderColor: colors.cardBorder,

            color: colors.muted,

            textTransform: "none",

            fontSize: 11,

            fontWeight: 800,

            "&:hover": {
              borderColor: colors.primary,

              bgcolor: colors.primarySoft,
            },
          }}
        >
          Cancelar
        </Button>
      </Box>

      <FormSection
        icon={<FaSeedling size={14} />}
        title="Información del producto"
        description="Datos generales del grano y su ubicación."
      >
        <ModalField label="Moneda" htmlFor="grain-currency">
          <TextField
            id="grain-currency"
            name="currency"
            select
            value={formik.values.currency}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={Boolean(getFieldError("currency"))}
            helperText={getFieldError("currency")}
            disabled={isSubmitting}
            fullWidth
          >
            {currencies.map((currency) => (
              <MenuItem key={currency} value={currency}>
                {currencyLabels[currency]}
              </MenuItem>
            ))}
          </TextField>
        </ModalField>
        <ModalField label="Nombre del producto" htmlFor="grain-name">
          <TextField
            id="grain-name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Ej. Maíz amarillo"
            error={Boolean(getFieldError("name"))}
            helperText={getFieldError("name")}
            disabled={isSubmitting}
            fullWidth
            autoFocus
            autoComplete="off"
            sx={fieldStyles}
          />
        </ModalField>

        <Box sx={twoColumnsStyles}>
          <ModalField label="Unidad" htmlFor="grain-unit">
            <TextField
              id="grain-unit"
              name="unit"
              value={formik.values.unit}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              select
              fullWidth
              disabled={isSubmitting}
              error={Boolean(getFieldError("unit"))}
              helperText={getFieldError("unit")}
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
              value={formik.values.location}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Ej. Bodega principal"
              error={Boolean(getFieldError("location"))}
              helperText={getFieldError("location")}
              disabled={isSubmitting}
              fullWidth
              sx={fieldStyles}
            />
          </ModalField>
        </Box>

        <ModalField label="Imagen del producto" htmlFor="grain-image">
          <ImageUrlField
            label="Imagen del grano"
            value={formik.values.imageUrl}
            disabled={isSubmitting}
            onChange={(imageUrl) => {
              void formik.setFieldValue("imageUrl", imageUrl);

              void formik.setFieldTouched("imageUrl", true, false);
            }}
          />
        </ModalField>
      </FormSection>

      <FormSection
        icon={<FaBoxesStacked size={14} />}
        title="Inventario"
        description="Define la existencia inicial y el punto de alerta."
      >
        <Box sx={twoColumnsStyles}>
          <ModalField label="Stock inicial" htmlFor="grain-initial-stock">
            <TextField
              id="grain-initial-stock"
              name="initialStock"
              type="number"
              value={formik.values.initialStock}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="0.00"
              error={Boolean(getFieldError("initialStock"))}
              helperText={getFieldError("initialStock")}
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
              value={formik.values.minimumStock}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="0.00"
              error={Boolean(getFieldError("minimumStock"))}
              helperText={getFieldError("minimumStock")}
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
        </Box>
      </FormSection>

      <FormSection
        icon={<FaDollarSign size={14} />}
        title="Precio"
        description="Configura el precio unitario del producto."
      >
        <Box
          sx={{
            width: {
              xs: "100%",

              sm: "calc(50% - 8px)",
            },
          }}
        >
          <ModalField label="Precio unitario" htmlFor="grain-unit-price">
            <TextField
              id="grain-unit-price"
              name="unitPrice"
              type="number"
              value={formik.values.unitPrice}
              onChange={formik.handleChange}
              onFocus={() => {
                setIsPriceFocused(true);
              }}
              onBlur={(event) => {
                setIsPriceFocused(false);

                formik.handleBlur(event);
              }}
              placeholder="0.00"
              error={Boolean(getFieldError("unitPrice"))}
              helperText={getFieldError("unitPrice")}
              disabled={isSubmitting}
              fullWidth
              slotProps={{
                htmlInput: {
                  min: 0,

                  step: "0.01",
                },

                input: {
                  startAdornment: showPriceSymbol ? (
                    <InputAdornment position="start">
                      {getCurrencySymbol(formik.values.currency)}
                    </InputAdornment>
                  ) : undefined,
                },
              }}
              sx={fieldStyles}
            />
          </ModalField>
        </Box>
      </FormSection>

      <Box
        sx={{
          display: "flex",

          alignItems: "center",

          justifyContent: "flex-end",

          gap: 1,

          pt: 0.5,
        }}
      >
        <Button
          type="button"
          variant="outlined"
          disabled={isSubmitting}
          onClick={handleCancel}
          sx={{
            minHeight: 42,

            px: 2.5,

            borderRadius: "9px",

            borderColor: colors.cardBorder,

            color: colors.muted,

            textTransform: "none",

            fontSize: 12,

            fontWeight: 800,

            "&:hover": {
              borderColor: colors.primary,

              bgcolor: colors.primarySoft,
            },
          }}
        >
          Cancelar
        </Button>

        <Button
          type="submit"
          variant="contained"
          disableElevation
          disabled={isSubmitting || formik.isSubmitting}
          startIcon={<FaPlusCircle size={12} />}
          sx={{
            minHeight: 42,

            px: 2.75,

            borderRadius: "9px",

            bgcolor: colors.primary,

            textTransform: "none",

            fontSize: 12,

            fontWeight: 850,

            "&:hover": {
              bgcolor: colors.primary,

              filter: "brightness(0.94)",
            },
          }}
        >
          {isSubmitting || formik.isSubmitting ? "Registrando..." : "Registrar grano"}
        </Button>
      </Box>
    </Box>
  );
}

const twoColumnsStyles: SxProps<Theme> = {
  display: "grid",

  gridTemplateColumns: {
    xs: "1fr",

    sm: "1fr 1fr",
  },

  gap: 2,

  alignItems: "start",
};

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
      borderColor: colors.cardBorder,
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

  border: `1px solid ${colors.cardBorder}`,

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
