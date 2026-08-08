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
