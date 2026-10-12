import * as yup from "yup";

export const addPropertySchema = yup.object({
  name: yup.string().trim().required("Ingresa el nombre de la propiedad"),

  projectName: yup.string().trim().required("Ingresa el nombre del proyecto"),

  measure: yup.string().trim().required("Ingresa la medida de la propiedad"),

  location: yup.string().trim().required("Ingresa la ubicación"),

  ownerName: yup.string().trim().required("Ingresa el nombre del propietario"),

  identificationNumber: yup.string().trim().required("Ingresa el número de identificación"),

  identificationImageUrl: yup.string().default(""),

  imageUrl: yup.string().default(""),

  paymentDayOfMonth: yup
    .number()
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .nullable()
    .integer("Ingresa un día entero")
    .min(1, "El día debe estar entre 1 y 31")
    .max(31, "El día debe estar entre 1 y 31")
    .default(null),

  totalPrice: yup
    .string()
    .required("Ingresa el precio total")
    .test("valid-total-price", "Ingresa un precio total mayor que cero", (value) => {
      const amount = Number(value);

      return Number.isFinite(amount) && amount > 0;
    }),

  currency: yup
    .string()
    .oneOf(["USD", "NIO"], "Seleccione una moneda valida: USD o NIO")
    .required("Seleccione una moneda valida: USD o NIO"),

  initialPayment: yup
    .string()
    .default("")
    .test("valid-initial-payment", "Ingresa un abono inicial válido", (value) => {
      const amount = Number(value || "0");

      return Number.isFinite(amount) && amount >= 0;
    })
    .test(
      "initial-payment-not-greater-than-total",
      "El abono inicial no puede ser mayor al precio total",
      function (value) {
        const initialPayment = Number(value || "0");
        const totalPrice = Number(this.parent.totalPrice);

        if (!Number.isFinite(totalPrice)) {
          return true;
        }

        return initialPayment <= totalPrice;
      },
    ),
});

export type AddPropertyFormValues = yup.InferType<typeof addPropertySchema>;
