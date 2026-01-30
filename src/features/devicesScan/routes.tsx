import { Route } from "react-router";
import { DeviceScanPage, DevicesScanPage } from "./pages";

export const DevicesScanRoutes = (
  <>
    <Route path="devices/scan" element={<DevicesScanPage />} />
    <Route path="devices/scan/:id" element={<DeviceScanPage />} />
  </>
);
