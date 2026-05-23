import { Route } from "react-router";
import { AssetCreatePage, AssetsPage, AssetTypesPage } from "./pages";
import { AssetCreateForm } from "./components";

export const AssetsRoutes = (
  <Route path="adminstration/assets">
    <Route index element={<AssetTypesPage />} />
    <Route path="create/:id" element={<AssetCreatePage /> }>
      <Route index element={<AssetCreateForm />} />
    </Route>
    <Route path=":id" element={<AssetsPage />} />
  </Route>
);
