import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { TOKEN_KEY } from "@/context/auth-constants";
import { useAuth } from "@/hooks/use-auth";
import { signInMutation } from "@/lib/auth";
import { successStyle } from "@/lib/http";
import token from "@/lib/token";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import z from "zod/v4";

const formSchema = z.object({
  email: z.email("Email must be a valid email address."),
  password: z.string().min(1, "Password is required."),
});

export type SignInFormValues = z.infer<typeof formSchema>;

export default function SignIn() {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const form = useForm<SignInFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: signInMutation,
    onSuccess: (data) => {
      if (data) {
        token.set(TOKEN_KEY, data.data.token, data.data.expiresAt);

        setUser(data.data);
        toast.success(data.message, { style: successStyle });
        navigate("/dashboard");
      }
    },
  });

  function onSubmit(data: SignInFormValues) {
    mutate(data);
  }

  return (
    <section className="w-full min-h-screen md:max-w-80 mx-auto flex flex-col px-4 justify-center md:py-8">
      <article className="self-start text-foreground">
        <h3 className="font-heading font-bold text-lg tracking-tightest">
          Sign in to Work &amp; Pay
        </h3>
        <div>
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="ml-1.5 font-semibold text-primary hover:text-primary/80"
          >
            Sign Up
          </Link>
        </div>
      </article>

      {/* <article className="w-full space-y-6 mt-1.5">
        <div className="cursor-pointer w-full py-2 flex gap-2 items-center text-foreground font-mono text-xs tracking-wide font-medium justify-center bg-card border border-border rounded-lg hover:bg-muted transition-colors">
          <img src="/google-logo.png" alt="google-logo" className="size-3" />
          Continue with Google
        </div>

        <div className="flex items-center gap-8">
          <div className="flex-1 h-px bg-border"></div>
          <p className="font-mono text-xs tracking-wide text-muted-foreground">
            or
          </p>
          <div className="flex-1 h-px bg-border"></div>
        </div>
      </article> */}

      <form
        id="signin"
        className="w-full"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FieldGroup className="gap-3">
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="gap-1">
                <FieldLabel
                  htmlFor="signin-email"
                  className="font-mono text-xs tracking-wide text-foreground font-medium"
                >
                  Email
                </FieldLabel>
                <Input
                  {...field}
                  id="signin-email"
                  type="email"
                  aria-invalid={fieldState.invalid}
                  placeholder="you@example.com"
                  autoComplete="email"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="gap-1">
                <FieldLabel
                  htmlFor="signin-password"
                  className="font-mono text-xs tracking-wide text-foreground font-medium"
                >
                  Password
                </FieldLabel>
                <Input
                  {...field}
                  id="signin-password"
                  type="password"
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>

        <Button type="submit" className="mt-4 w-full" isLoading={isPending}>
          Sign in
        </Button>

        <div className="mt-3 text-center text-sm text-foreground">
          Forgot password?{" "}
          <Link
            to="/forgot-password"
            className="ml-3 font-semibold text-primary hover:text-primary/80"
          >
            Reset
          </Link>
        </div>
      </form>
    </section>
  );
}
