import { Route } from "react-router";
import { IPsPage, PendingIPsPage } from "./pages";

export const IpManagementRoutes = (
  <>
    <Route path="firewall/ip-management" element={<IPsPage />} />
    <Route path="firewall/ip-management/pending" element={<PendingIPsPage />} />
  </>
);
