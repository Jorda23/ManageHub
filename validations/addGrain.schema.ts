import * as Yup from "yup";

export const addGrainSchema = Yup.object({
  name: Yup.string().trim().required("Ingresa el nombre del producto"),

  unit: Yup.string().trim().required("Selecciona una unidad"),

  location: Yup.string().trim().required("Ingresa la ubicación"),

  initialStock: Yup.number()
    .transform((value, originalValue) => {
      return originalValue === "" ? undefined : value;
    })
    .typeError("Ingresa un stock inicial válido")
    .min(0, "El stock inicial no puede ser negativo")
    .required("Ingresa un stock inicial válido"),

  minimumStock: Yup.number()
    .transform((value, originalValue) => {
      return originalValue === "" ? undefined : value;
    })
    .typeError("Ingresa un stock mínimo válido")
    .min(0, "El stock mínimo no puede ser negativo")
    .required("Ingresa un stock mínimo válido")
    .test(
      "minimum-stock-not-greater-than-initial",
      "No puede superar el stock inicial",
      function validateMinimumStock(value) {
        const initialStock = Number(this.parent.initialStock);

        if (value === undefined || Number.isNaN(initialStock)) {
          return true;
        }

        return value <= initialStock;
      },
    ),

  unitPrice: Yup.number()
    .transform((value, originalValue) => {
      return originalValue === "" ? undefined : value;
    })
    .typeError("Ingresa un precio válido")
    .moreThan(0, "Ingresa un precio mayor que cero")
    .required("Ingresa un precio mayor que cero"),

  imageUrl: Yup.string().trim(),
});
