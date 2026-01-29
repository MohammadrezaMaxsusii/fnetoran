import { Route } from "react-router";
import { IPsPage, PendingIPsPage, ExecuteIPsPage } from "./pages";

export const IpManagementRoutes = (
  <>
    <Route path="ip-management" element={<IPsPage />} />
    <Route path="ip-management/pending" element={<PendingIPsPage />} />
    <Route path="ip-management/execute" element={<ExecuteIPsPage />} />
  </>
);
