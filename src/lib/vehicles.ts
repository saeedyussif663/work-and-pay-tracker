import http from "@/lib/http";
import type { Vehicle, VehicleResponse } from "@/types";

export interface VehiclePayload {
  name: string;
  rider: string;
  startDate: string;
  cost: number;
  expectedReturn: number;
  weeklyAmount: number;
}

interface GetVehiclesParams {
  page: number;
  limit: number;
  search?: string;
}

export async function getVehicles({ page, limit, search }: GetVehiclesParams) {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });

  if (search) params.set("search", search);

  return http.get<VehicleResponse>(`vehicles?${params.toString()}`);
}

export async function addVehicle(data: VehiclePayload) {
  return http.post<{ message: string; data: Vehicle }, VehiclePayload>(
    "vehicles",
    data,
  );
}

export async function updateVehicle(vehicleId: number, data: VehiclePayload) {
  return http.update<{ message: string; data: Vehicle }, VehiclePayload>(
    `vehicles/${vehicleId}`,
    data,
  );
}

export async function deleteVehicle(vehicleId: number) {
  return http.destroy<{ message: string }, Record<string, never>>(
    `vehicles/${vehicleId}`,
    {},
  );
}
