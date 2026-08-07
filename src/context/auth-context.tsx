import { createContext } from "react";

import { type AuthContextType } from "./auth-constants";

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);
