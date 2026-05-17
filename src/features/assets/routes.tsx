import { Route } from "react-router";
import { AssetTypesPage } from "./pages";

export const AssetsRoutes = (
    <Route path="adminstration/assets">
        <Route index element={<AssetTypesPage />} />
    </Route>
)
