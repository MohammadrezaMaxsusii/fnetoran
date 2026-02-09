import { Navigate, Route, Routes, useLocation } from "react-router";
import { AuthRoutes } from "./features/auth/routes";
import { DashboardRoutes } from "./features/dashboard/routes";
import { AppLayout } from "./components/AppLayout";
import { UsersRoutes } from "./features/users/routes";
import { RolesRoutes } from "./features/roles/routes";
import { PermissionRoutes } from "./features/permission/routes";
import { DevicesRoutes } from "./features/devices/routes";
import { FirewallRoutes } from "./features/firewall/routes";
import { NotFoundRoutes } from "./features/notFound/routes";
import { ZonesRoutes } from "./features/zones/routes";
import { IpManagementRoutes } from "./features/ipManagement/routes";
import { DevicesScanRoutes } from "./features/devicesScan/routes";
import { TerminalRoutes } from "./features/terminal/routes";
import { BackupsRoutes } from "./features/backup/routes";
import { AutoDiscoveryRoutes } from "./features/autoDiscovery/routes";
import { ErrorBoundary, getErrorMessage } from "react-error-boundary";
import { Error } from "./components/Error";

export const App = () => {
  const location = useLocation();

  return (
    <main className="h-full bg-background-default text-white">
      <ErrorBoundary
        resetKeys={[location.key]}
        fallbackRender={({ error }) => <Error error={getErrorMessage(error)} />}
      >
        <Routes>
          <Route index element={<Navigate to="/login" />} />

          {AuthRoutes}
          {NotFoundRoutes}

          <Route element={<AppLayout />}>
            {DashboardRoutes}
            {UsersRoutes}
            {RolesRoutes}
            {PermissionRoutes}
            {DevicesRoutes}
            {FirewallRoutes}
            {ZonesRoutes}
            {IpManagementRoutes}
            {DevicesScanRoutes}
            {TerminalRoutes}
            {BackupsRoutes}
            {AutoDiscoveryRoutes}
          </Route>
        </Routes>
      </ErrorBoundary>
    </main>
  );
};
