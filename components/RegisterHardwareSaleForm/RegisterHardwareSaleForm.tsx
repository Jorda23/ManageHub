"use client";

import { useMemo } from "react";

import { useRegisterHardwareSale } from "@/hook/useHardware";

import { registerHardwareSaleSchema } from "@/validations";

import { downloadSaleInvoicePdf } from "@/utils";

import { RegisterSaleForm, type SaleFormProduct } from "../RegisterSaleForm";

type RegisterHardwareSaleFormProps<TProduct extends SaleFormProduct> = {
  products: TProduct[];
  productOptionLabel?: (product: TProduct) => string;
  productSummaryLabel?: (product: TProduct) => string;
};

export function RegisterHardwareSaleForm<TProduct extends SaleFormProduct>({
  products,
  productOptionLabel,
  productSummaryLabel,
}: Readonly<RegisterHardwareSaleFormProps<TProduct>>) {
  const { mutateAsync: registerHardwareSale } = useRegisterHardwareSale();

  const schemaFactory = useMemo(
    () => (maxStock: number) => registerHardwareSaleSchema(maxStock),
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
    const sale = await registerHardwareSale({
      productId: product.id,
      quantity: Number(formValues.quantity),
      paymentMethod: formValues.paymentMethod,
    });

    try {
      const invoiceNumber = sale?.id ? `REC-${sale.id}` : `REC-${Date.now()}`;

      await downloadSaleInvoicePdf({
        fileName: `${invoiceNumber}.pdf`,

        invoiceNumber,

        module: "hardware",

        productName: sale?.productName ?? product.name,

        productCode: "code" in product ? String(product.code) : undefined,

        quantity: sale?.quantity ?? Number(formValues.quantity),

        unitPrice: sale?.unitPrice ?? product.price,

        total: sale?.total ?? product.price * Number(formValues.quantity),

        paymentMethod: sale?.paymentMethod ?? formValues.paymentMethod,

        saleDate: sale?.createdAt ? new Date(sale.createdAt) : new Date(),
      });
    } catch (error) {
      console.error("Error generando recibo:", error);

      throw new Error("La venta fue registrada, pero no se pudo generar el recibo.");
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
