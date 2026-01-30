import { Route } from "react-router";
import { RolePage, RolesPage } from "./pages";

export const RolesRoutes = (
  <>
    <Route path="roles" element={<RolesPage />} />
    <Route path="roles/:id" element={<RolePage />} />
  </>
);
