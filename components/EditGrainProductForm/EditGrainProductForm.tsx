"use client";

import { useEffect, useState } from "react";

import {
  Box,
  InputAdornment,
  MenuItem,
  TextField,
} from "@mui/material";

import type { SxProps, Theme } from "@mui/material/styles";

import { useFormik } from "formik";

import {
  FaBoxesStacked,
  FaDollarSign,
  FaSeedling,
} from "react-icons/fa6";

import { colors } from "@/theme/sharedColors";

import { addGrainSchema } from "@/validations";

import { FormModal } from "../FormModal";
import { FormSection } from "../FormSection";
import { ImageUrlField } from "../ImageUrlField";
import { ModalField } from "../ModalField";

import type { GrainProduct } from "@/shared/types/api.types";

import {
  currencies,
  currencyLabels,
  getCurrencySymbol,
  normalizeCurrency,
} from "@/shared/utils/currency";

export type EditGrainProductValues = {
  name: string;
  unit: string;
  location: string;
  minimumStock: string;
  stock: string;
  unitPrice: string;
  currency: "USD" | "NIO";
  imageUrl: string;
};

type EditGrainProductFormProps = {
  open: boolean;
  product: GrainProduct | null;
  isSubmitting?: boolean;
  onClose: () => void;
  onSave: (
    id: string,
    values: EditGrainProductValues,
  ) => void | Promise<void>;
};

const unitOptions = [
  "Libra",
  "Kilogramo",
  "Saco",
  "Quintal",
];

const CONTROL_HEIGHT = 42;

export function EditGrainProductForm({
  open,
  product,
  isSubmitting = false,
  onClose,
  onSave,
}: Readonly<EditGrainProductFormProps>) {
  const [isPriceFocused, setIsPriceFocused] =
    useState(false);

  const formik = useFormik<EditGrainProductValues>({
    initialValues: {
      name: "",
      unit: "Quintal",
      location: "",
      minimumStock: "",
      stock: "",
      unitPrice: "",
      currency: "USD",
      imageUrl: "",
    },

    validationSchema: addGrainSchema.pick([
      "name",
      "unit",
      "location",
    ]),

    validate: (values) => {
      const stock = Number(values.stock);

      if (
        String(values.stock ?? "").trim() === "" ||
        Number.isNaN(stock)
      ) {
        return undefined;
      }

      const errors: Partial<
        Record<keyof EditGrainProductValues, string>
      > = {};

      if (stock < 0) {
        errors.stock =
          "El stock no puede ser negativo.";
      }

      return Object.keys(errors).length > 0
        ? errors
        : undefined;
    },

    validateOnBlur: true,
    validateOnChange: false,

    onSubmit: async (values, helpers) => {
      if (!product) {
        return;
      }

      const normalizedCurrency =
        normalizeCurrency(values.currency);

      await onSave(product.id, {
        name: values.name.trim(),
        unit: values.unit.trim(),
        location: values.location.trim(),

        minimumStock: String(
          values.minimumStock ?? "",
        ).trim(),

        stock: String(
          values.stock ?? "",
        ).trim(),

        unitPrice: String(
          values.unitPrice ?? "",
        ).trim(),

        currency: normalizedCurrency,
        imageUrl: values.imageUrl.trim(),
      });

      helpers.resetForm();
      setIsPriceFocused(false);
    },
  });

  useEffect(() => {
    if (open && product) {
      formik.setValues({
        name: product.name,

        unit:
          product.unit ||
          "Quintal",

        location:
          product.location,

        minimumStock: String(
          product.minimumStock ?? "",
        ),

        stock: String(
          product.currentStock ?? "",
        ),

        unitPrice: String(
          product.unitPrice ?? "",
        ),

        currency:
          product.currency,

        imageUrl:
          product.imageUrl ?? "",
      });

      formik.setTouched({});
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, product]);

  const showPriceSymbol =
    isPriceFocused ||
    String(
      formik.values.unitPrice ?? "",
    ).trim() !== "";

  const getFieldError = (
    field: keyof EditGrainProductValues,
  ): string | undefined => {
    if (!formik.touched[field]) {
      return undefined;
    }

    return formik.errors[field];
  };

  const disabled =
    isSubmitting ||
    formik.isSubmitting;

  return (
    <FormModal
      open={open}
      title="Editar grano"
      description="Actualiza la información del producto de granos."
      icon={<FaSeedling size={15} />}
      submitLabel="Guardar cambios"
      submitIcon={
        <FaBoxesStacked size={12} />
      }
      maxWidth={860}
      isSubmitting={isSubmitting}
      onClose={onClose}
      onSubmit={formik.handleSubmit}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1.5,
        }}
      >
        <FormSection
          icon={<FaSeedling size={14} />}
          title="Información del producto"
          description="Datos generales, presentación y ubicación del grano."
        >
          <Box sx={formGridStyles}>
            <ModalField
              label="Nombre del producto"
              htmlFor="edit-grain-name"
            >
              <TextField
                id="edit-grain-name"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Ej. Maíz amarillo"
                error={Boolean(
                  getFieldError("name"),
                )}
                helperText={
                  getFieldError("name")
                }
                disabled={disabled}
                fullWidth
                autoFocus
                autoComplete="off"
                sx={fieldStyles}
              />
            </ModalField>

            <ModalField
              label="Unidad"
              htmlFor="edit-grain-unit"
            >
              <TextField
                id="edit-grain-unit"
                name="unit"
                value={formik.values.unit}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                select
                fullWidth
                disabled={disabled}
                error={Boolean(
                  getFieldError("unit"),
                )}
                helperText={
                  getFieldError("unit")
                }
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

            <ModalField
              label="Ubicación"
              htmlFor="edit-grain-location"
            >
              <TextField
                id="edit-grain-location"
                name="location"
                value={
                  formik.values.location
                }
                onChange={
                  formik.handleChange
                }
                onBlur={formik.handleBlur}
                placeholder="Ej. Bodega principal"
                error={Boolean(
                  getFieldError(
                    "location",
                  ),
                )}
                helperText={getFieldError(
                  "location",
                )}
                disabled={disabled}
                fullWidth
                sx={fieldStyles}
              />
            </ModalField>

            <ModalField
              label="Moneda"
              htmlFor="edit-grain-currency"
            >
              <TextField
                id="edit-grain-currency"
                name="currency"
                select
                value={
                  formik.values.currency
                }
                onChange={
                  formik.handleChange
                }
                onBlur={formik.handleBlur}
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
                {currencies.map(
                  (currency) => (
                    <MenuItem
                      key={currency}
                      value={currency}
                    >
                      {
                        currencyLabels[
                          currency
                        ]
                      }
                    </MenuItem>
                  ),
                )}
              </TextField>
            </ModalField>
          </Box>

          <Box sx={{ mt: 1.5 }}>
            <ModalField
              label="Imagen del producto"
              htmlFor="edit-grain-image"
            >
              <ImageUrlField
                label="Imagen del grano"
                value={
                  formik.values.imageUrl
                }
                disabled={disabled}
                onChange={(imageUrl) => {
                  void formik.setFieldValue(
                    "imageUrl",
                    imageUrl,
                  );
                }}
              />
            </ModalField>
          </Box>
        </FormSection>

        <FormSection
          icon={
            <FaDollarSign size={14} />
          }
          title="Inventario y precio"
          description="Configura existencias, punto de alerta y precio de venta."
        >
          <Box sx={inventoryGridStyles}>
            <ModalField
              label="Stock actual"
              htmlFor="edit-grain-stock"
            >
              <TextField
                id="edit-grain-stock"
                name="stock"
                type="number"
                value={
                  formik.values.stock
                }
                onChange={
                  formik.handleChange
                }
                onBlur={formik.handleBlur}
                placeholder="0.00"
                error={Boolean(
                  getFieldError("stock"),
                )}
                helperText={
                  getFieldError("stock")
                }
                disabled={disabled}
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
              htmlFor="edit-grain-minimum-stock"
            >
              <TextField
                id="edit-grain-minimum-stock"
                name="minimumStock"
                type="number"
                value={
                  formik.values
                    .minimumStock
                }
                onChange={
                  formik.handleChange
                }
                onBlur={formik.handleBlur}
                placeholder="0.00"
                error={Boolean(
                  getFieldError(
                    "minimumStock",
                  ),
                )}
                helperText={getFieldError(
                  "minimumStock",
                )}
                disabled={disabled}
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
              htmlFor="edit-grain-unit-price"
            >
              <TextField
                id="edit-grain-unit-price"
                name="unitPrice"
                type="number"
                value={
                  formik.values.unitPrice
                }
                onChange={
                  formik.handleChange
                }
                onFocus={() => {
                  setIsPriceFocused(true);
                }}
                onBlur={(event) => {
                  setIsPriceFocused(
                    false,
                  );

                  formik.handleBlur(
                    event,
                  );
                }}
                placeholder="0.00"
                error={Boolean(
                  getFieldError(
                    "unitPrice",
                  ),
                )}
                helperText={getFieldError(
                  "unitPrice",
                )}
                disabled={disabled}
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
                          {getCurrencySymbol(
                            formik.values
                              .currency,
                          )}
                        </InputAdornment>
                      ) : undefined,
                  },
                }}
                sx={fieldStyles}
              />
            </ModalField>
          </Box>
        </FormSection>
      </Box>
    </FormModal>
  );
}

const formGridStyles: SxProps<Theme> = {
  display: "grid",

  gridTemplateColumns: {
    xs: "1fr",
    sm: "repeat(2, minmax(0, 1fr))",
  },

  gap: 1.5,

  alignItems: "start",
};

const inventoryGridStyles: SxProps<Theme> = {
  display: "grid",

  gridTemplateColumns: {
    xs: "1fr",
    sm: "repeat(2, minmax(0, 1fr))",
    md: "repeat(3, minmax(0, 1fr))",
  },

  gap: 1.5,

  alignItems: "start",
};

const fieldStyles: SxProps<Theme> = {
  "& .MuiOutlinedInput-root": {
    height: CONTROL_HEIGHT,
    minHeight: CONTROL_HEIGHT,

    borderRadius: "9px",

    bgcolor: "#ffffff",

    color: colors.text,

    fontSize: 13,

    fontWeight: 650,

    transition:
      "all 0.18s ease",

    "& fieldset": {
      borderColor:
        colors.cardBorder,
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
      borderColor:
        colors.primary,

      borderWidth: "1px",
    },

    "&.Mui-error fieldset": {
      borderColor:
        colors.danger,
    },

    "&.Mui-disabled": {
      bgcolor: "#f8faf9",
    },
  },

  "& .MuiInputBase-input": {
    height: CONTROL_HEIGHT,

    boxSizing: "border-box",

    padding: "0 12px",

    color:
      `${colors.text} !important`,

    WebkitTextFillColor:
      `${colors.text} !important`,

    "&::placeholder": {
      color: "#94a3b8",

      WebkitTextFillColor:
        "#94a3b8",

      opacity: 1,
    },

    "&:-webkit-autofill": {
      WebkitBoxShadow:
        "0 0 0 1000px #ffffff inset",

      WebkitTextFillColor:
        `${colors.text} !important`,

      caretColor:
        colors.text,
    },
  },

  "& .MuiSelect-select": {
    height:
      `${CONTROL_HEIGHT}px !important`,

    minHeight:
      `${CONTROL_HEIGHT}px !important`,

    boxSizing:
      "border-box !important",

    display: "flex",

    alignItems: "center",

    padding:
      "0 36px 0 12px !important",

    color:
      `${colors.text} !important`,

    WebkitTextFillColor:
      `${colors.text} !important`,
  },

  "& .MuiInputAdornment-root": {
    color: colors.muted,

    marginRight: 0.25,
  },

  "& .MuiSvgIcon-root": {
    color: colors.muted,
  },

  "& .MuiFormHelperText-root": {
    minHeight: 14,

    ml: 0,

    mt: 0.4,

    color: colors.danger,

    fontSize: 10.5,

    fontWeight: 650,
  },

  "& input[type='number']": {
    MozAppearance: "textfield",
  },

  "& input[type='number']::-webkit-outer-spin-button":
    {
      WebkitAppearance:
        "none",

      margin: 0,
    },

  "& input[type='number']::-webkit-inner-spin-button":
    {
      WebkitAppearance:
        "none",

      margin: 0,
    },
};

const menuPaperStyles: SxProps<Theme> = {
  mt: 0.75,

  maxHeight: 280,

  borderRadius: "10px",

  bgcolor: "#ffffff",

  border:
    `1px solid ${colors.cardBorder}`,

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
      bgcolor:
        colors.primarySoft,

      color:
        colors.primary,

      "&:hover": {
        bgcolor: "#bbf7d0",
      },
    },
  },
};