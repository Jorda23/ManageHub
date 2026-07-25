"use client";

import {
  useState,
 FormEvent,
} from "react";

import {
  Box,
  InputAdornment,
  TextField,
} from "@mui/material";

import type {
  SxProps,
  Theme,
} from "@mui/material/styles";

import {
  FaBuilding,
  FaPlusCircle,
} from "react-icons/fa";

import { FormModal } from "../FormModal";
import { ModalField } from "../ModalField";

export type AddPropertyFormValues = {
  name: string;
  code: string;
  location: string;
  size: string;
  price: string;
  ownerName: string;
  ownerPhone: string;
  ownerDocument: string;
};

type AddPropertyFormErrors = Partial<
  Record<keyof AddPropertyFormValues, string>
>;

type AddPropertyModalProps = {
  open: boolean;
  existingCodes?: string[];
  onClose: () => void;
  onSave: (
    values: AddPropertyFormValues,
  ) => void | Promise<void>;
};

const colors = {
  primary: "#1e3a8a",
  primaryLight: "#2563eb",
  text: "#0f172a",
  muted: "#64748b",
  danger: "#dc2626",
  border: "#dce5e1",
};

const initialValues: AddPropertyFormValues = {
  name: "",
  code: "",
  location: "",
  size: "",
  price: "",
  ownerName: "",
  ownerPhone: "",
  ownerDocument: "",
};

export function AddPropertyModal({
  open,
  existingCodes = [],
  onClose,
  onSave,
}: Readonly<AddPropertyModalProps>) {
  const [values, setValues] =
    useState<AddPropertyFormValues>(
      initialValues,
    );

  const [errors, setErrors] =
    useState<AddPropertyFormErrors>({});

  const [isPriceFocused, setIsPriceFocused] =
    useState(false);

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const showPriceSymbol =
    isPriceFocused ||
    values.price.trim() !== "";

  const updateField = <
    K extends keyof AddPropertyFormValues,
  >(
    field: K,
    value: AddPropertyFormValues[K],
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
    const nextErrors: AddPropertyFormErrors = {};

    const normalizedCode = values.code
      .trim()
      .toUpperCase();

    if (!values.name.trim()) {
      nextErrors.name =
        "Ingresa el nombre de la propiedad";
    }

    if (!normalizedCode) {
      nextErrors.code =
        "Ingresa el código de la propiedad";
    } else if (
      existingCodes.some(
        (code) =>
          code.trim().toUpperCase() ===
          normalizedCode,
      )
    ) {
      nextErrors.code =
        "Ya existe una propiedad con ese código";
    }

    if (!values.location.trim()) {
      nextErrors.location =
        "Ingresa la ubicación";
    }

    if (!values.size.trim()) {
      nextErrors.size =
        "Ingresa la medida de la propiedad";
    }

    const price = Number(values.price);

    if (
      values.price.trim() === "" ||
      !Number.isFinite(price) ||
      price <= 0
    ) {
      nextErrors.price =
        "Ingresa un precio mayor que cero";
    }

    if (!values.ownerName.trim()) {
      nextErrors.ownerName =
        "Ingresa el nombre del propietario";
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    const normalizedValues: AddPropertyFormValues = {
      ...values,
      name: values.name.trim(),
      code: values.code.trim().toUpperCase(),
      location: values.location.trim(),
      size: values.size.trim(),
      ownerName: values.ownerName.trim(),
      ownerPhone: values.ownerPhone.trim(),
      ownerDocument: values.ownerDocument.trim(),
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
      title="Agregar propiedad"
      description="Registra el terreno o propiedad y los datos de su propietario."
      icon={<FaBuilding size={18} />}
      submitLabel="Guardar propiedad"
      submitIcon={<FaPlusCircle size={12} />}
      maxWidth={680}
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
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "minmax(0, 1.5fr) minmax(180px, 0.8fr)",
            },
            gap: 2,
          }}
        >
          <ModalField
            label="Nombre de la propiedad"
            htmlFor="property-name"
          >
            <TextField
              id="property-name"
              name="name"
              value={values.name}
              onChange={(event) => {
                updateField(
                  "name",
                  event.target.value,
                );
              }}
              placeholder="Ej. Lote A-12"
              error={Boolean(errors.name)}
              helperText={errors.name}
              disabled={isSubmitting}
              fullWidth
              autoFocus
              sx={fieldStyles}
            />
          </ModalField>

          <ModalField
            label="Código"
            htmlFor="property-code"
          >
            <TextField
              id="property-code"
              name="code"
              value={values.code}
              onChange={(event) => {
                updateField(
                  "code",
                  event.target.value.toUpperCase(),
                );
              }}
              placeholder="PRP-LT-012"
              error={Boolean(errors.code)}
              helperText={errors.code}
              disabled={isSubmitting}
              fullWidth
              slotProps={{
                htmlInput: {
                  maxLength: 20,
                },
              }}
              sx={fieldStyles}
            />
          </ModalField>
        </Box>

        <ModalField
          label="Ubicación"
          htmlFor="property-location"
        >
          <TextField
            id="property-location"
            name="location"
            value={values.location}
            onChange={(event) => {
              updateField(
                "location",
                event.target.value,
              );
            }}
            placeholder="Ej. Residencial Las Colinas"
            error={Boolean(errors.location)}
            helperText={errors.location}
            disabled={isSubmitting}
            fullWidth
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
            label="Medida"
            htmlFor="property-size"
          >
            <TextField
              id="property-size"
              name="size"
              value={values.size}
              onChange={(event) => {
                updateField(
                  "size",
                  event.target.value,
                );
              }}
              placeholder="Ej. 450 m²"
              error={Boolean(errors.size)}
              helperText={errors.size}
              disabled={isSubmitting}
              fullWidth
              sx={fieldStyles}
            />
          </ModalField>

          <ModalField
            label="Precio de venta"
            htmlFor="property-price"
          >
            <TextField
              id="property-price"
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

        <Box
          sx={{
            pt: 0.5,
            borderTop: `1px solid ${colors.border}`,
          }}
        />

        <ModalField
          label="Cliente propietario"
          htmlFor="property-owner-name"
        >
          <TextField
            id="property-owner-name"
            name="ownerName"
            value={values.ownerName}
            onChange={(event) => {
              updateField(
                "ownerName",
                event.target.value,
              );
            }}
            placeholder="Nombre completo"
            error={Boolean(errors.ownerName)}
            helperText={errors.ownerName}
            disabled={isSubmitting}
            fullWidth
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
            label="Teléfono"
            htmlFor="property-owner-phone"
          >
            <TextField
              id="property-owner-phone"
              name="ownerPhone"
              value={values.ownerPhone}
              onChange={(event) => {
                updateField(
                  "ownerPhone",
                  event.target.value,
                );
              }}
              placeholder="Ej. 8888-8888"
              disabled={isSubmitting}
              fullWidth
              slotProps={{
                htmlInput: {
                  inputMode: "tel",
                  maxLength: 20,
                },
              }}
              sx={fieldStyles}
            />
          </ModalField>

          <ModalField
            label="Documento"
            htmlFor="property-owner-document"
          >
            <TextField
              id="property-owner-document"
              name="ownerDocument"
              value={values.ownerDocument}
              onChange={(event) => {
                updateField(
                  "ownerDocument",
                  event.target.value,
                );
              }}
              placeholder="Cédula o identificación"
              disabled={isSubmitting}
              fullWidth
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
      borderColor: "#93a8d8",
    },

    "&.Mui-focused": {
      bgcolor: "#ffffff",
      boxShadow:
        "0 0 0 3px rgba(37, 99, 235, 0.09)",
    },

    "&.Mui-focused fieldset": {
      borderColor: colors.primaryLight,
      borderWidth: "1px",
    },

    "&.Mui-error fieldset": {
      borderColor: colors.danger,
    },

    "&.Mui-disabled": {
      bgcolor: "#f8fafc",
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

  "& .MuiInputAdornment-root": {
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