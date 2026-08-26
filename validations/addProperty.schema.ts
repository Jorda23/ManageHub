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

  nextPaymentDate: yup.string().default(""),

  totalPrice: yup
    .string()
    .required("Ingresa el precio total")
    .test("valid-total-price", "Ingresa un precio total mayor que cero", (value) => {
      const amount = Number(value);

      return Number.isFinite(amount) && amount > 0;
    }),

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
