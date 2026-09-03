"use client";

import { useMemo } from "react";

import { useRegisterGrainSale } from "@/hook/useGrains";

import { registerGrainSaleSchema } from "@/validations";

import { downloadSaleInvoicePdf } from "@/utils";
import { normalizeCurrency } from "@/shared/utils/currency";

import { RegisterSaleForm, type SaleFormProduct } from "../RegisterSaleForm";

type RegisterGrainSaleFormProps<TProduct extends SaleFormProduct> = {
  products: TProduct[];
  productOptionLabel?: (product: TProduct) => string;
  productSummaryLabel?: (product: TProduct) => string;
  onRegistered?: () => void;
};

export function RegisterGrainSaleForm<TProduct extends SaleFormProduct>({
  products,
  productOptionLabel,
  productSummaryLabel,
  onRegistered,
}: Readonly<RegisterGrainSaleFormProps<TProduct>>) {
  const { mutateAsync: registerGrainSale } = useRegisterGrainSale();

  const schemaFactory = useMemo(() => (maxStock: number) => registerGrainSaleSchema(maxStock), []);

  const handleRegister = async (
    formValues: {
      productId: string;
      quantity: string;
      paymentMethod: string;
      currency: "USD" | "NIO";
    },
    product: TProduct,
  ): Promise<void> => {
    const safeCurrency = normalizeCurrency(formValues.currency);

    const sale = await registerGrainSale({
      productId: product.id,
      quantity: Number(formValues.quantity),
      paymentMethod: formValues.paymentMethod,
      currency: safeCurrency,
    });

    try {
      const invoiceNumber = sale?.id ? `REC-${sale.id}` : `REC-${Date.now()}`;

      await downloadSaleInvoicePdf({
        fileName: `${invoiceNumber}.pdf`,

        invoiceNumber,

        module: "grains",

        productName: sale?.productName ?? product.name,

        productCode: "code" in product ? String(product.code) : undefined,

        unit: sale?.unit ?? ("unit" in product ? String(product.unit) : undefined),

        quantity: sale?.quantity ?? Number(formValues.quantity),

        unitPrice: sale?.unitPrice ?? product.price,

        total: sale?.total ?? product.price * Number(formValues.quantity),

        paymentMethod: sale?.paymentMethod ?? formValues.paymentMethod,
        currency: sale?.currency ?? formValues.currency,

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
      onRegistered={onRegistered}
    />
  );
}
