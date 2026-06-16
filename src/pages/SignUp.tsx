import { Button } from '@/components/ui/button';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import z from 'zod/v4';

const formSchema = z
  .object({
    email: z.email('Email must be a valid email address.'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters.')
      .max(100, 'Password must be at most 100 characters.'),
    confirm_password: z.string(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: 'Passwords do not match.',
    path: ['confirm_password'],
  });

export default function SignUp() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      confirm_password: '',
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(data);
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
              Kickstart your experience
            </h3>
            <div className="text-[#444444]">
              Already have an account?{' '}
              <Link to="/signin" className="ml-3 font-semibold text-brand-start">
                Sign In
              </Link>
            </div>
          </div>
        </article>

        <form
          id="signup"
          className="mt-4 w-full"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FieldGroup className="gap-3">
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="gap-1">
                  <FieldLabel
                    htmlFor="signup-email"
                    className="font-medium text-[#333333]"
                  >
                    Email
                  </FieldLabel>
                  <Input
                    {...field}
                    id="signup-email"
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
                    htmlFor="signup-password"
                    className="font-medium text-[#333333]"
                  >
                    Password
                  </FieldLabel>
                  <Input
                    {...field}
                    id="signup-password"
                    type="password"
                    aria-invalid={fieldState.invalid}
                    placeholder="Min. 8 characters"
                    autoComplete="new-password"
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
                    className="font-medium text-[#333333]"
                  >
                    Confirm Password
                  </FieldLabel>
                  <Input
                    {...field}
                    id="signup-confirm-password"
                    type="password"
                    aria-invalid={fieldState.invalid}
                    placeholder="Re-enter your password"
                    autoComplete="new-password"
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
      </article>
    </section>
  );
}
