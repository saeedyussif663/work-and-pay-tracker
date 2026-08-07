import type { AuthContextType } from "@/context/auth-constants";
import { AuthContext } from "@/context/auth-context";
import { useContext } from "react";

export const useAuth = (): AuthContextType => {
  const ctx = useContext(AuthContext);

  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return ctx;
};
