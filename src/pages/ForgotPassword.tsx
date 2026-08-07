import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import z from "zod/v4";

const formSchema = z.object({
  email: z.email("Email must be a valid email address."),
});

function EmailSentIllustration() {
  return (
    <svg
      width="200"
      height="160"
      viewBox="0 0 200 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Envelope body */}
      <rect
        x="18"
        y="72"
        width="118"
        height="78"
        rx="7"
        fill="#FFFFFF"
        stroke="#171A21"
        strokeWidth="2"
      />
      {/* Envelope bottom triangle folds */}
      <path
        d="M18 150 L77 110 L136 150Z"
        fill="#D9D5C8"
        stroke="#171A21"
        strokeWidth="1.5"
      />
      {/* Envelope top flap open */}
      <path
        d="M18 72 L77 112 L136 72Z"
        fill="#EFEDE6"
        stroke="#171A21"
        strokeWidth="1.5"
      />

      {/* Paper airplane body */}
      <path d="M52 18 L148 58 L118 72Z" fill="#C9584A" />
      <path d="M52 18 L88 80 L118 72Z" fill="#B23A2E" />
      <path d="M52 18 L88 80 L68 52Z" fill="#8F2E24" />

      {/* Motion dashes */}
      <rect
        x="152"
        y="60"
        width="22"
        height="3.5"
        rx="1.75"
        fill="#B23A2E"
        fillOpacity="0.5"
      />
      <rect
        x="157"
        y="72"
        width="22"
        height="3.5"
        rx="1.75"
        fill="#B23A2E"
        fillOpacity="0.35"
      />
      <rect
        x="162"
        y="84"
        width="22"
        height="3.5"
        rx="1.75"
        fill="#B23A2E"
        fillOpacity="0.2"
      />
    </svg>
  );
}

export default function ForgotPassword() {
  const [sentTo, setSentTo] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(data);
    setSentTo(data.email);
  }

  if (sentTo) {
    return (
      <section className="min-h-screen flex items-center justify-center px-4">
        <article className="w-full md:max-w-96 flex flex-col items-center justify-center text-center">
          <div className="mt-6">
            <EmailSentIllustration />
          </div>

          <h3 className="mt-4 text-foreground font-heading font-semibold text-2xl md:text-[28px] tracking-tightest">
            Verification email sent
          </h3>
          <p className="mt-2 text-sm text-foreground/80 leading-relaxed">
            A verification link has been sent to your email,{" "}
            <span className="font-semibold text-foreground">{sentTo}.</span>{" "}
            Kindly click on the link to reset your password.
          </p>

          <p className="mt-6 text-sm text-foreground/80">
            Didn't receive any link?{" "}
            <button
              type="button"
              onClick={() => setSentTo(null)}
              className="font-semibold text-primary hover:text-primary/80"
            >
              Resend
            </button>
          </p>
        </article>
      </section>
    );
  }

  return (
    <section className="w-full min-h-screen px-4 md:max-w-80 mx-auto flex flex-col justify-center md:py-8">
      <article className="self-start text-foreground">
        <h3 className="font-heading font-bold text-lg tracking-tightest">
          {" "}
          Reset your password
        </h3>
        <p className="text-sm">
          Forgot your password? Don't eat away, we have you covered. Just let us
          know your email address and we will email you a password reset link.
        </p>
      </article>

      <form
        id="forgot-password"
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
                  htmlFor="forgot-email"
                  className="font-mono text-xs tracking-wide text-foreground font-medium"
                >
                  Email
                </FieldLabel>
                <Input
                  {...field}
                  id="forgot-email"
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
        </FieldGroup>

        <Button type="submit" className="mt-4 w-full">
          Send reset link
        </Button>
        <div className="mt-3 text-center text-sm text-muted-foreground">
          Remembered your password?{" "}
          <Link
            to="/signin"
            className="ml-3 font-semibold text-primary hover:text-primary/80 text-sm"
          >
            Sign In
          </Link>
        </div>
      </form>
    </section>
  );
}
