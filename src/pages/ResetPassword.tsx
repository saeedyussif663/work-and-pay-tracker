import { Button } from '@/components/ui/button';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Link, useParams } from 'react-router-dom';
import z from 'zod/v4';

const formSchema = z
  .object({
    password: z.string().min(1, 'Password is required.'),
    confirm_password: z.string(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: 'Passwords must match.',
    path: ['confirm_password'],
  });

export default function ResetPassword() {
  const { token } = useParams<{ token: string }>();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: '',
      confirm_password: '',
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log({ token, ...data });
  }

  return (
    <section className="min-h-screen flex items-center justify-center px-4">
      <article className="w-full md:max-w-96 flex flex-col items-center justify-center">
        <div className="flex items-center gap-2.5 justify-center">
          <img src="/icon.png" alt="icon" />
          <h1 className="text-[#333333] text-lg md:text-2xl font-ayuga">
            Work&Pay
          </h1>
        </div>

        <article className="mt-4">
          <div className="text-center space-y-1.5">
            <h3 className="text-[#333333] font-semibold text-2xl md:text-[33px]">
              Reset your password
            </h3>
            <p className="text-sm text-[#444444]">
              Reset your password by providing your new password.
            </p>
          </div>
        </article>

        <form
          id="reset-password"
          className="mt-4 w-full"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FieldGroup className="gap-3">
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="gap-1">
                  <FieldLabel
                    htmlFor="reset-password-input"
                    className="font-medium text-[#333333]"
                  >
                    New password
                  </FieldLabel>
                  <div className="relative">
                    <Input
                      {...field}
                      id="reset-password-input"
                      type={showPassword ? 'text' : 'password'}
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter new password"
                      autoComplete="new-password"
                      className="pr-9"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((p) => !p)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#666666] hover:text-[#333333]"
                      tabIndex={-1}
                    >
                      {showPassword ? (
                        <EyeOff className="size-3.5" />
                      ) : (
                        <Eye className="size-3.5" />
                      )}
                    </button>
                  </div>
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
                    htmlFor="reset-confirm-password"
                    className="font-medium text-[#333333]"
                  >
                    Confirm password
                  </FieldLabel>
                  <div className="relative">
                    <Input
                      {...field}
                      id="reset-confirm-password"
                      type={showConfirm ? 'text' : 'password'}
                      aria-invalid={fieldState.invalid}
                      placeholder="Confirm new password"
                      autoComplete="new-password"
                      className="pr-9"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirm((p) => !p)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#666666] hover:text-[#333333]"
                      tabIndex={-1}
                    >
                      {showConfirm ? (
                        <EyeOff className="size-3.5" />
                      ) : (
                        <Eye className="size-3.5" />
                      )}
                    </button>
                  </div>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>

          <Button type="submit" className="mt-4 w-full">
            Reset password
          </Button>

          <div className="mt-3 text-center text-[#444444] text-sm">
            Remembered your password?{' '}
            <Link to="/signin" className="ml-3 font-semibold text-brand-start text-sm">
              Sign In
            </Link>
          </div>
        </form>
      </article>
    </section>
  );
}
