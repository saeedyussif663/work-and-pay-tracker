import { Button } from '@/components/ui/button';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import z from 'zod/v4';

const formSchema = z.object({
  email: z.email('Email must be a valid email address.'),
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
      <rect x="18" y="72" width="118" height="78" rx="7" fill="#E8825C" />
      {/* Envelope bottom triangle folds */}
      <path d="M18 150 L77 110 L136 150Z" fill="#C9693F" />
      {/* Envelope top flap open */}
      <path d="M18 72 L77 112 L136 72Z" fill="#D4764E" />

      {/* Paper airplane body */}
      <path d="M52 18 L148 58 L118 72Z" fill="#F4A07A" />
      <path d="M52 18 L88 80 L118 72Z" fill="#E8825C" />
      <path d="M52 18 L88 80 L68 52Z" fill="#C9693F" />

      {/* Motion dashes */}
      <rect x="152" y="60" width="22" height="3.5" rx="1.75" fill="#F4A07A" />
      <rect x="157" y="72" width="22" height="3.5" rx="1.75" fill="#F4A07A" />
      <rect x="162" y="84" width="22" height="3.5" rx="1.75" fill="#F4A07A" />
    </svg>
  );
}

export default function ForgotPassword() {
  const [sentTo, setSentTo] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
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

          <h3 className="mt-4 text-[#0E021A] font-semibold text-2xl md:text-[28px]">
            Verification email sent
          </h3>
          <p className="mt-2 text-sm text-[#0A0A0A] leading-relaxed">
            A verification link has been sent to your email,{' '}
            <span className="font-semibold text-[#0E021A]">{sentTo}.</span>{' '}
            Kindly click on the link to reset your password.
          </p>

          <p className="mt-6 text-sm text-[#0A0A0A]">
            Didn't receive any link?{' '}
            <button
              type="button"
              onClick={() => setSentTo(null)}
              className="font-semibold text-[#F97316]"
            >
              Resend
            </button>
          </p>
        </article>
      </section>
    );
  }

  return (
    <section className="w-full h-screen md:max-w-114 mx-auto flex space-y-6 flex-col items-center justify-center">
      <article className="self-start text-[#0E021A]">
        <h3 className="font-bold text-lg"> Reset your password</h3>
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
                  className="font-medium text-[#333333]"
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
        <div className="mt-3 text-center text-sm text-[#444444]">
          Remembered your password?{' '}
          <Link
            to="/signin"
            className="ml-3 font-semibold text-brand-start text-sm"
          >
            Sign In
          </Link>
        </div>
      </form>
    </section>
  );
}
