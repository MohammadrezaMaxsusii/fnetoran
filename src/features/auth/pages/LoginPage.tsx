import { LoginForm } from "../components";

export const LoginPage = () => {
  return (
    <div className="min-h-screen p-6 flex items-center justify-between">
      {/* left section */}
      <div className="grow grid place-content-center">
        <div>
          <div className="w-80 h-22">
            <img
              src="/images/logo.webp"
              alt="logo"
              className="w-full h-auto object-cover object-center"
            />
          </div>
          <h1 className="text-2xl mt-10">Login to your account</h1>
        </div>

        <LoginForm />
      </div>

      {/* right section */}
      <img
        src="/images/login.webp"
        alt="login image"
        className="w-1/2 h-[calc(100vh-3rem)]"
      />
    </div>
  );
};
