import { Route } from "react-router";
import { IPsPage, PendingIPsPage } from "./pages";

export const IpManagementRoutes = (
  <>
    <Route path="ip-management" element={<IPsPage />} />
    <Route path="ip-management/pending" element={<PendingIPsPage />} />
  </>
);
