import { Route, Routes } from "react-router";
import { AuthRoutes } from "./features/auth/routes";
import { DashboardRoutes } from "./features/dashboard/routes";
import { AppLayout } from "./components/AppLayout";
import { UsersRoutes } from "./features/users/routes";
import { RolesRoutes } from "./features/roles/routes";
import { PermissionRoutes } from "./features/permission/routes";
import { DevicesRoutes } from "./features/devices/routes";
import { FirewallRoutes } from "./features/firewall/routes";
import { RetrofitRoutes } from "./features/retrofit/routes";
import { NotFoundRoutes } from "./features/notFound/routes";

export const App = () => {
  return (
    <main className="h-full bg-background-default text-white">
      <Routes>
        {AuthRoutes}
        {NotFoundRoutes}

        <Route element={<AppLayout />}>
          {DashboardRoutes}
          {UsersRoutes}
          {RolesRoutes}
          {PermissionRoutes}
          {DevicesRoutes}
          {FirewallRoutes}
          {RetrofitRoutes}
        </Route>
      </Routes>
    </main>
  );
};
