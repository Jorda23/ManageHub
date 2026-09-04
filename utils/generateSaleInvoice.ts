import { formatCurrency } from "@/shared";
import { BUSINESS_CONFIG } from "@/shared/config/business.config";
import type { Currency } from "@/shared/types/api.types";

import { downloadHtmlAsPdf } from "./downloadPdf";

type SaleInvoiceData = {
  invoiceNumber: string;
  module: "hardware" | "grains";
  productName: string;
  productCode?: string;
  unit?: string;
  quantity: number;
  unitPrice: number;
  total: number;
  paymentMethod: string;
  currency: Currency;
  saleDate?: Date;
};

const moduleLabel: Record<"hardware" | "grains", string> = {
  hardware: "Ferretería",
  grains: "Granos",
};

const formatDate = (date: Date): string =>
  new Intl.DateTimeFormat("es-NI", {
    dateStyle: "long",
    timeStyle: "short",
  }).format(date);

const escapeHtml = (value: string): string =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

const buildSaleInvoiceHtml = ({
  invoiceNumber,
  module,
  productName,
  productCode,
  unit,
  quantity,
  unitPrice,
  total,
  paymentMethod,
  currency,
  saleDate = new Date(),
}: SaleInvoiceData): string => `
  <div class="invoice">
    <div class="header">
      <div>
        <h1 class="brand">
          ${escapeHtml(BUSINESS_CONFIG.name)}
        </h1>

        <div class="subtitle">
          ${escapeHtml(BUSINESS_CONFIG.activity)}
        </div>

        <div class="owner-info">
          Propietario: ${escapeHtml(BUSINESS_CONFIG.owner)}
        </div>

        <div class="contact-info">
          Tigo: ${escapeHtml(BUSINESS_CONFIG.phones.tigo)} | Claro: ${escapeHtml(BUSINESS_CONFIG.phones.claro)}
        </div>
      </div>

      <div class="invoice-info">
        <div class="invoice-label">
          Recibo de venta
        </div>

        <div class="invoice-number">
          ${escapeHtml(invoiceNumber)}
        </div>
      </div>
    </div>

    <div class="content">
      <div class="section">
        <div class="section-title">
          Información de la venta
        </div>

        <div class="grid">
          <div>
            <div class="label">
              Producto
            </div>

            <div class="value">
              ${escapeHtml(productName)}
            </div>
          </div>

          <div>
            <div class="label">
              Fecha
            </div>

            <div class="value">
              ${escapeHtml(formatDate(saleDate))}
            </div>
          </div>

          ${
            productCode
              ? `
                <div>
                  <div class="label">
                    Código
                  </div>

                  <div class="value">
                    ${escapeHtml(productCode)}
                  </div>
                </div>
              `
              : ""
          }

          <div>
            <div class="label">
              Método de pago
            </div>

            <div class="value">
              ${escapeHtml(paymentMethod)}
            </div>
          </div>
        </div>
      </div>

      <div class="payment">
        <div class="payment-title">
          Total a pagar
        </div>

        <div class="payment-amount">
          ${formatCurrency(total, currency)}
        </div>
      </div>

      <div class="section">
        <div class="section-title">
          Detalle
        </div>

        <table>
          <thead>
            <tr>
              <th>Concepto</th>
              <th>Importe</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>Precio unitario</td>

              <td>
                ${formatCurrency(unitPrice, currency)}
              </td>
            </tr>

            <tr>
              <td>
                Cantidad ${unit ? `(${escapeHtml(unit)})` : ""}
              </td>

              <td>
                ${quantity}
              </td>
            </tr>

            <tr class="total-row">
              <td>Total</td>

              <td>
                ${formatCurrency(total, currency)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="footer">
        Este documento sirve como comprobante
        de la venta registrada.
      </div>
    </div>
  </div>

  <style>
    * {
      box-sizing: border-box;
    }

    body {
      margin: 0;
      padding: 0;
      font-family: Arial, Helvetica, sans-serif;
      background: #ffffff;
      color: #0f172a;
    }

    .invoice {
      width: 100%;
      max-width: 800px;
      margin: 0 auto;
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 20px;
      overflow: hidden;
    }

    .header {
      padding: 32px 36px;
      background: #172554;
      color: #ffffff;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 24px;
    }

    .brand {
      margin: 0;
      font-size: 25px;
      font-weight: 800;
    }

    .subtitle {
      margin-top: 6px;
      font-size: 13px;
      opacity: 0.8;
    }

    .owner-info {
      margin-top: 8px;
      font-size: 12px;
      opacity: 0.9;
    }

    .contact-info {
      margin-top: 4px;
      font-size: 11px;
      opacity: 0.8;
    }

    .invoice-info {
      text-align: right;
    }

    .invoice-label {
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      opacity: 0.7;
    }

    .invoice-number {
      margin-top: 5px;
      font-size: 18px;
      font-weight: 800;
    }

    .content {
      padding: 36px;
    }

    .section {
      margin-bottom: 28px;
    }

    .section-title {
      margin-bottom: 14px;
      color: #64748b;
      font-size: 11px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.08em;
    }

    .grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 18px 32px;
    }

    .label {
      margin-bottom: 4px;
      color: #64748b;
      font-size: 12px;
    }

    .value {
      font-size: 14px;
      font-weight: 700;
    }

    .payment {
      margin: 30px 0;
      padding: 24px;
      background: #eff6ff;
      border: 1px solid #bfdbfe;
      border-radius: 16px;
    }

    .payment-title {
      color: #475569;
      font-size: 13px;
    }

    .payment-amount {
      margin-top: 5px;
      color: #1d4ed8;
      font-size: 30px;
      font-weight: 900;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 16px;
    }

    th,
    td {
      padding: 14px 12px;
      border-bottom: 1px solid #e2e8f0;
      font-size: 13px;
      text-align: right;
    }

    th:first-child,
    td:first-child {
      text-align: left;
    }

    th {
      color: #64748b;
      font-size: 11px;
      text-transform: uppercase;
    }

    td {
      font-weight: 700;
    }

    .total-row td {
      font-size: 15px;
      font-weight: 900;
      color: #1d4ed8;
      border-bottom: 0;
    }

    .footer {
      padding-top: 30px;
      color: #94a3b8;
      font-size: 11px;
      text-align: center;
    }
  </style>
`;

type DownloadSaleInvoicePdfParams = SaleInvoiceData & {
  fileName: string;
};

export const downloadSaleInvoicePdf = async ({
  fileName,
  ...data
}: DownloadSaleInvoicePdfParams): Promise<void> => {
  const html = buildSaleInvoiceHtml(data);

  await downloadHtmlAsPdf(html, fileName);
};
