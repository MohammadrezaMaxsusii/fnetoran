import { Route } from "react-router";
import {
  BasicScanPage,
  DevicesScanPage,
  DevicesScanResultDetailsPage,
  DevicesScanResultPage,
} from "./pages";
import { NewScanLayout } from "./components";

export const DevicesScanRoutes = (
  <>
    <Route path="devices">
      <Route path="scan">
        <Route index element={<DevicesScanPage />} />
        <Route path=":id">
          <Route index element={<DevicesScanResultPage />} />
          <Route
            path="details/:detailsId"
            element={<DevicesScanResultDetailsPage />}
          />
        </Route>
      </Route>
      <Route path="new-scan" element={<NewScanLayout />}>
        <Route path="basic" element={<BasicScanPage />} />
      </Route>
    </Route>
  </>
);
