"use client";

import { FormEvent, useState } from "react";

import { Box, InputAdornment, TextField } from "@mui/material";

import type { SxProps, Theme } from "@mui/material/styles";

import { FaBuilding, FaPlusCircle } from "react-icons/fa";

import { FormModal } from "../FormModal";
import { ModalField } from "../ModalField";
import { ImageUploadField } from "../WorkspaceShared/ImageUploadField";

export type AddPropertyFormValues = {
  name: string;
  projectName: string;
  measure: string;
  location: string;
  ownerName: string;
  totalPrice: string;
  initialPayment: string;
  nextPaymentDate: string;
  imageUrl: string;
};

type AddPropertyFormErrors = Partial<Record<keyof AddPropertyFormValues, string>>;

type AddPropertyModalProps = {
  open: boolean;
  onClose: () => void;
  onSave: (values: AddPropertyFormValues) => void | Promise<void>;
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
  projectName: "",
  measure: "",
  location: "",
  ownerName: "",
  totalPrice: "",
  initialPayment: "",
  nextPaymentDate: "",
  imageUrl: "",
};

export function AddPropertyModal({ open, onClose, onSave }: Readonly<AddPropertyModalProps>) {
  const [values, setValues] = useState<AddPropertyFormValues>(initialValues);

  const [errors, setErrors] = useState<AddPropertyFormErrors>({});

  const [isTotalPriceFocused, setIsTotalPriceFocused] = useState(false);

  const [isInitialPaymentFocused, setIsInitialPaymentFocused] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const showTotalPriceSymbol = isTotalPriceFocused || values.totalPrice.trim() !== "";

  const showInitialPaymentSymbol = isInitialPaymentFocused || values.initialPayment.trim() !== "";

  const updateField = <K extends keyof AddPropertyFormValues>(
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
    setIsTotalPriceFocused(false);
    setIsInitialPaymentFocused(false);
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

    if (!values.name.trim()) {
      nextErrors.name = "Ingresa el nombre de la propiedad";
    }

    if (!values.projectName.trim()) {
      nextErrors.projectName = "Ingresa el nombre del proyecto";
    }

    if (!values.measure.trim()) {
      nextErrors.measure = "Ingresa la medida de la propiedad";
    }

    if (!values.location.trim()) {
      nextErrors.location = "Ingresa la ubicación";
    }

    if (!values.ownerName.trim()) {
      nextErrors.ownerName = "Ingresa el nombre del propietario";
    }

    const totalPrice = Number(values.totalPrice);

    if (values.totalPrice.trim() === "" || !Number.isFinite(totalPrice) || totalPrice <= 0) {
      nextErrors.totalPrice = "Ingresa un precio total mayor que cero";
    }

    const initialPayment = Number(values.initialPayment || "0");

    if (!Number.isFinite(initialPayment) || initialPayment < 0) {
      nextErrors.initialPayment = "Ingresa un abono inicial válido";
    }

    if (Number.isFinite(totalPrice) && initialPayment > totalPrice) {
      nextErrors.initialPayment = "El abono inicial no puede ser mayor al precio total";
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    const normalizedValues: AddPropertyFormValues = {
      name: values.name.trim(),
      projectName: values.projectName.trim(),
      measure: values.measure.trim(),
      location: values.location.trim(),
      ownerName: values.ownerName.trim(),
      totalPrice: values.totalPrice.trim(),
      initialPayment: values.initialPayment.trim() || "0",
      nextPaymentDate: values.nextPaymentDate,
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
      title="Agregar propiedad"
      description="Registra el terreno o propiedad y su información de pago."
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
              sm: "1fr 1fr",
            },
            gap: 2,
          }}
        >
          <ModalField label="Nombre de la propiedad" htmlFor="property-name">
            <TextField
              id="property-name"
              name="name"
              value={values.name}
              onChange={(event) => {
                updateField("name", event.target.value);
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

          <ModalField label="Proyecto" htmlFor="property-project">
            <TextField
              id="property-project"
              name="projectName"
              value={values.projectName}
              onChange={(event) => {
                updateField("projectName", event.target.value);
              }}
              placeholder="Ej. Residencial Las Colinas"
              error={Boolean(errors.projectName)}
              helperText={errors.projectName}
              disabled={isSubmitting}
              fullWidth
              sx={fieldStyles}
            />
          </ModalField>
        </Box>

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
          <ModalField label="Medida" htmlFor="property-measure">
            <TextField
              id="property-measure"
              name="measure"
              value={values.measure}
              onChange={(event) => {
                updateField("measure", event.target.value);
              }}
              placeholder="Ej. 450 m²"
              error={Boolean(errors.measure)}
              helperText={errors.measure}
              disabled={isSubmitting}
              fullWidth
              sx={fieldStyles}
            />
          </ModalField>

          <ModalField label="Ubicación" htmlFor="property-location">
            <TextField
              id="property-location"
              name="location"
              value={values.location}
              onChange={(event) => {
                updateField("location", event.target.value);
              }}
              placeholder="Ej. Las Colinas, Managua"
              error={Boolean(errors.location)}
              helperText={errors.location}
              disabled={isSubmitting}
              fullWidth
              sx={fieldStyles}
            />
          </ModalField>
        </Box>

        <ModalField label="Propietario" htmlFor="property-owner-name">
          <TextField
            id="property-owner-name"
            name="ownerName"
            value={values.ownerName}
            onChange={(event) => {
              updateField("ownerName", event.target.value);
            }}
            placeholder="Ej. Valeria Gómez"
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
          <ModalField label="Precio total" htmlFor="property-total-price">
            <TextField
              id="property-total-price"
              name="totalPrice"
              type="number"
              value={values.totalPrice}
              onChange={(event) => {
                updateField("totalPrice", event.target.value);
              }}
              onFocus={() => {
                setIsTotalPriceFocused(true);
              }}
              onBlur={() => {
                setIsTotalPriceFocused(false);
              }}
              placeholder="0.00"
              error={Boolean(errors.totalPrice)}
              helperText={errors.totalPrice}
              disabled={isSubmitting}
              fullWidth
              slotProps={{
                htmlInput: {
                  min: 0,
                  step: "0.01",
                },
                input: {
                  startAdornment: showTotalPriceSymbol ? (
                    <InputAdornment position="start">$</InputAdornment>
                  ) : undefined,
                },
              }}
              sx={fieldStyles}
            />
          </ModalField>

          <ModalField label="Abono inicial" htmlFor="property-initial-payment">
            <TextField
              id="property-initial-payment"
              name="initialPayment"
              type="number"
              value={values.initialPayment}
              onChange={(event) => {
                updateField("initialPayment", event.target.value);
              }}
              onFocus={() => {
                setIsInitialPaymentFocused(true);
              }}
              onBlur={() => {
                setIsInitialPaymentFocused(false);
              }}
              placeholder="0.00"
              error={Boolean(errors.initialPayment)}
              helperText={errors.initialPayment}
              disabled={isSubmitting}
              fullWidth
              slotProps={{
                htmlInput: {
                  min: 0,
                  step: "0.01",
                },
                input: {
                  startAdornment: showInitialPaymentSymbol ? (
                    <InputAdornment position="start">$</InputAdornment>
                  ) : undefined,
                },
              }}
              sx={fieldStyles}
            />
          </ModalField>
        </Box>

        <ModalField label="Próximo pago" htmlFor="property-next-payment-date">
          <TextField
            id="property-next-payment-date"
            name="nextPaymentDate"
            type="date"
            value={values.nextPaymentDate}
            onChange={(event) => {
              updateField("nextPaymentDate", event.target.value);
            }}
            disabled={isSubmitting}
            fullWidth
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
            sx={fieldStyles}
          />
        </ModalField>

        <Box
          sx={{
            pt: 0.5,
            borderTop: `1px solid ${colors.border}`,
          }}
        />

        <ModalField label="Imagen para la tarjeta" htmlFor="property-image">
          <ImageUploadField
            label="Imagen del terreno"
            value={values.imageUrl}
            disabled={isSubmitting}
            onChange={(imageUrl) => {
              updateField("imageUrl", imageUrl);
            }}
          />
        </ModalField>
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
      boxShadow: "0 0 0 3px rgba(37, 99, 235, 0.09)",
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

  "& input[type='number']::-webkit-outer-spin-button": {
    WebkitAppearance: "none",
    margin: 0,
  },

  "& input[type='number']::-webkit-inner-spin-button": {
    WebkitAppearance: "none",
    margin: 0,
  },
};
