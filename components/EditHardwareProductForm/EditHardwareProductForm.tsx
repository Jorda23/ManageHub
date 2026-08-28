"use client";

import { useEffect, useState } from "react";

import { Box, InputAdornment, MenuItem, RadioGroup, TextField, Typography } from "@mui/material";

import type { SxProps, Theme } from "@mui/material/styles";

import { useFormik } from "formik";

import { FaDollarSign, FaInfoCircle, FaTools } from "react-icons/fa";
import { FaBoxesStacked } from "react-icons/fa6";

import { colors } from "@/theme/sharedColors";

import { addHardwareProductSchema } from "@/validations";

import { FormModal } from "../FormModal";
import { FormSection } from "../FormSection";
import { ImageUploadField } from "../ImageUploadField";
import { ModalField } from "../ModalField";

import type { HardwareProduct } from "@/shared/types/api.types";

export type EditHardwareProductValues = {
  name: string;
  detail: string;
  category: string;
  minimumStock: string;
  unitPrice: string;
  inventoryStatus: string;
  imageUrl: string;
};

type EditHardwareProductFormProps = {
  open: boolean;
  product: HardwareProduct | null;
  isSubmitting?: boolean;
  onClose: () => void;
  onSave: (id: string, values: EditHardwareProductValues) => void | Promise<void>;
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

export function EditHardwareProductForm({
  open,
  product,
  isSubmitting = false,
  onClose,
  onSave,
}: Readonly<EditHardwareProductFormProps>) {
  const [isPriceFocused, setIsPriceFocused] = useState(false);

  const formik = useFormik<EditHardwareProductValues>({
    initialValues: {
      name: "",
      detail: "",
      category: "",
      minimumStock: "",
      unitPrice: "",
      inventoryStatus: "Available",
      imageUrl: "",
    },
    validationSchema: addHardwareProductSchema.pick(["name", "detail", "category"]),
    validateOnBlur: true,
    validateOnChange: false,
    onSubmit: async (values, helpers) => {
      if (!product) {
        return;
      }

      await onSave(product.id, {
        name: values.name.trim(),
        detail: values.detail.trim(),
        category: values.category.trim(),
        minimumStock: String(values.minimumStock ?? "").trim(),
        unitPrice: String(values.unitPrice ?? "").trim(),
        inventoryStatus: values.inventoryStatus,
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
        detail: product.detail,
        category: product.category,
        minimumStock: String(product.minimumStock ?? ""),
        unitPrice: String(product.unitPrice ?? ""),
        inventoryStatus: product.inventoryStatus || "Available",
        imageUrl: product.imageUrl ?? "",
      });
      formik.setTouched({});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, product]);

  const showPriceSymbol =
    isPriceFocused || String(formik.values.unitPrice ?? "").trim() !== "";

  const getFieldError = (field: keyof EditHardwareProductValues): string | undefined => {
    if (!formik.touched[field]) {
      return undefined;
    }

    return formik.errors[field];
  };

  const disabled = isSubmitting || formik.isSubmitting;

  return (
    <FormModal
      open={open}
      title="Editar producto de ferretería"
      description="Actualiza la información del producto de ferretería."
      icon={<FaTools size={15} />}
      submitLabel="Guardar cambios"
      submitIcon={<FaBoxesStacked size={12} />}
      isSubmitting={isSubmitting}
      onClose={onClose}
      onSubmit={formik.handleSubmit}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <FormSection
          icon={<FaTools size={14} />}
          title="Información del producto"
          description="Datos generales y clasificación del producto."
        >
          <ModalField label="Nombre del producto" htmlFor="edit-hardware-product-name">
            <TextField
              id="edit-hardware-product-name"
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
            <ModalField label="Detalle o presentación" htmlFor="edit-hardware-product-detail">
              <TextField
                id="edit-hardware-product-detail"
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

            <ModalField label="Categoría" htmlFor="edit-hardware-product-category">
              <TextField
                id="edit-hardware-product-category"
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

          <ModalField label="Imagen del producto" htmlFor="edit-hardware-product-image">
            <ImageUploadField
              label="Imagen del producto"
              value={formik.values.imageUrl}
              disabled={disabled}
              onChange={(imageUrl) => {
                void formik.setFieldValue("imageUrl", imageUrl);
              }}
            />
          </ModalField>
        </FormSection>

        <FormSection
          icon={<FaBoxesStacked size={14} />}
          title="Inventario"
          description="Configura el nivel mínimo de existencias."
        >
          <Box
            sx={{
              width: {
                xs: "100%",
                sm: "calc(50% - 8px)",
              },
            }}
          >
            <ModalField label="Stock mínimo" htmlFor="edit-hardware-product-minimum-stock">
              <TextField
                id="edit-hardware-product-minimum-stock"
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
            <ModalField label="Precio unitario" htmlFor="edit-hardware-product-unit-price">
              <TextField
                id="edit-hardware-product-unit-price"
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
                      <InputAdornment position="start">$</InputAdornment>
                    ) : undefined,
                  },
                }}
                sx={fieldStyles}
              />
            </ModalField>
          </Box>
        </FormSection>

        <FormSection
          icon={<FaInfoCircle size={14} />}
          title="Estado"
          description="Selecciona el estado del inventario."
        >
          <RadioGroup
            name="inventoryStatus"
            value={formik.values.inventoryStatus}
            onChange={formik.handleChange}
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "1fr 1fr",
              },
              gap: 1,
            }}
          >
            <StatusOption
              value="Available"
              label="Disponible"
              description="Producto disponible para venta."
              selected={formik.values.inventoryStatus === "Available"}
            />

            <StatusOption
              value="Unavailable"
              label="No disponible"
              description="Producto temporalmente no disponible."
              selected={formik.values.inventoryStatus === "Unavailable"}
            />
          </RadioGroup>
        </FormSection>
      </Box>
    </FormModal>
  );
}

type StatusOptionProps = {
  value: string;
  label: string;
  description: string;
  selected: boolean;
};

function StatusOption({
  value,
  label,
  description,
  selected,
}: Readonly<StatusOptionProps>) {
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
