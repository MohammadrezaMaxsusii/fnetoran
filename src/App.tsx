import { Route, Routes } from "react-router";
import { AuthRoutes } from "./features/auth/routes";
import { DashboardRoutes } from "./features/dashboard/routes";
import { AppSidebarProvider } from "./shared/providers/AppSidebarProvider";
import { AppLayout } from "./components/AppLayout";

export const App = () => {
  return (
    <main className="font-display bg-background-default text-white">
      <Routes>
        {AuthRoutes}

        <Route element={<AppLayout />}>
          {DashboardRoutes}
        </Route>
      </Routes>
    </main>
  );
};
