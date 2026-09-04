import * as Yup from "yup";

export const addHardwareProductSchema = Yup.object({
  name: Yup.string().trim().required("Ingresa el nombre del producto"),

  detail: Yup.string().trim().required("Ingresa una descripción o presentación"),

  category: Yup.string().trim().required("Selecciona una categoría"),

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
      "minimum-stock",
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

  currency: Yup.string()
    .oneOf(["USD", "NIO"], "Seleccione una moneda válida: USD o NIO")
    .required("Seleccione una moneda válida: USD o NIO"),

  inventoryStatus: Yup.string().required("Selecciona el estado del inventario"),

  imageUrl: Yup.string().trim(),
});
