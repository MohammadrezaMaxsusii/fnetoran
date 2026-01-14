import { Route } from "react-router";
import { RoleCreateOrUpdate, RolePage, RolesPage } from "./pages";

export const RolesRoutes = (
  <>
    <Route path="roles" element={<RolesPage />} />
    <Route path="roles/:id" element={<RolePage />} />
    <Route path="roles/create" element={<RoleCreateOrUpdate />} />
  </>
);
