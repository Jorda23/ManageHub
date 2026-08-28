"use client";

import { useMemo } from "react";

import { useRegisterGrainSale } from "@/hook/useGrains";

import { registerGrainSaleSchema } from "@/validations";

import {
  generateSaleInvoice,
  renderSaleInvoiceError,
  renderSaleInvoiceProcessing,
} from "@/utils";

import {
  RegisterSaleForm,
  type SaleFormProduct,
} from "../RegisterSaleForm";

type RegisterGrainSaleFormProps<TProduct extends SaleFormProduct> = {
  products: TProduct[];
  productOptionLabel?: (product: TProduct) => string;
  productSummaryLabel?: (product: TProduct) => string;
};

export function RegisterGrainSaleForm<
  TProduct extends SaleFormProduct,
>({
  products,
  productOptionLabel,
  productSummaryLabel,
}: Readonly<RegisterGrainSaleFormProps<TProduct>>) {
  const { mutateAsync: registerGrainSale } = useRegisterGrainSale();

  const schemaFactory = useMemo(
    () => (maxStock: number) => registerGrainSaleSchema(maxStock),
    [],
  );

  const handleRegister = async (
    formValues: {
      productId: string;
      quantity: string;
      paymentMethod: string;
    },
    product: TProduct,
  ): Promise<void> => {
    const invoiceWindow = window.open("", "_blank", "width=900,height=900");

    if (!invoiceWindow) {
      throw new Error("El navegador bloqueó la ventana del recibo.");
    }

    renderSaleInvoiceProcessing(invoiceWindow);

    try {
      const sale = await registerGrainSale({
        productId: product.id,
        quantity: Number(formValues.quantity),
        paymentMethod: formValues.paymentMethod,
      });

      try {
        generateSaleInvoice({
          invoiceWindow,
          invoiceNumber: sale?.id ? `REC-${sale.id}` : `REC-${Date.now()}`,
          module: "grains",
          productName: sale?.productName ?? product.name,
          productCode: "code" in product ? String(product.code) : undefined,
          unit: sale?.unit ?? ("unit" in product ? String(product.unit) : undefined),
          quantity: sale?.quantity ?? Number(formValues.quantity),
          unitPrice: sale?.unitPrice ?? product.price,
          total: sale?.total ?? product.price * Number(formValues.quantity),
          paymentMethod: sale?.paymentMethod ?? formValues.paymentMethod,
          saleDate: sale?.createdAt ? new Date(sale.createdAt) : new Date(),
        });
      } catch (error) {
        console.error("Error generando recibo:", error);

        renderSaleInvoiceError(invoiceWindow);

        return;
      }
    } catch (error) {
      console.error("Error registrando venta:", error);

      invoiceWindow.close();

      throw new Error("No se pudo registrar la venta.");
    }
  };

  return (
    <RegisterSaleForm
      products={products}
      schemaFactory={schemaFactory}
      onRegister={handleRegister}
      productOptionLabel={productOptionLabel}
      productSummaryLabel={productSummaryLabel}
    />
  );
}
