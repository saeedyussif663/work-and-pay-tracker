import type { DashboardStatsResponse } from "@/types";
import http from "./http";

export async function getDashboardStats() {
  const res = await http.get<DashboardStatsResponse>("dashboard/stats");
  return res.data;
}
