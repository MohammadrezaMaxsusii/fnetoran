import { Routes } from "react-router";
import { AuthRoutes } from "./features/auth/routes";

export const App = () => {
  return (
    <main className="font-display bg-background-default text-white">
      <Routes>
        <AuthRoutes />
      </Routes>
    </main>
  );
};
