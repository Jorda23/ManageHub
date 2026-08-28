const renderSaleWindow = (windowRef: Window, title: string, bodyInnerHtml: string): void => {
  windowRef.document.open();

  windowRef.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>${title}</title>
      </head>

      <body
        style="
          font-family: Arial, sans-serif;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          margin: 0;
        "
      >
        <div>
          ${bodyInnerHtml}
        </div>
      </body>
    </html>
  `);

  windowRef.document.close();
};

export const renderSaleInvoiceProcessing = (windowRef: Window): void => {
  renderSaleWindow(windowRef, "Procesando venta...", "<h2>Registrando venta...</h2>");
};

export const renderSaleInvoiceError = (windowRef: Window): void => {
  renderSaleWindow(
    windowRef,
    "Error generando recibo",
    `
      <h2>Venta registrada correctamente</h2>

      <p>
        La venta fue guardada, pero ocurrió
        un error generando el recibo.
      </p>
    `,
  );
};
