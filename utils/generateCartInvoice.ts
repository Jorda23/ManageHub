import { formatCurrency } from "@/shared";
import { BUSINESS_CONFIG } from "@/shared/config/business.config";
import type { RegisterInvoiceResponse } from "@/shared/types/api.types";
import { downloadHtmlAsPdf } from "./downloadPdf";

const escapeHtml = (value: string): string =>
  value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");

export async function downloadCartInvoicePdf(
  invoice: RegisterInvoiceResponse,
  module: "hardware" | "grains",
): Promise<void> {
  const label = module === "hardware" ? "Ferretería" : "Granos básicos";
  const rows = invoice.items
    .map(
      (item) => `
    <tr>
      <td>${escapeHtml(item.productName)}${item.productCode ? `<small>${escapeHtml(item.productCode)}</small>` : ""}</td>
      <td>${item.quantity}${item.unit ? ` ${escapeHtml(item.unit)}` : ""}</td>
      <td>${formatCurrency(item.unitPrice, item.currency)}</td>
      <td>${formatCurrency(item.total, item.currency)}</td>
    </tr>
  `,
    )
    .join("");

  const html = `
    <main style="font-family:Arial,sans-serif;color:#142033;padding:24px">
      <header style="display:flex;justify-content:space-between;border-bottom:2px solid #1d4ed8;padding-bottom:18px">
        <div>
          <h1 style="margin:0;color:#164c38">${escapeHtml(BUSINESS_CONFIG.name)}</h1>
          <p style="margin:8px 0 0;color:#64748b">${label} · ${escapeHtml(BUSINESS_CONFIG.activity)}</p>
          <p style="margin:5px 0 0;color:#64748b">${escapeHtml(BUSINESS_CONFIG.phones.tigo)} · ${escapeHtml(BUSINESS_CONFIG.phones.claro)}</p>
        </div>
        <div style="text-align:right">
          <strong>FACTURA</strong>
          <div style="font-size:20px;font-weight:bold;margin-top:8px">${escapeHtml(invoice.invoiceNumber)}</div>
          <div style="margin-top:6px">${new Date(invoice.createdAt).toLocaleString("es-NI")}</div>
        </div>
      </header>
      <table style="width:100%;border-collapse:collapse;margin-top:24px">
        <thead><tr style="background:#f1f5f9;text-align:left">
          <th style="padding:12px">Producto</th><th style="padding:12px">Cantidad</th>
          <th style="padding:12px">Precio</th><th style="padding:12px">Importe</th>
        </tr></thead>
        <tbody>${rows}</tbody>
      </table>
      <section style="margin:24px 0 0 auto;width:280px;border-top:1px solid #cbd5e1;padding-top:14px">
        <div style="display:flex;justify-content:space-between;margin-bottom:8px"><span>Pago</span><strong>${escapeHtml(invoice.paymentMethod)}</strong></div>
        <div style="display:flex;justify-content:space-between;font-size:20px;color:#1d4ed8"><strong>Total</strong><strong>${formatCurrency(invoice.total, invoice.currency)}</strong></div>
      </section>
      <footer style="margin-top:40px;text-align:center;color:#64748b">Gracias por su compra</footer>
    </main>
  `;

  await downloadHtmlAsPdf(html, `${invoice.invoiceNumber}.pdf`);
}
