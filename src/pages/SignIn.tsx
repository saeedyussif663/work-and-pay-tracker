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
    <section className="w-full md:max-w-114 mx-auto flex space-y-6 flex-col items-center justify-center">
      <article className="self-start text-[#0E021A]">
        <h3 className="font-bold text-lg">Sign in to Work & Pay</h3>
        <div>
          Don't have an account?{' '}
          <Link to="/signup" className="ml-1.5 font-semibold text-[#F97316]">
            Sign Up
          </Link>
        </div>
      </article>

      <article className="w-full space-y-6">
        <div className="cursor-pointer w-full py-3.5 flex gap-2 items-center text-[#0A0A0A] font-medium text-sm justify-center bg-[#F0F0F0] rounded-2xl">
          <img src="/google-logo.png" alt="google-logo" />
          Continue with Google
        </div>

        <div className="flex items-center gap-8">
          <div className="flex-1 h-px bg-[#D4D4D4]"></div>
          <p className="font-medium text-sm">or</p>
          <div className="flex-1 h-px bg-[#D4D4D4]"></div>
        </div>
      </article>

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
                  className="font-medium text-[#0A0A0A]"
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
                  className="font-medium text-[#0A0A0A]"
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

        <div className="mt-3 text-center text-[#0E021A]">
          Forgot password?{' '}
          <Link
            to="/forgot-password"
            className="ml-3 font-semibold text-[#F97316]"
          >
            Reset
          </Link>
        </div>
      </form>
    </section>
  );
}
