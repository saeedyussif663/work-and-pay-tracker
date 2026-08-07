import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import z from "zod/v4";

const formSchema = z
  .object({
    name: z.string().min(3, "Name should be at least 3 characters"),
    email: z.email("Email must be a valid email address."),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters.")
      .max(100, "Password must be at most 100 characters."),
    confirm_password: z.string(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match.",
    path: ["confirm_password"],
  });

export default function SignUp() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirm_password: "",
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(data);
  }

  return (
    <section className="w-full min-h-screen px-4 md:max-w-80 mx-auto flex flex-col justify-center md:py-8">
      {" "}
      <article className="self-start text-foreground">
        <h3 className="font-heading font-bold text-lg tracking-tightest">
          Sign up for Work &amp; Pay
        </h3>
        <div>
          Already have an account?{" "}
          <Link
            to="/signin"
            className="ml-1.5 font-semibold text-primary hover:text-primary/80"
          >
            Sign In
          </Link>
        </div>
      </article>
      <article className="w-full space-y-6 mt-1.5">
        <div className="cursor-pointer w-full py-2 flex gap-2 items-center text-foreground font-mono text-xs uppercase tracking-wide font-medium justify-center bg-card border border-border rounded-lg hover:bg-muted transition-colors">
          <img src="/google-logo.png" alt="google-logo" className="size-3" />
          Continue with Google
        </div>

        <div className="flex items-center gap-8">
          <div className="flex-1 h-px bg-border"></div>
          <p className="font-mono text-xs uppercase tracking-wide text-muted-foreground">
            or
          </p>
          <div className="flex-1 h-px bg-border"></div>
        </div>
      </article>
      <form
        id="signup"
        className="w-full"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FieldGroup className="gap-3">
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="gap-1">
                <FieldLabel
                  htmlFor="signup-name"
                  className="font-mono text-xs  tracking-wide text-foreground font-medium"
                >
                  Name
                </FieldLabel>
                <Input
                  {...field}
                  id="signup-name"
                  aria-invalid={fieldState.invalid}
                  placeholder="Yussif Saeed"
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="gap-1">
                <FieldLabel
                  htmlFor="signup-email"
                  className="font-mono text-xs  tracking-wide text-foreground font-medium"
                >
                  Email
                </FieldLabel>
                <Input
                  {...field}
                  id="signup-email"
                  type="email"
                  aria-invalid={fieldState.invalid}
                  placeholder="you@example.com"
                  autoComplete="off"
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
                  htmlFor="signup-password"
                  className="font-mono text-xs  tracking-wide text-foreground font-medium"
                >
                  Password
                </FieldLabel>
                <Input
                  {...field}
                  id="signup-password"
                  type="password"
                  aria-invalid={fieldState.invalid}
                  placeholder="Min. 8 characters"
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="confirm_password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="gap-1">
                <FieldLabel
                  htmlFor="signup-confirm-password"
                  className="font-mono text-xs  tracking-wide text-foreground font-medium"
                >
                  Confirm Password
                </FieldLabel>
                <Input
                  {...field}
                  id="signup-confirm-password"
                  type="password"
                  aria-invalid={fieldState.invalid}
                  placeholder="Re-enter your password"
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>

        <Button type="submit" className="mt-4 w-full">
          Create account
        </Button>
      </form>
    </section>
  );
}
