import type { ForgotPasswordFormValues } from "@/pages/ForgotPassword";
import type { ResetPasswordFormValues } from "@/pages/ResetPassword";
import type { SignInFormValues } from "@/pages/SignIn";
import type { SignupFormValues } from "@/pages/SignUp";
import type { SignInResponse, SignupResponse } from "@/types";
import http from "./http";

export async function signUpMutation(data: SignupFormValues) {
  const res = await http.post<SignupResponse, SignupFormValues>(
    "auth/signup",
    data,
  );
  return res;
}

export async function signInMutation(data: SignInFormValues) {
  const res = await http.post<SignInResponse, SignInFormValues>(
    "auth/signin",
    data,
  );
  return res;
}

export async function forgotPasswordMutation(data: ForgotPasswordFormValues) {
  const res = await http.post<{ message: string }, ForgotPasswordFormValues>(
    "auth/forgot-password",
    data,
  );
  return res;
}

export async function resetPasswordMutation(data: ResetPasswordFormValues) {
  const res = await http.update<{ message: string }, ResetPasswordFormValues>(
    "auth/reset-password",
    data,
  );
  return res;
}
