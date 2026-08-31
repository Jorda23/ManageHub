import { formatCurrency } from "@/shared";

import { downloadHtmlAsPdf } from "./downloadPdf";

type PaymentInvoiceData = {
  invoiceNumber: string;
  propertyName: string;
  propertyCode?: string;
  buyerName: string;
  amount: number;
  paymentMethod: string;
  note?: string | null;
  totalPrice: number;
  previousPaid: number;
  paymentDate?: Date;
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

const buildPaymentInvoiceHtml = ({
  invoiceNumber,
  propertyName,
  propertyCode,
  buyerName,
  amount,
  paymentMethod,
  note,
  totalPrice,
  previousPaid,
  paymentDate = new Date(),
}: PaymentInvoiceData): string => {
  const totalPaid = previousPaid + amount;

  const pendingAmount = Math.max(totalPrice - totalPaid, 0);

  return `
    <div class="invoice">
      <div class="header">
        <div>
          <h1 class="brand">
            Recibo de pago
          </h1>

          <div class="subtitle">
            Comprobante de abono de propiedad
          </div>
        </div>

        <div class="invoice-info">
          <div class="invoice-label">
            Recibo
          </div>

          <div class="invoice-number">
            ${escapeHtml(invoiceNumber)}
          </div>
        </div>
      </div>

      <div class="content">
        <div class="section">
          <div class="section-title">
            Información del cliente
          </div>

          <div class="grid">
            <div>
              <div class="label">
                Cliente
              </div>

              <div class="value">
                ${escapeHtml(buyerName)}
              </div>
            </div>

            <div>
              <div class="label">
                Fecha
              </div>

              <div class="value">
                ${escapeHtml(formatDate(paymentDate))}
              </div>
            </div>

            <div>
              <div class="label">
                Propiedad
              </div>

              <div class="value">
                ${escapeHtml(propertyName)}
              </div>
            </div>

            ${
              propertyCode
                ? `
                  <div>
                    <div class="label">
                      Código
                    </div>

                    <div class="value">
                      ${escapeHtml(propertyCode)}
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
            Abono recibido
          </div>

          <div class="payment-amount">
            ${formatCurrency(amount)}
          </div>
        </div>

        <div class="section">
          <div class="section-title">
            Estado de cuenta
          </div>

          <table>
            <thead>
              <tr>
                <th>Concepto</th>
                <th>Monto</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>Valor total</td>

                <td>
                  ${formatCurrency(totalPrice)}
                </td>
              </tr>

              <tr>
                <td>Abonado anteriormente</td>

                <td>
                  ${formatCurrency(previousPaid)}
                </td>
              </tr>

              <tr>
                <td>Abono actual</td>

                <td>
                  ${formatCurrency(amount)}
                </td>
              </tr>

              <tr>
                <td>Total abonado</td>

                <td class="paid">
                  ${formatCurrency(totalPaid)}
                </td>
              </tr>

              <tr>
                <td>Saldo pendiente</td>

                <td class="pending">
                  ${formatCurrency(pendingAmount)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        ${
          note
            ? `
              <div class="note">
                <div class="label">
                  Nota
                </div>

                <div class="value">
                  ${escapeHtml(note)}
                </div>
              </div>
            `
            : ""
        }

        <div class="footer">
          Este documento sirve como comprobante
          del pago registrado.
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

      .paid {
        color: #16a34a;
      }

      .pending {
        color: #dc2626;
      }

      .note {
        margin-top: 24px;
        padding: 16px;
        background: #f8fafc;
        border-radius: 12px;
      }

      .footer {
        padding-top: 30px;
        color: #94a3b8;
        font-size: 11px;
        text-align: center;
      }
    </style>
  `;
};

type DownloadPaymentInvoicePdfParams = PaymentInvoiceData & {
  fileName: string;
};

export const downloadPaymentInvoicePdf = async ({
  fileName,
  ...data
}: DownloadPaymentInvoicePdfParams): Promise<void> => {
  const html = buildPaymentInvoiceHtml(data);

  await downloadHtmlAsPdf(html, fileName);
};
