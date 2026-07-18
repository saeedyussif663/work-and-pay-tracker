import { Outlet } from 'react-router-dom';

export default function AuthLayout() {
  return (
    <section className="flex items-center">
      <article className="relative h-screen w-148 hidden lg:block">
        <img
          src="/auth-image.png"
          alt="auth image"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-radial from-[#00000000] to-[#FF6C17]/40"></div>
      </article>
      <article className=" flex-1">
        <Outlet />
      </article>
    </section>
  );
}
