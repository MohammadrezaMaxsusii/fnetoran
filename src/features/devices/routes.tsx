import { Route } from "react-router";
import { DevicesPage } from "./pages";

export const DevicesRoutes = (
  <Route path="devices/list" element={<DevicesPage />} />
);
