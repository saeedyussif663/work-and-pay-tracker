import { TOKEN_KEY } from "@/context/auth-constants";
import { redirect } from "react-router-dom";
import token from "./token";

export function checkAuth() {
  const authToken = token.get(TOKEN_KEY);
  if (!authToken) throw redirect("/signin");
}
