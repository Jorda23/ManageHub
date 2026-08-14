"use client";

import { useEffect, useMemo, useState } from "react";

import { Box } from "@mui/material";

import { FaClipboardCheck, FaFileContract, FaHome, FaMoneyBillWave } from "react-icons/fa";

import AppShell from "@/components/AppShell/AppShell";

import { AddPropertyModal, type AddPropertyFormValues } from "@/components/AddPropertyModal";

import { PaymentHistoryTable } from "@/components/PaymentHistoryTable";

import {
  colors,
  formatCurrency,
  getPendingAmount,
  paymentMethods,
  propertyConfig,
  type PaymentRecord,
  type PropertyItem,
  type PropertyMetric,
} from "./propertyWorkspaceData";

import {
  PropertyHeroHeader,
  PropertyMetricsGrid,
  PropertyPaymentSection,
  PropertyTerrainsSection,
} from "./components";

import {
  useCreateProperty,
  useProperties,
  usePropertyPayments,
  useRegisterPropertyPayment,
} from "@/hook/useProperties";
import { LoadingState } from "@/components/LoadingState";

export function PropertyWorkspace() {
  const {
    data: apiProperties = [],
    isLoading: isLoadingProperties,
    isError: isPropertiesError,
  } = useProperties();

  const {
    data: apiPayments = [],
    isLoading: isLoadingPayments,
    isError: isPaymentsError,
  } = usePropertyPayments();

  const { mutateAsync: createProperty, isPending: isCreatingProperty } = useCreateProperty();

  const { mutateAsync: registerPropertyPayment, isPending: isRegisteringPayment } =
    useRegisterPropertyPayment();

  const isLoading = isLoadingProperties || isLoadingPayments;

  const [selectedPropertyId, setSelectedPropertyId] = useState("");

  const [paymentAmount, setPaymentAmount] = useState("500");

  const [paymentMethod, setPaymentMethod] = useState(paymentMethods[0]);

  const [paymentNote, setPaymentNote] = useState("Abono de cuota");

  const [error, setError] = useState("");

  const [isPropertyDialogOpen, setIsPropertyDialogOpen] = useState(false);

  const properties = useMemo<PropertyItem[]>(() => {
    return apiProperties.map((property) => {
      const isPaid = property.status === "Paid";

      return {
        id: property.id,

        name: property.name,

        code: property.code,

        location: property.location,

        size: property.measure,

        price: property.totalPrice,

        paid: property.amountPaid,

        ownerName: property.ownerName,

        ownerPhone: "",

        ownerDocument: "",

        buyerName: property.ownerName,

        buyerEmail: "",

        dueDate: isPaid
          ? "Pagado"
          : property.nextPaymentDate
            ? new Date(property.nextPaymentDate).toLocaleDateString("es-NI")
            : "Sin fecha",

        status: isPaid ? "Pagado" : "Pendiente",

        accent: isPaid ? colors.green : colors.primaryLight,

        imageUrl: property.imageUrl ?? "",
      };
    });
  }, [apiProperties]);

  const payments = useMemo<PaymentRecord[]>(() => {
    return apiPayments.map((payment) => ({
      id: payment.id,

      propertyId: payment.propertyId,

      propertyName: payment.propertyName,

      buyerName: payment.ownerName,

      amount: payment.amount,

      method: payment.paymentMethod,

      date: new Date(payment.createdAt).toLocaleString("es-NI", {
        dateStyle: "short",
        timeStyle: "short",
      }),

      note: payment.note ?? "Sin nota",
    }));
  }, [apiPayments]);

  useEffect(() => {
    if (properties.length > 0 && !selectedPropertyId) {
      setSelectedPropertyId(properties[0].id);
    }
  }, [properties, selectedPropertyId]);

  useEffect(() => {
    if (
      selectedPropertyId &&
      properties.length > 0 &&
      !properties.some((property) => property.id === selectedPropertyId)
    ) {
      setSelectedPropertyId(properties[0].id);
    }
  }, [properties, selectedPropertyId]);

  const selectedProperty = useMemo(() => {
    return properties.find((property) => property.id === selectedPropertyId);
  }, [properties, selectedPropertyId]);

  const numericPaymentAmount = Number(paymentAmount);

  const totalPortfolioValue = useMemo(() => {
    return properties.reduce((total, property) => total + property.price, 0);
  }, [properties]);

  const totalPaid = useMemo(() => {
    return properties.reduce((total, property) => total + property.paid, 0);
  }, [properties]);

  const totalPending = useMemo(() => {
    return properties.reduce((total, property) => total + getPendingAmount(property), 0);
  }, [properties]);

  const paidAccounts = useMemo(() => {
    return properties.filter((property) => property.status === "Pagado").length;
  }, [properties]);

  const metrics: PropertyMetric[] = [
    {
      icon: <FaHome />,

      iconBg: colors.primarySoft,

      iconColor: colors.primaryLight,

      label: "Terrenos activos",

      value: properties.length.toString(),

      detail: "Captados por clientes",
    },

    {
      icon: <FaMoneyBillWave />,

      iconBg: colors.greenSoft,

      iconColor: colors.green,

      label: "Total abonado",

      value: formatCurrency(totalPaid),

      detail: "Pagos confirmados",
    },

    {
      icon: <FaFileContract />,

      iconBg: colors.orangeSoft,

      iconColor: colors.orange,

      label: "Saldo pendiente",

      value: formatCurrency(totalPending),

      detail: "Por cobrar",
    },

    {
      icon: <FaClipboardCheck />,

      iconBg: colors.purpleSoft,

      iconColor: colors.purple,

      label: "Cuentas pagadas",

      value: `${paidAccounts}/${properties.length}`,

      detail: formatCurrency(totalPortfolioValue),
    },
  ];

  const handleCreateProperty = async (formValues: AddPropertyFormValues): Promise<void> => {
    setError("");

    const totalPrice = Number(formValues.totalPrice);

    const initialPayment = Number(formValues.initialPayment || "0");

    if (Number.isNaN(totalPrice) || totalPrice <= 0) {
      setError("El precio total debe ser mayor que cero.");

      return;
    }

    if (Number.isNaN(initialPayment) || initialPayment < 0) {
      setError("El abono inicial debe ser válido.");

      return;
    }

    if (initialPayment > totalPrice) {
      setError("El abono inicial no puede ser mayor al precio total.");

      return;
    }

    try {
      const response = await createProperty({
        name: formValues.name.trim(),

        projectName: formValues.projectName.trim(),

        measure: formValues.measure.trim(),

        location: formValues.location.trim(),

        ownerName: formValues.ownerName.trim(),

        totalPrice,

        initialPayment,

        nextPaymentDate: formValues.nextPaymentDate
          ? new Date(`${formValues.nextPaymentDate}T00:00:00`).toISOString()
          : null,

        imageUrl: formValues.imageUrl.trim() || null,
      });

      setSelectedPropertyId(response.id);

      setIsPropertyDialogOpen(false);
    } catch {
      setError("No se pudo registrar la propiedad.");
    }
  };

  const handleRegisterPayment = async (): Promise<void> => {
    setError("");

    if (!selectedProperty) {
      setError("Selecciona una propiedad válida.");

      return;
    }

    if (Number.isNaN(numericPaymentAmount) || numericPaymentAmount <= 0) {
      setError("Ingresa un monto de abono mayor a cero.");

      return;
    }

    const pendingAmount = getPendingAmount(selectedProperty);

    if (pendingAmount <= 0) {
      setError("Esta cuenta ya está pagada en su totalidad.");

      return;
    }

    if (numericPaymentAmount > pendingAmount) {
      setError("El abono no puede ser mayor al saldo pendiente.");

      return;
    }

    try {
      await registerPropertyPayment({
        propertyId: selectedProperty.id,

        amount: numericPaymentAmount,

        paymentMethod,

        note: paymentNote.trim() || null,
      });

      setPaymentAmount("500");

      setPaymentNote("Abono de cuota");
    } catch {
      setError("No se pudo registrar el abono.");
    }
  };

  const handleDownloadPayments = (visiblePayments: PaymentRecord[]): void => {
    if (visiblePayments.length === 0) {
      return;
    }

    const headers = ["Fecha", "Propiedad", "Comprador", "Método", "Nota", "Monto"];

    const rows = visiblePayments.map((payment) => [
      payment.date,

      payment.propertyName,

      payment.buyerName,

      payment.method,

      payment.note,

      payment.amount.toFixed(2),
    ]);

    const csvContent = [headers, ...rows]
      .map((row) =>
        row
          .map((value) => {
            const escapedValue = String(value).replaceAll('"', '""');

            return `"${escapedValue}"`;
          })
          .join(","),
      )
      .join("\n");

    const blob = new Blob([`\uFEFF${csvContent}`], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;

    link.download = `historial-abonos-${new Date().toISOString().slice(0, 10)}.csv`;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  return (
    <AppShell active={propertyConfig.category}>
      {isLoading ? (
        <LoadingState message="Cargando módulo de propiedades..." />
      ) : (
        <Box
          sx={{
            width: "100%",
            minHeight: "calc(100vh - 48px)",
            px: {
              xs: 2,
              md: 4,
            },
            py: {
              xs: 2.5,
              md: 3,
            },
            bgcolor: colors.pageBg,
            color: colors.text,
          }}
        >
          <Box
            sx={{
              width: "100%",
              maxWidth: 1440,
              mx: "auto",
              display: "flex",
              flexDirection: "column",
              gap: 3,
            }}
          >
            <PropertyHeroHeader
              badge={propertyConfig.badge}
              title={propertyConfig.title}
              subtitle={propertyConfig.subtitle}
            />

            <PropertyMetricsGrid metrics={metrics} />

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  lg: "minmax(0, 2fr) minmax(340px, 1fr)",
                },
                gap: {
                  xs: 2,
                  md: 2.5,
                },
                alignItems: "start",
                width: "100%",
                minWidth: 0,
              }}
            >
              <PropertyTerrainsSection
                properties={properties}
                onAddProperty={() => {
                  setIsPropertyDialogOpen(true);
                }}
              />

              <PropertyPaymentSection
                selectedProperty={selectedProperty}
                properties={properties}
                selectedPropertyId={selectedPropertyId}
                paymentAmount={paymentAmount}
                paymentMethod={paymentMethod}
                paymentMethods={paymentMethods}
                paymentNote={paymentNote}
                error={error}
                onSelectedPropertyChange={setSelectedPropertyId}
                onPaymentAmountChange={setPaymentAmount}
                onPaymentMethodChange={setPaymentMethod}
                onPaymentNoteChange={setPaymentNote}
                onRegisterPayment={handleRegisterPayment}
              />
            </Box>

            <PaymentHistoryTable
              payments={payments}
              totalPaid={totalPaid}
              isLoading={isLoadingPayments}
              isError={isPaymentsError}
              onDownload={handleDownloadPayments}
            />

            <AddPropertyModal
              open={isPropertyDialogOpen}
              onClose={() => {
                if (!isCreatingProperty) {
                  setIsPropertyDialogOpen(false);
                }
              }}
              onSave={handleCreateProperty}
            />
          </Box>
        </Box>
      )}
    </AppShell>
  );
}
