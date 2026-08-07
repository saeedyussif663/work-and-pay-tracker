export const TOKEN_KEY = "work_pay_token";
export const USER_KEY = "work_pay_user";

export interface User {
  id: string;
  name: string;
  email: string;
}

export type AuthContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
  token: string | null;
  setToken: (token: string | null, expiry?: Date) => void;
  isAuthenticated: boolean;
};
