import { jsPDF } from "jspdf";

import { getPendingAmount, type PropertyItem } from "@/shared/data/property.data";
import { formatCurrency } from "@/shared";

const PDF_MARGIN = 18;
const LINE_HEIGHT = 7;

function sanitizeFileName(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9-_]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase();
}

export function downloadPropertyPdf(property: PropertyItem): void {
  const pdf = new jsPDF({ unit: "mm", format: "a4" });
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const contentWidth = pageWidth - PDF_MARGIN * 2;
  let y = 50;

  const ensureSpace = (height: number): void => {
    if (y + height > pageHeight - PDF_MARGIN) {
      pdf.addPage();
      y = PDF_MARGIN;
    }
  };

  const addSection = (title: string): void => {
    ensureSpace(13);
    y += 4;
    pdf.setFillColor(239, 246, 255);
    pdf.roundedRect(PDF_MARGIN, y - 5, contentWidth, 9, 2, 2, "F");
    pdf.setTextColor(30, 64, 175);
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(10);
    pdf.text(title.toUpperCase(), PDF_MARGIN + 3, y + 1);
    y += 9;
  };

  const addField = (label: string, value: string | number | null | undefined): void => {
    const displayValue = value == null || value === "" ? "No registrado" : String(value);
    const lines = pdf.splitTextToSize(displayValue, contentWidth - 48) as string[];
    const height = Math.max(LINE_HEIGHT, lines.length * 5.5);
    ensureSpace(height + 2);
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(9);
    pdf.setTextColor(100, 116, 139);
    pdf.text(`${label}:`, PDF_MARGIN + 2, y);
    pdf.setFont("helvetica", "normal");
    pdf.setTextColor(15, 23, 42);
    pdf.text(lines, PDF_MARGIN + 50, y);
    y += height;
  };

  pdf.setFillColor(30, 64, 175);
  pdf.roundedRect(PDF_MARGIN, 14, contentWidth, 29, 3, 3, "F");
  pdf.setTextColor(255, 255, 255);
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(17);
  pdf.text("Ficha de propiedad", PDF_MARGIN + 6, 26);
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(9);
  pdf.text(`Código ${property.code}`, PDF_MARGIN + 6, 36);
  pdf.setFontSize(10);
  pdf.text(property.name, PDF_MARGIN + 6, 41, { maxWidth: contentWidth - 12 });

  addSection("Identificación de la propiedad");
  addField("Nombre", property.name);
  addField("Código", property.code);
  addField("Ubicación", property.location);
  addField("Medida", property.size);
  addField("Estado", property.status);
  addField("Día de pago mensual", property.paymentDayOfMonth);

  addSection("Cliente");
  addField("Nombre", property.ownerName || property.buyerName);
  addField("Correo electrónico", property.ownerEmail || property.buyerEmail);
  addField("Teléfono", property.ownerPhone);
  addField("Documento", property.ownerDocument);

  addSection("Resumen financiero");
  const currency = property.currency ?? "NIO";
  addField("Precio total", formatCurrency(property.price, currency));
  addField("Total abonado", formatCurrency(property.paid, currency));
  addField("Saldo pendiente", formatCurrency(getPendingAmount(property), currency));
  addField(
    "Avance de pago",
    `${property.price > 0 ? Math.round(Math.min(100, (property.paid / property.price) * 100)) : 0}%`,
  );

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(8);
  pdf.setTextColor(148, 163, 184);
  pdf.text(`Generado el ${new Date().toLocaleDateString("es-NI")}`, PDF_MARGIN, pageHeight - 10);

  const fileName = sanitizeFileName(property.name) || "propiedad";
  pdf.save(`propiedad-${fileName}.pdf`);
}
