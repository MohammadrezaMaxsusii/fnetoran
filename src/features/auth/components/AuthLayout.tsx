import { Outlet } from "react-router-dom";

export const AuthLayout = () => {
  return (
    <div className="w-full min-h-screen space-y-4 bg-[url(/images/recovery.png)] bg-center bg-contain grid place-content-center p-6">
      {/* Logo section */}
      <div className="w-80 h-22 mx-auto">
        <img
          src="/images/logo.webp"
          alt="logo"
          className="w-full h-auto object-cover object-center"
        />
      </div>

      {/* Form section */}
      <Outlet />
    </div>
  );
};
