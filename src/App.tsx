import { AuthLayout, UserInfoForm } from "./features/auth/components";
import { LoginPage, RecoveryPage } from "./features/auth/pages";
import { Routes, Route } from "react-router-dom";

export const App = () => {
  return (
    <main className="font-display bg-background-default text-white">
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route element={<AuthLayout />}>
          <Route path="/forgot-password" element={<UserInfoForm />} />
          <Route path="/change-password" element={<RecoveryPage />} />
        </Route>
      </Routes>
    </main>
  );
};
