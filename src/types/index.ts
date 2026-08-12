export interface SignupResponse {
  message: string;
  data: {
    email: string;
    name: string;
    id: number;
    createdAt: Date;
    updatedAt: Date;
  };
}

export interface SignInResponse {
  message: string;
  data: User;
}

export interface User {
  email: string;
  name: string;
  id: number;
  createdAt: Date;
  updatedAt: Date;
  token: string;
  expiresAt: Date;
}

export type AuthContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
  token: string | null;
  setToken: (token: string | null, expiry?: Date) => void;
  isAuthenticated: boolean;
};

export type Vehicle = {
  id: number;
  name: string;
  rider: string;
  startDate: Date;
  cost: number;
  expectedReturn: number;
  weeklyAmount: number;
  expectedCompletionDate: null | Date;
  createdAt: Date;
  updatedAt: Date;
  owner: string;
  totalPaid: number;
  amountRemaining: number;
  projectedCompletionDate: Date;
  status: "On track" | "Behind" | "Completed";
};

export interface VehicleResponse {
  message: string;
  data: Vehicle[];
  metadata: ResponseMetadata;
}

export type Payment = {
  id: number;
  amount: number;
  paidAt: string;
  vehicleName: string;
  riderName: string;
};

export interface PaymentDetail extends Payment {
  totalPaid: number;
  amountRemaining: number;
  projectedCompletionDate: string;
  status: string;
}

export interface PaymentsResponse {
  message: string;
  data: Payment[];
  metadata: ResponseMetadata;
}

export interface CreatePaymentResponse {
  message: string;
  data: {
    id: number;
    amount: number;
    paidAt: number;
    vehicleName: string;
    riderName: string;
    totalPaid: number;
    amountRemaining: number;
    projectedCompletionDate: Date;
    status: "On track" | "Behind" | "Completed";
  };
}

type ResponseMetadata = {
  currentPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  numberOfPages: number;
  total: number;
};

type StatFormat = "number" | "currency";

type Stat = {
  label: string;
  value: number;
  format: StatFormat;
};

export interface DashboardStatsResponse {
  message: string;
  data: Stat[];
}

interface MonthlyPayment {
  month: string;
  total: number;
}

export type MonthlyPaymentResponse = MonthlyPayment[];
