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

const formSchema = z.object({
  email: z.email('Email must be a valid email address.'),
  password: z.string().min(1, 'Password is required.'),
});

export default function SignIn() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
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
              Welcome back
            </h3>
            <div className="text-[#444444]">
              Don't have an account?{' '}
              <Link to="/signup" className="ml-3 font-semibold text-brand-start">
                Sign Up
              </Link>
            </div>
          </div>
        </article>

        <form
          id="signin"
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
                    htmlFor="signin-email"
                    className="font-medium text-[#333333]"
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
                    className="font-medium text-[#333333]"
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

          <Button type="submit" className="mt-4 w-full">
            Sign in
          </Button>

          <div className="mt-3 text-center text-[#444444]">
            Forgot password?{' '}
            <Link
              to="/forgot-password"
              className="ml-3 font-semibold text-brand-start"
            >
              Reset
            </Link>
          </div>
        </form>
      </article>
    </section>
  );
}
