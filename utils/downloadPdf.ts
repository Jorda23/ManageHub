import { jsPDF } from "jspdf";

import html2canvas from "html2canvas";

const INVOICE_WIDTH = 800;

const renderOffscreen = (html: string): HTMLElement => {
  const container = document.createElement("div");

  container.style.position = "fixed";

  container.style.left = "-10000px";

  container.style.top = "0";

  container.style.zIndex = "-1";

  container.style.width = `${INVOICE_WIDTH}px`;

  container.style.pointerEvents = "none";

  const padding = 48;

  container.style.padding = `${padding}px`;

  container.innerHTML = html;

  document.body.appendChild(container);

  return container;
};

const cleanup = (container: HTMLElement): void => {
  if (container.parentElement) {
    container.parentElement.removeChild(container);
  }
};

export const downloadHtmlAsPdf = async (html: string, fileName: string): Promise<void> => {
  const container = renderOffscreen(html);

  try {
    const canvas = await html2canvas(container, {
      scale: 2,

      useCORS: true,

      backgroundColor: "#ffffff",

      logging: false,
    });

    const pdf = new jsPDF({
      orientation: "portrait",

      unit: "mm",

      format: "a4",
    });

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    const margin = 8;

    const contentWidth = pageWidth - margin * 2;
    const contentHeight = pageHeight - margin * 2;
    const pixelsPerPage = Math.floor((canvas.width * contentHeight) / contentWidth);

    for (let offsetY = 0; offsetY < canvas.height; offsetY += pixelsPerPage) {
      if (offsetY > 0) {
        pdf.addPage();
      }

      const sliceHeight = Math.min(pixelsPerPage, canvas.height - offsetY);
      const pageCanvas = document.createElement("canvas");
      pageCanvas.width = canvas.width;
      pageCanvas.height = sliceHeight;

      const context = pageCanvas.getContext("2d");
      if (!context) {
        throw new Error("No se pudo preparar una página de la factura.");
      }

      context.drawImage(
        canvas,
        0,
        offsetY,
        canvas.width,
        sliceHeight,
        0,
        0,
        canvas.width,
        sliceHeight,
      );

      const pageImage = pageCanvas.toDataURL("image/jpeg", 0.95);
      const imageHeight = (sliceHeight * contentWidth) / canvas.width;
      pdf.addImage(pageImage, "JPEG", margin, margin, contentWidth, imageHeight);
    }

    pdf.save(fileName);
  } finally {
    cleanup(container);
  }
};
