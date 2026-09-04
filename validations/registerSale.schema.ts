import * as Yup from "yup";

export type RegisterSaleFormValues = {
  productId: string;
  quantity: string;
  paymentMethod: string;
  currency: "USD" | "NIO";
};

const createRegisterSaleSchema = (maxStock: number) =>
  Yup.object({
    productId: Yup.string().required("Selecciona un producto válido."),

    quantity: Yup.number()
      .transform((value, originalValue) => {
        return originalValue === "" ? undefined : value;
      })
      .typeError("Ingresa una cantidad mayor a cero.")
      .moreThan(0, "Ingresa una cantidad mayor a cero.")
      .test("sufficient-stock", "No hay suficiente inventario disponible.", (value) => {
        if (value === undefined) {
          return true;
        }

        return value <= maxStock;
      })
      .required("Ingresa una cantidad mayor a cero."),

    paymentMethod: Yup.string().required("Selecciona un método de pago."),

    currency: Yup.string()
      .oneOf(["USD", "NIO"], "Seleccione una moneda válida: USD o NIO")
      .required("Seleccione una moneda válida: USD o NIO"),
  });

export const registerHardwareSaleSchema = (maxStock: number) => createRegisterSaleSchema(maxStock);

export const registerGrainSaleSchema = (maxStock: number) => createRegisterSaleSchema(maxStock);
