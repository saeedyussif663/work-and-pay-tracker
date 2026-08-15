import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <section className="flex h-screen">
      <article className="relative w-148 hidden lg:block">
        <img
          src="/auth-image.svg"
          alt="Work and Pay Tracker"
          className="w-full h-full object-contain"
        />
        <div className="absolute inset-0 bg-primary/5"></div>
      </article>
      <article className="flex-1 overflow-y-auto px-4">
        <Outlet />
      </article>
    </section>
  );
}
