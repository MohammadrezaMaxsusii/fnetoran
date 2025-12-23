import { LoginForm } from "../components";

export const LoginPage = () => {
  return (
    <div className="min-h-screen p-6 flex items-center justify-between">
      {/* left section */}
      <div className="grow grid place-content-center">
        <div>
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
      </div>

      {/* right section */}
      <div className="w-1/2 h-full">
        <img
          src="/images/login.webp"
          alt="login image"
          className="w-full h-full"
        />
      </div>
    </div>
  );
};
