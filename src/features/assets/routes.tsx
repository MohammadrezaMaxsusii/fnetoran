import { Route } from "react-router";
import { AssetCreatePage, AssetsPage } from "./pages";
import { AssetCreateForm } from "./components";

export const AssetsRoutes = (
  <Route path="adminstration/assets">
    <Route index element={<AssetsPage />} />
    <Route path="create/:id" element={<AssetCreatePage />}>
      <Route index element={<AssetCreateForm />} />
    </Route>
  </Route>
);
