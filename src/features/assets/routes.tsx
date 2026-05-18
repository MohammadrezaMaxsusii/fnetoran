import { Route } from "react-router";
import { AssetsPage, AssetTypesPage } from "./pages";

export const AssetsRoutes = (
  <Route path="adminstration/assets">
    <Route index element={<AssetTypesPage />} />
    <Route path=":id" element={<AssetsPage />} />
  </Route>
);
