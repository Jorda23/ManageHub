import * as yup from "yup";

export const registerPropertyPaymentSchema = yup.object({
  propertyId: yup.string().required("Selecciona una propiedad"),

  amount: yup
    .string()
    .required("Ingresa el monto del abono")
    .test("valid-amount", "Ingresa un monto de abono mayor a cero", (value) => {
      const amount = Number(value);

      return Number.isFinite(amount) && amount > 0;
    }),

  paymentMethod: yup.string().required("Selecciona un método de pago"),

  currency: yup
    .mixed<"USD" | "NIO">()
    .oneOf(["USD", "NIO"], "Seleccione una moneda válida: USD o NIO")
    .required("Seleccione una moneda válida: USD o NIO"),

  note: yup.string().default(""),
});

export type RegisterPropertyPaymentFormValues = yup.InferType<typeof registerPropertyPaymentSchema>;
