"use client";

import { useState } from "react";

import { Alert, Box, InputAdornment, TextField } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";

import dayjs, { type Dayjs } from "dayjs";

import { useFormik } from "formik";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { FaBuilding, FaPlusCircle } from "react-icons/fa";

import { useCreateProperty } from "@/hook/useProperties";
import { colors } from "@/theme/sharedColors";
import { addPropertySchema } from "@/validations";

import { FormModal } from "../FormModal";
import { ImageUploadField } from "../ImageUploadField/ImageUploadField";
import { ModalField } from "../ModalField";

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
  identificationImageUrl: string;
  identificationNumber: string;
};

type AddPropertyModalProps = {
  open: boolean;
  onClose: () => void;
  onCreated?: (propertyId: string) => void;
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
  identificationImageUrl: "",
  identificationNumber: "",
};

export function AddPropertyModal({ open, onClose, onCreated }: Readonly<AddPropertyModalProps>) {
  const [requestError, setRequestError] = useState("");

  const [isTotalPriceFocused, setIsTotalPriceFocused] = useState(false);

  const [isInitialPaymentFocused, setIsInitialPaymentFocused] = useState(false);

  const { mutateAsync: createProperty, isPending: isCreatingProperty } = useCreateProperty();

  const formik = useFormik<AddPropertyFormValues>({
    initialValues,
    validationSchema: addPropertySchema,
    validateOnBlur: true,
    validateOnChange: false,

    onSubmit: async (values, helpers) => {
      setRequestError("");

      try {
        const response = await createProperty({
          name: values.name.trim(),

          projectName: values.projectName.trim(),

          measure: values.measure.trim(),

          location: values.location.trim(),

          ownerName: values.ownerName.trim(),

          totalPrice: Number(values.totalPrice),

          initialPayment: Number(values.initialPayment || "0"),

          nextPaymentDate: values.nextPaymentDate
            ? dayjs(values.nextPaymentDate).startOf("day").toISOString()
            : null,

          imageUrl: values.imageUrl.trim() || null,

          IdentificationNumber: values.identificationNumber.trim(),

          IdentificationImageUrl: values.identificationImageUrl.trim() || null,
        });

        helpers.resetForm();

        onCreated?.(response.id);

        onClose();
      } catch {
        setRequestError("No se pudo registrar la propiedad.");
      }
    },
  });

  const showTotalPriceSymbol = isTotalPriceFocused || formik.values.totalPrice.trim() !== "";

  const showInitialPaymentSymbol =
    isInitialPaymentFocused || formik.values.initialPayment.trim() !== "";

  const handleClose = (): void => {
    if (isCreatingProperty) {
      return;
    }

    formik.resetForm();

    setRequestError("");

    setIsTotalPriceFocused(false);

    setIsInitialPaymentFocused(false);

    onClose();
  };

  const getFieldError = (field: keyof AddPropertyFormValues): string | undefined => {
    if (!formik.touched[field]) {
      return undefined;
    }

    return formik.errors[field];
  };

  return (
    <FormModal
      open={open}
      title="Agregar propiedad"
      description="Registra el terreno o propiedad, los datos del propietario y su información de pago."
      icon={<FaBuilding size={18} />}
      submitLabel="Guardar propiedad"
      submitIcon={<FaPlusCircle size={12} />}
      maxWidth={880}
      isSubmitting={isCreatingProperty}
      onClose={handleClose}
      onSubmit={formik.handleSubmit}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2.5,
        }}
      >
        {requestError && <Alert severity="error">{requestError}</Alert>}

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
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Ej. Lote A-12"
              error={Boolean(getFieldError("name"))}
              helperText={getFieldError("name")}
              disabled={isCreatingProperty}
              fullWidth
              autoFocus
              sx={fieldStyles}
            />
          </ModalField>

          <ModalField label="Proyecto" htmlFor="property-project">
            <TextField
              id="property-project"
              name="projectName"
              value={formik.values.projectName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Ej. Residencial Las Colinas"
              error={Boolean(getFieldError("projectName"))}
              helperText={getFieldError("projectName")}
              disabled={isCreatingProperty}
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
              value={formik.values.measure}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Ej. 450 m²"
              error={Boolean(getFieldError("measure"))}
              helperText={getFieldError("measure")}
              disabled={isCreatingProperty}
              fullWidth
              sx={fieldStyles}
            />
          </ModalField>

          <ModalField label="Ubicación" htmlFor="property-location">
            <TextField
              id="property-location"
              name="location"
              value={formik.values.location}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Ej. Las Colinas, Managua"
              error={Boolean(getFieldError("location"))}
              helperText={getFieldError("location")}
              disabled={isCreatingProperty}
              fullWidth
              sx={fieldStyles}
            />
          </ModalField>
        </Box>

        <ModalField label="Propietario" htmlFor="property-owner-name">
          <TextField
            id="property-owner-name"
            name="ownerName"
            value={formik.values.ownerName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Ej. Valeria Gómez"
            error={Boolean(getFieldError("ownerName"))}
            helperText={getFieldError("ownerName")}
            disabled={isCreatingProperty}
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

            alignItems: "start",
          }}
        >
          <ModalField label="Número de identificación" htmlFor="property-identification-number">
            <TextField
              id="property-identification-number"
              name="identificationNumber"
              value={formik.values.identificationNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Ej. 001-010190-0001A"
              error={Boolean(getFieldError("identificationNumber"))}
              helperText={getFieldError("identificationNumber")}
              disabled={isCreatingProperty}
              fullWidth
              sx={fieldStyles}
            />
          </ModalField>

          <ModalField label="Documento de identificación" htmlFor="property-identification-image">
            <ImageUploadField
              label="Foto del documento"
              value={formik.values.identificationImageUrl}
              disabled={isCreatingProperty}
              onChange={(imageUrl) => {
                void formik.setFieldValue("identificationImageUrl", imageUrl);

                void formik.setFieldTouched("identificationImageUrl", true, false);
              }}
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
          <ModalField label="Precio total" htmlFor="property-total-price">
            <TextField
              id="property-total-price"
              name="totalPrice"
              type="number"
              value={formik.values.totalPrice}
              onChange={formik.handleChange}
              onFocus={() => {
                setIsTotalPriceFocused(true);
              }}
              onBlur={(event) => {
                setIsTotalPriceFocused(false);

                formik.handleBlur(event);
              }}
              placeholder="0.00"
              error={Boolean(getFieldError("totalPrice"))}
              helperText={getFieldError("totalPrice")}
              disabled={isCreatingProperty}
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
              value={formik.values.initialPayment}
              onChange={formik.handleChange}
              onFocus={() => {
                setIsInitialPaymentFocused(true);
              }}
              onBlur={(event) => {
                setIsInitialPaymentFocused(false);

                formik.handleBlur(event);
              }}
              placeholder="0.00"
              error={Boolean(getFieldError("initialPayment"))}
              helperText={getFieldError("initialPayment")}
              disabled={isCreatingProperty}
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
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              value={formik.values.nextPaymentDate ? dayjs(formik.values.nextPaymentDate) : null}
              onChange={(date: Dayjs | null) => {
                void formik.setFieldValue(
                  "nextPaymentDate",

                  date ? date.format("YYYY-MM-DD") : "",
                );
              }}
              onClose={() => {
                void formik.setFieldTouched("nextPaymentDate", true);
              }}
              disabled={isCreatingProperty}
              format="DD/MM/YYYY"
              slotProps={{
                textField: {
                  id: "property-next-payment-date",

                  name: "nextPaymentDate",

                  fullWidth: true,

                  error: Boolean(getFieldError("nextPaymentDate")),

                  helperText: getFieldError("nextPaymentDate"),

                  sx: fieldStyles,
                },
              }}
            />
          </LocalizationProvider>
        </ModalField>

        <Box
          sx={{
            pt: 0.5,

            borderTop: `1px solid ${colors.cardBorder}`,
          }}
        />

        <ModalField label="Imagen para la tarjeta" htmlFor="property-image">
          <ImageUploadField
            label="Imagen del terreno"
            value={formik.values.imageUrl}
            disabled={isCreatingProperty}
            onChange={(imageUrl) => {
              void formik.setFieldValue("imageUrl", imageUrl);

              void formik.setFieldTouched("imageUrl", true, false);
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
      borderColor: colors.cardBorder,
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
