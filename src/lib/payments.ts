import type {
  AddPaymentInput,
  GetPaymentsParams,
  PaymentDetail,
  PaymentsResponse,
  VehicleOption,
} from "@/types";
import http from "./http";

export async function getPayments({
  page,
  limit,
  search,
}: GetPaymentsParams) {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });

  if (search) params.set("search", search);

  return http.get<PaymentsResponse>(`payments?${params.toString()}`);
}

export async function getPaymentVehicleOptions() {
  return http.get<{ message: string; data: VehicleOption[] }>("vehicles/list");
}

export async function addPayment({ vehicleId, amount }: AddPaymentInput) {
  return http.post<
    { message: string; data: PaymentDetail },
    { amount: number }
  >(`payments/${vehicleId}`, { amount });
}
