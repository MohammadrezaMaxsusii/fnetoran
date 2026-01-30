import { Route } from "react-router";
import { IPsPage, PendingIPsPage, ExecuteIPsPage } from "./pages";

export const IpManagementRoutes = (
  <>
    <Route path="firewall/ip-management" element={<IPsPage />} />
    <Route path="firewall/ip-management/pending" element={<PendingIPsPage />} />
    <Route path="firewall/ip-management/execute" element={<ExecuteIPsPage />} />
  </>
);
