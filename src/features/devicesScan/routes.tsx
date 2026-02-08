import { Route } from "react-router";
import { BasicScanPage, DeviceScanPage, DevicesScanPage } from "./pages";
import { NewScanLayout } from "./components";

export const DevicesScanRoutes = (
  <>
    <Route path="devices/scan" element={<DevicesScanPage />} />
    <Route path="devices/scan/:id" element={<DeviceScanPage />} />
    <Route path="devices/new-scan" element={<NewScanLayout />}>
      <Route path="basic" element={<BasicScanPage />} />
    </Route>
  </>
);
