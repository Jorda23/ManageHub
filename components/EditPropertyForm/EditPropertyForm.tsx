"use client";

import { useEffect } from "react";

import { Box, TextField } from "@mui/material";

import type { SxProps, Theme } from "@mui/material/styles";

import dayjs, { type Dayjs } from "dayjs";

import { useFormik } from "formik";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { FaBuilding, FaIdCard, FaSave } from "react-icons/fa";

import { colors } from "@/theme/sharedColors";

import { FormModal } from "../FormModal";
import { FormSection } from "../FormSection";
import { ImageUploadField } from "../ImageUploadField";
import { ModalField } from "../ModalField";

import type { Property } from "@/shared/types/api.types";

export type EditPropertyValues = {
  name: string;
  projectName: string;
  measure: string;
  location: string;
  ownerName: string;
  identificationNumber: string;
  nextPaymentDate: string | null;
  imageUrl: string | null;
  identificationImageUrl: string | null;
};

type EditPropertyFormProps = {
  open: boolean;
  property: Property | null;
  isSubmitting?: boolean;
  onClose: () => void;
  onSave: (id: string, values: EditPropertyValues) => void | Promise<void>;
};

export function EditPropertyForm({
  open,
  property,
  isSubmitting = false,
  onClose,
  onSave,
}: Readonly<EditPropertyFormProps>) {
  const formik = useFormik<EditPropertyValues>({
    initialValues: {
      name: "",
      projectName: "",
      measure: "",
      location: "",
      ownerName: "",
      identificationNumber: "",
      nextPaymentDate: "",
      imageUrl: "",
      identificationImageUrl: "",
    },
    validateOnBlur: true,
    validateOnChange: false,
    onSubmit: async (values, helpers) => {
      if (!property) {
        return;
      }

      await onSave(property.id, {
        name: values.name.trim(),
        projectName: values.projectName.trim(),
        measure: values.measure.trim(),
        location: values.location.trim(),
        ownerName: values.ownerName.trim(),
        identificationNumber: values.identificationNumber.trim(),
        nextPaymentDate: values.nextPaymentDate || null,
        imageUrl: values.imageUrl?.trim() || null,
        identificationImageUrl: values.identificationImageUrl?.trim() || null,
      });

      helpers.resetForm();
    },
  });

  useEffect(() => {
    if (open && property) {
      formik.setValues({
        name: property.name,
        projectName: property.projectName,
        measure: property.measure,
        location: property.location,
        ownerName: property.ownerName,
        identificationNumber: "",
        nextPaymentDate: property.nextPaymentDate
          ? dayjs(property.nextPaymentDate).format("YYYY-MM-DD")
          : "",
        imageUrl: property.imageUrl ?? "",
        identificationImageUrl: "",
      });
      formik.setTouched({});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, property]);

  const getFieldError = (field: keyof EditPropertyValues): string | undefined => {
    if (!formik.touched[field]) {
      return undefined;
    }

    return formik.errors[field];
  };

  const disabled = isSubmitting || formik.isSubmitting;

  return (
    <FormModal
      open={open}
      title="Editar terreno"
      description="Actualiza la información del terreno registrado."
      icon={<FaBuilding size={15} />}
      submitLabel="Guardar cambios"
      submitIcon={<FaSave size={12} />}
      maxWidth={680}
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
          icon={<FaBuilding size={14} />}
          title="Información del terreno"
          description="Datos generales y ubicación de la propiedad."
        >
          <Box sx={twoColumnsStyles}>
            <ModalField label="Nombre de la propiedad" htmlFor="edit-property-name">
              <TextField
                id="edit-property-name"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Ej. Lote A-12"
                error={Boolean(getFieldError("name"))}
                helperText={getFieldError("name")}
                disabled={disabled}
                fullWidth
                autoFocus
                sx={fieldStyles}
              />
            </ModalField>

            <ModalField label="Proyecto" htmlFor="edit-property-project">
              <TextField
                id="edit-property-project"
                name="projectName"
                value={formik.values.projectName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Ej. Residencial Las Colinas"
                error={Boolean(getFieldError("projectName"))}
                helperText={getFieldError("projectName")}
                disabled={disabled}
                fullWidth
                sx={fieldStyles}
              />
            </ModalField>
          </Box>

          <Box sx={twoColumnsStyles}>
            <ModalField label="Medida" htmlFor="edit-property-measure">
              <TextField
                id="edit-property-measure"
                name="measure"
                value={formik.values.measure}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Ej. 450 m²"
                error={Boolean(getFieldError("measure"))}
                helperText={getFieldError("measure")}
                disabled={disabled}
                fullWidth
                sx={fieldStyles}
              />
            </ModalField>

            <ModalField label="Ubicación" htmlFor="edit-property-location">
              <TextField
                id="edit-property-location"
                name="location"
                value={formik.values.location}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Ej. Las Colinas, Managua"
                error={Boolean(getFieldError("location"))}
                helperText={getFieldError("location")}
                disabled={disabled}
                fullWidth
                sx={fieldStyles}
              />
            </ModalField>
          </Box>

          <ModalField label="Imagen del terreno" htmlFor="edit-property-image">
            <ImageUploadField
              label="Imagen del terreno"
              value={formik.values.imageUrl ?? ""}
              disabled={disabled}
              onChange={(imageUrl) => {
                void formik.setFieldValue("imageUrl", imageUrl);
              }}
            />
          </ModalField>
        </FormSection>

        <FormSection
          icon={<FaIdCard size={14} />}
          title="Datos del propietario"
          description="Información de la persona asociada al terreno."
        >
          <ModalField label="Propietario" htmlFor="edit-property-owner-name">
            <TextField
              id="edit-property-owner-name"
              name="ownerName"
              value={formik.values.ownerName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Ej. Valeria Gómez"
              error={Boolean(getFieldError("ownerName"))}
              helperText={getFieldError("ownerName")}
              disabled={disabled}
              fullWidth
              sx={fieldStyles}
            />
          </ModalField>

          <Box sx={twoColumnsStyles}>
            <ModalField label="Número de identificación" htmlFor="edit-property-identification-number">
              <TextField
                id="edit-property-identification-number"
                name="identificationNumber"
                value={formik.values.identificationNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Ej. 001-010190-0001A"
                helperText={getFieldError("identificationNumber")}
                disabled={disabled}
                fullWidth
                sx={fieldStyles}
              />
            </ModalField>

            <ModalField label="Documento de identificación" htmlFor="edit-property-identification-image">
              <ImageUploadField
                label="Foto del documento"
                value={formik.values.identificationImageUrl ?? ""}
                disabled={disabled}
                onChange={(imageUrl) => {
                  void formik.setFieldValue("identificationImageUrl", imageUrl);
                }}
              />
            </ModalField>
          </Box>
        </FormSection>

        <FormSection
          icon={<FaSave size={14} />}
          title="Siguiente pago"
          description="Programa la fecha del próximo pago."
        >
          <Box
            sx={{
              width: {
                xs: "100%",
                sm: "calc(50% - 8px)",
              },
            }}
          >
            <ModalField label="Próximo pago" htmlFor="edit-property-next-payment-date">
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
                  disabled={disabled}
                  format="DD/MM/YYYY"
                  slotProps={{
                    textField: {
                      id: "edit-property-next-payment-date",
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
      </Box>
    </FormModal>
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
