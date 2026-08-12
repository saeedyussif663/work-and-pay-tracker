import type { DashboardStatsResponse, MonthlyPaymentResponse } from "@/types";
import http from "./http";

export async function getDashboardStats() {
  const res = await http.get<DashboardStatsResponse>("dashboard/stats");
  return res.data;
}

export async function getMonthlyPayments() {
  const res = await http.get<MonthlyPaymentResponse>(
    "dashboard/monthly-payments",
  );
  return res;
}
