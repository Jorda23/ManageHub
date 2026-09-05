"use client";

import { useState, type FormEvent } from "react";

import {
  Box,
  Button,
  InputAdornment,
  MenuItem,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";

import type { SxProps, Theme } from "@mui/material/styles";

import { useFormik } from "formik";

import { FaDollarSign, FaInfoCircle, FaTools } from "react-icons/fa";

import { FaPlusCircle, FaTimes } from "react-icons/fa";

import { colors } from "@/theme/sharedColors";

import { addHardwareProductSchema } from "@/validations";
import { useToast } from "../Toast";

import { ImageUrlField } from "../ImageUrlField";

import { ModalField } from "../ModalField";
import { FaBoxesStacked } from "react-icons/fa6";
import { FormSection } from "../FormSection";
import {
  currencies,
  currencyLabels,
  normalizeCurrency,
  getCurrencySymbol,
} from "@/shared/utils/currency";

export type AddHardwareProductValues = {
  name: string;
  detail: string;
  category: string;
  initialStock: string;
  minimumStock: string;
  unitPrice: string;
  currency: "USD" | "NIO";
  inventoryStatus: string;
  imageUrl: string;
};

type AddHardwareProductFormProps = {
  onCancel: () => void;

  onSave: (values: AddHardwareProductValues) => void | Promise<void>;

  isSubmitting?: boolean;
};

const initialValues: AddHardwareProductValues = {
  name: "",
  detail: "",
  category: "",
  initialStock: "",
  minimumStock: "",
  unitPrice: "",
  currency: "NIO",
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

export function AddHardwareProductForm({
  onCancel,
  onSave,
  isSubmitting = false,
}: Readonly<AddHardwareProductFormProps>) {
  const [isPriceFocused, setIsPriceFocused] = useState(false);
  const { showError } = useToast();

  const formik = useFormik<AddHardwareProductValues>({
    initialValues,

    validationSchema: addHardwareProductSchema,

    validateOnBlur: true,

    validateOnChange: false,

    onSubmit: async (values, helpers) => {
      const normalizedCurrency = normalizeCurrency(values.currency);

      const normalizedValues: AddHardwareProductValues = {
        name: values.name.trim(),

        detail: values.detail.trim(),

        category: values.category.trim(),

        initialStock: String(values.initialStock ?? "").trim(),

        minimumStock: String(values.minimumStock ?? "").trim(),

        unitPrice: String(values.unitPrice ?? "").trim(),
        currency: normalizedCurrency,

        inventoryStatus: values.inventoryStatus,

        imageUrl: values.imageUrl.trim(),
      };

      await onSave(normalizedValues);

      helpers.resetForm();

      setIsPriceFocused(false);
    },
  });

  const showPriceSymbol = isPriceFocused || String(formik.values.unitPrice ?? "").trim() !== "";

  const getFieldError = (field: keyof AddHardwareProductValues): string | undefined => {
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
        detail: true,
        category: true,
        initialStock: true,
        minimumStock: true,
        unitPrice: true,
        currency: true,
        inventoryStatus: true,
        imageUrl: true,
      });
      showError("Revisa los campos marcados antes de continuar.");
      return;
    }

    await formik.submitForm();
  };

  const handleCancel = (): void => {
    if (isSubmitting || formik.isSubmitting) {
      return;
    }

    formik.resetForm();

    setIsPriceFocused(false);

    onCancel();
  };

  const disabled = isSubmitting || formik.isSubmitting;

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
            Registrar producto
          </Typography>

          <Typography
            sx={{
              mt: 0.5,

              color: colors.muted,

              fontSize: 12,

              fontWeight: 500,
            }}
          >
            Registra el producto, su inventario inicial y precio de venta.
          </Typography>
        </Box>

        <Button
          type="button"
          variant="outlined"
          startIcon={<FaTimes size={11} />}
          disabled={disabled}
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
        icon={<FaTools size={14} />}
        title="Información del producto"
        description="Datos generales y clasificación del producto."
      >
        <ModalField label="Moneda" htmlFor="hardware-currency">
          <TextField
            id="hardware-currency"
            name="currency"
            select
            value={formik.values.currency}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={Boolean(getFieldError("currency"))}
            helperText={getFieldError("currency")}
            disabled={disabled}
            fullWidth
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
            {currencies.map((currency) => (
              <MenuItem key={currency} value={currency}>
                {currencyLabels[currency]}
              </MenuItem>
            ))}
          </TextField>
        </ModalField>
        <ModalField label="Nombre del producto" htmlFor="hardware-product-name">
          <TextField
            id="hardware-product-name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Ej. Taladro inalámbrico"
            error={Boolean(getFieldError("name"))}
            helperText={getFieldError("name")}
            disabled={disabled}
            fullWidth
            autoFocus
            autoComplete="off"
            sx={fieldStyles}
          />
        </ModalField>

        <Box sx={twoColumnsStyles}>
          <ModalField label="Detalle o presentación" htmlFor="hardware-product-detail">
            <TextField
              id="hardware-product-detail"
              name="detail"
              value={formik.values.detail}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Ej. 18V Kit"
              error={Boolean(getFieldError("detail"))}
              helperText={getFieldError("detail")}
              disabled={disabled}
              fullWidth
              sx={fieldStyles}
            />
          </ModalField>

          <ModalField label="Categoría" htmlFor="hardware-product-category">
            <TextField
              id="hardware-product-category"
              name="category"
              value={formik.values.category}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              select
              fullWidth
              disabled={disabled}
              error={Boolean(getFieldError("category"))}
              helperText={getFieldError("category")}
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

        <ModalField label="Imagen del producto" htmlFor="hardware-product-image">
          <ImageUrlField
            label="Imagen del producto"
            value={formik.values.imageUrl}
            disabled={disabled}
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
        description="Configura las existencias y el nivel mínimo."
      >
        <Box sx={twoColumnsStyles}>
          <ModalField label="Stock inicial" htmlFor="hardware-product-initial-stock">
            <TextField
              id="hardware-product-initial-stock"
              name="initialStock"
              type="number"
              value={formik.values.initialStock}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="0"
              error={Boolean(getFieldError("initialStock"))}
              helperText={getFieldError("initialStock")}
              disabled={disabled}
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
              value={formik.values.minimumStock}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="0"
              error={Boolean(getFieldError("minimumStock"))}
              helperText={getFieldError("minimumStock")}
              disabled={disabled}
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
        </Box>
      </FormSection>

      <FormSection
        icon={<FaDollarSign size={14} />}
        title="Precio"
        description="Define el precio unitario de venta."
      >
        <Box
          sx={{
            width: {
              xs: "100%",
              sm: "calc(50% - 8px)",
            },
          }}
        >
          <ModalField label="Precio unitario" htmlFor="hardware-product-unit-price">
            <TextField
              id="hardware-product-unit-price"
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
              disabled={disabled}
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
          disabled={disabled}
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
          }}
        >
          Cancelar
        </Button>

        <Button
          type="submit"
          variant="contained"
          disableElevation
          disabled={disabled}
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
          {disabled ? "Registrando..." : "Registrar producto"}
        </Button>
      </Box>
    </Box>
  );
}

type StatusOptionProps = {
  value: string;
  label: string;
  description: string;
  selected: boolean;
};

function StatusOption({ value, label, description, selected }: Readonly<StatusOptionProps>) {
  return (
    <Box
      component="label"
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,

        px: 1.5,
        py: 0.8,

        minHeight: 54,

        borderRadius: "9px",

        border: `1px solid ${selected ? colors.primary : colors.cardBorder}`,

        bgcolor: selected ? "#fff7ed" : "#ffffff",

        cursor: "pointer",

        transition: "all 0.18s ease",

        "&:hover": {
          borderColor: colors.primary,

          bgcolor: "#fff7ed",
        },
      }}
    >
      <input type="radio" value={value} name="inventoryStatus" checked={selected} readOnly />

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
