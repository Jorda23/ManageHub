import type { DashboardResponse } from "@/types/api.types";

const dashboardResponse: DashboardResponse = {
  summary: {
    salesToday: 22,
    monthlyIncome: 22,
    accountsReceivable: 0,
    openAccounts: 0,
    alertsCount: 1,
    salesVsYesterdayPercent: 100,
    monthlyVsPreviousMonthPercent: 100,
  },
  recentActivity: [
    {
      type: "hardware-sale",
      title: "MARTYILLO",
      subtitle: "1.00 units | Efectivo",
      amount: 10,
      createdAt: "2026-08-11T20:16:36.137125Z",
    },
    {
      type: "grain-sale",
      title: "maiz",
      subtitle: "1.00 Quintal | Efectivo",
      amount: 12,
      createdAt: "2026-08-11T20:15:47.968206Z",
    },
  ],
  cashFlow7Days: [
    {
      date: "2026-08-09T00:00:00Z",
      hardware: 0,
      grains: 0,
      properties: 0,
      total: 0,
    },
    {
      date: "2026-08-10T00:00:00Z",
      hardware: 0,
      grains: 0,
      properties: 0,
      total: 0,
    },
    {
      date: "2026-08-11T00:00:00Z",
      hardware: 10,
      grains: 12,
      properties: 0,
      total: 22,
    },
  ],
  alerts: [
    {
      group: "warning",
      code: "inventory-low",
      title: "Low inventory for 11",
      message: "There are 1.00 units left.",
      severity: "warning",
      imageUrl: null,
    },
  ],
};

export async function GET() {
  return Response.json(dashboardResponse);
}
