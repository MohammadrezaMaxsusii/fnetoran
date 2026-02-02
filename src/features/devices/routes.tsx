import { Route } from "react-router";
import { DevicesPage } from "./pages";
import { DeviceDetailsPage } from "./pages/DeviceDetailsPage";
import { DeviceHardeningCheckPage } from "./pages/device-hardening-check-page";

export const DevicesRoutes = (
  <>
    <Route path="devices/list" element={<DevicesPage />} />
    <Route path="device/:deviceId" element={<DeviceDetailsPage />} />
    <Route
      path="device/:deviceId/cis/:cisId"
      element={<DeviceHardeningCheckPage />}
    />
  </>
);
