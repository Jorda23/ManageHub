import { formatCurrency } from "@/shared";
import { BUSINESS_CONFIG } from "@/shared/config/business.config";
import type { Currency, RegisterInvoiceResponse } from "@/shared/types/api.types";
import { downloadHtmlAsPdf } from "./downloadPdf";

export type ProductInvoiceDocument = {
  invoiceNumber: string;
  createdAt: string;
  items: Array<{
    productName: string;
    productCode?: string;
    unit?: string;
    quantity: number;
    unitPrice: number;
    total: number;
    currency: Currency;
  }>;
  total: number;
  currency: Currency;
  paymentMethod: string;
};

const escapeHtml = (value: string): string =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

export function buildCartInvoiceHtml(
  invoice: ProductInvoiceDocument,
  module: "hardware" | "grains",
  preliminary = false,
): string {
  const label = module === "hardware" ? "Ferretería" : "Granos básicos";
  const rows = invoice.items
    .map(
      (item) => `
        <tr>
          <td data-label="Producto"><strong>${escapeHtml(item.productName)}</strong>${item.productCode ? `<small>${escapeHtml(item.productCode)}</small>` : ""}</td>
          <td class="numeric" data-label="Cantidad">${item.quantity}${item.unit ? ` ${escapeHtml(item.unit)}` : ""}</td>
          <td class="numeric" data-label="Precio unitario">${formatCurrency(item.unitPrice, invoice.currency)}</td>
          <td class="numeric amount" data-label="Importe">${formatCurrency(item.total, invoice.currency)}</td>
        </tr>
      `,
    )
    .join("");

  return `
    <style>
      * { box-sizing: border-box; }
      .invoice { width: 100%; padding: 36px 40px; background: #fff; color: #17263f; font-family: Arial, sans-serif; }
      .topline { height: 7px; margin: -36px -40px 30px; background: linear-gradient(90deg, #17376f 0 72%, #07836f 72%); }
      .header { display: flex; justify-content: space-between; align-items: flex-start; gap: 24px; padding-bottom: 24px; border-bottom: 1px solid #dce4ef; }
      .brand { font-size: 23px; line-height: 1.15; letter-spacing: -.04em; font-weight: 800; color: #17376f; }
      .module { margin-top: 8px; color: #087966; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: .11em; }
      .contact { margin-top: 13px; color: #69778d; font-size: 11px; }
      .invoiceMeta { min-width: 175px; text-align: right; }
      .badge { display: inline-block; padding: 6px 9px; border-radius: 4px; background: ${preliminary ? "#fff3d6" : "#e8f5f1"}; color: ${preliminary ? "#8a5a00" : "#087966"}; font-size: 9px; font-weight: 800; letter-spacing: .09em; }
      .number { margin-top: 10px; font-size: 17px; font-weight: 800; }
      .date { margin-top: 6px; color: #69778d; font-size: 11px; }
      .notice { margin: 20px 0 0; padding: 10px 12px; background: #fff9eb; border-left: 3px solid #e8b84c; color: #765415; font-size: 11px; }
      table { width: 100%; margin-top: 26px; border-collapse: collapse; font-size: 11px; }
      th { padding: 11px 9px; background: #f1f5fa; color: #52627b; text-align: left; font-size: 9px; text-transform: uppercase; letter-spacing: .08em; }
      td { padding: 13px 9px; border-bottom: 1px solid #e6ebf2; vertical-align: top; }
      td small { display: block; margin-top: 4px; color: #7b8799; }
      .numeric { text-align: right; white-space: nowrap; }
      .amount { font-weight: 700; }
      .summary { width: 270px; margin: 22px 0 0 auto; }
      .payment { display: flex; justify-content: space-between; padding: 9px 0 13px; border-bottom: 1px solid #e6ebf2; color: #64738a; font-size: 11px; }
      .payment strong { color: #17263f; }
      .total { display: flex; justify-content: space-between; align-items: baseline; gap: 18px; padding-top: 15px; color: #17376f; font-size: 13px; font-weight: 800; }
      .total strong { font-size: 22px; white-space: nowrap; }
      footer { margin-top: 42px; padding-top: 14px; border-top: 1px solid #e6ebf2; text-align: center; color: #718097; font-size: 10px; }
      @media (max-width: 600px) {
        .invoice { padding: 24px 20px; }
        .topline { margin: -24px -20px 22px; }
        .header { gap: 12px; }
        .brand { font-size: 18px; }
        .invoiceMeta { min-width: 130px; }
        table, tbody { display: block; width: 100%; }
        thead { display: none; }
        tbody tr { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: 8px 12px; padding: 12px 0; border-bottom: 1px solid #e6ebf2; }
        tbody td { min-width: 0; padding: 0; border: 0; white-space: normal; }
        tbody td:first-child { grid-column: 1 / -1; font-size: 12px; }
        tbody td:not(:first-child) { display: flex; flex-direction: column; gap: 3px; text-align: left; font-size: 10px; }
        tbody td:not(:first-child)::before { content: attr(data-label); color: #7b8799; font-size: 8px; font-weight: 700; text-transform: uppercase; letter-spacing: .06em; }
        tbody td.amount { color: #17376f; font-size: 11px; font-weight: 800; }
        .summary { width: min(270px, 100%); }
      }
    </style>
    <main class="invoice">
      <div class="topline"></div>
      <header class="header">
        <div>
          <div class="brand">${escapeHtml(BUSINESS_CONFIG.name)}</div>
          <div class="module">${label}</div>
          <div class="contact">Tigo ${escapeHtml(BUSINESS_CONFIG.phones.tigo)} &nbsp;·&nbsp; Claro ${escapeHtml(BUSINESS_CONFIG.phones.claro)}</div>
        </div>
        <div class="invoiceMeta">
          <span class="badge">${preliminary ? "PREFACTURA" : "FACTURA"}</span>
          <div class="number">${escapeHtml(invoice.invoiceNumber)}</div>
          <div class="date">${invoice.createdAt ? escapeHtml(new Date(invoice.createdAt).toLocaleString("es-NI")) : ""}</div>
        </div>
      </header>
      ${preliminary ? '<div class="notice">Documento preliminar. La venta todavía no ha sido registrada.</div>' : ""}
      <table>
        <thead><tr><th>Producto</th><th class="numeric">Cantidad</th><th class="numeric">Precio unitario</th><th class="numeric">Importe</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
      <section class="summary">
        <div class="payment"><span>Método de pago</span><strong>${escapeHtml(invoice.paymentMethod)}</strong></div>
        <div class="total"><span>Total ${invoice.currency}</span><strong>${formatCurrency(invoice.total, invoice.currency)}</strong></div>
      </section>
      <footer>Gracias por su compra</footer>
    </main>
  `;
}

export async function downloadCartInvoicePdf(
  invoice: RegisterInvoiceResponse,
  module: "hardware" | "grains",
): Promise<void> {
  await downloadHtmlAsPdf(buildCartInvoiceHtml(invoice, module), `${invoice.invoiceNumber}.pdf`);
}

export async function downloadPreInvoicePdf(
  invoice: ProductInvoiceDocument,
  module: "hardware" | "grains",
): Promise<void> {
  await downloadHtmlAsPdf(
    buildCartInvoiceHtml(invoice, module, true),
    `PREFACTURA-${module}-${Date.now()}.pdf`,
  );
}
