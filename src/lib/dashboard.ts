import type { PaymentActivity } from "@/components/dashboard/recent-activity";
import type {
  DashboardStatsResponse,
  MonthlyPaymentResponse,
  RiderStatsResponse,
} from "@/types";
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

export async function getRiderStats() {
  const res = await http.get<RiderStatsResponse>("dashboard/rider-stats");
  return res;
}

export async function getRecentPayments() {
  const res = await http.get<PaymentActivity[]>("dashboard/recent-payments");
  return res;
}
