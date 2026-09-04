"use client";

import { useState, type FormEvent } from "react";

import { Alert, Box, Button, InputAdornment, MenuItem, TextField, Typography } from "@mui/material";

import type { SxProps, Theme } from "@mui/material/styles";

import dayjs, { type Dayjs } from "dayjs";

import { useFormik } from "formik";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { FaBuilding, FaDollarSign, FaIdCard, FaPlusCircle, FaTimes } from "react-icons/fa";

import { useCreateProperty } from "@/hook/useProperties";

import { colors } from "@/theme/sharedColors";

import { addPropertySchema, type AddPropertyFormValues } from "@/validations";

import { useToast } from "@/components/Toast";

import {
  currencies,
  currencyLabels,
  normalizeCurrency,
  getCurrencySymbol,
} from "@/shared/utils/currency";

import { ImageUrlField } from "@/components/ImageUrlField";
import { ModalField } from "@/components/ModalField";
import { FormSection } from "../FormSection";

type AddPropertyFormProps = {
  onCancel: () => void;
  onCreated?: (propertyId: string) => void;
};

const initialValues: AddPropertyFormValues = {
  name: "",
  projectName: "",
  measure: "",
  location: "",
  ownerName: "",
  totalPrice: "",
  currency: "NIO",
  initialPayment: "",
  nextPaymentDate: "",
  imageUrl: "",
  identificationImageUrl: "",
  identificationNumber: "",
};

export function AddPropertyForm({ onCancel, onCreated }: Readonly<AddPropertyFormProps>) {
  const [requestError, setRequestError] = useState("");

  const [isTotalPriceFocused, setIsTotalPriceFocused] = useState(false);

  const [isInitialPaymentFocused, setIsInitialPaymentFocused] = useState(false);

  const { mutateAsync: createProperty, isPending: isCreatingProperty } = useCreateProperty();

  const { showSuccess, showError } = useToast();

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

          currency: normalizeCurrency(values.currency),

          nextPaymentDate: values.nextPaymentDate
            ? dayjs(values.nextPaymentDate).startOf("day").toISOString()
            : null,

          imageUrl: values.imageUrl.trim() || null,

          IdentificationNumber: values.identificationNumber.trim(),

          IdentificationImageUrl: values.identificationImageUrl.trim() || null,
        });

        helpers.resetForm();

        showSuccess("Terreno registrado correctamente.");

        onCreated?.(response.id);
      } catch {
        setRequestError("No se pudo registrar la propiedad.");

        showError("No se pudo registrar la propiedad.");
      }
    },
  });

  const showTotalPriceSymbol =
    isTotalPriceFocused || String(formik.values.totalPrice ?? "").trim() !== "";

  const showInitialPaymentSymbol =
    isInitialPaymentFocused || String(formik.values.initialPayment ?? "").trim() !== "";

  const getFieldError = (field: keyof AddPropertyFormValues): string | undefined => {
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
        projectName: true,
        measure: true,
        location: true,
        ownerName: true,
        totalPrice: true,
        currency: true,
        initialPayment: true,
        nextPaymentDate: true,
        imageUrl: true,
        identificationImageUrl: true,
        identificationNumber: true,
      });
      showError("Revisa los campos marcados antes de continuar.");
      return;
    }

    await formik.submitForm();
  };

  const handleCancel = (): void => {
    if (isCreatingProperty) {
      return;
    }

    formik.resetForm();

    setRequestError("");

    setIsTotalPriceFocused(false);

    setIsInitialPaymentFocused(false);

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
            Registrar nuevo terreno
          </Typography>

          <Typography
            sx={{
              mt: 0.5,
              color: colors.muted,
              fontSize: 12,
              fontWeight: 500,
            }}
          >
            Registra la información del terreno, propietario y condiciones de pago.
          </Typography>
        </Box>

        <Button
          type="button"
          variant="outlined"
          startIcon={<FaTimes size={11} />}
          disabled={isCreatingProperty}
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
              borderColor: colors.primaryLight,
              bgcolor: colors.primarySoft,
            },
          }}
        >
          Cancelar
        </Button>
      </Box>

      {requestError && <Alert severity="error">{requestError}</Alert>}

      <FormSection
        icon={<FaBuilding size={14} />}
        title="Información del terreno"
        description="Datos generales y ubicación de la propiedad."
      >
        <Box sx={twoColumnsStyles}>
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

        <Box sx={twoColumnsStyles}>
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

        <ModalField label="Imagen del terreno" htmlFor="property-image">
          <ImageUrlField
            label="Imagen del terreno"
            value={formik.values.imageUrl}
            disabled={isCreatingProperty}
            onChange={(imageUrl) => {
              void formik.setFieldValue("imageUrl", imageUrl);

              void formik.setFieldTouched("imageUrl", true, false);
            }}
          />
        </ModalField>
      </FormSection>

      <FormSection
        icon={<FaIdCard size={14} />}
        title="Datos del propietario"
        description="Información de la persona asociada al terreno."
      >
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

        <Box sx={twoColumnsStyles}>
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
            <ImageUrlField
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
      </FormSection>

      <FormSection
        icon={<FaDollarSign size={14} />}
        title="Información de pago"
        description="Precio, abono inicial y programación del siguiente pago."
      >
        <ModalField label="Moneda" htmlFor="property-currency">
          <TextField
            id="property-currency"
            name="currency"
            select
            value={formik.values.currency}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={Boolean(getFieldError("currency"))}
            helperText={getFieldError("currency")}
            disabled={isCreatingProperty}
            fullWidth
            sx={fieldStyles}
          >
            {currencies.map((currency) => (
              <MenuItem key={currency} value={currency}>
                {currencyLabels[currency]}
              </MenuItem>
            ))}
          </TextField>
        </ModalField>

        <Box sx={twoColumnsStyles}>
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
                    <InputAdornment position="start">
                      {getCurrencySymbol(formik.values.currency)}
                    </InputAdornment>
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

        <Box
          sx={{
            width: {
              xs: "100%",
              sm: "calc(50% - 8px)",
            },
          }}
        >
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
          disabled={isCreatingProperty}
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
              borderColor: colors.primaryLight,
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
          disabled={isCreatingProperty}
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
          {isCreatingProperty ? "Registrando..." : "Registrar terreno"}
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
