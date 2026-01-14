import { Route } from "react-router";
import {
  PermissionCreateOrUpdate,
  PermissionPage,
  PermissionsPage,
} from "./pages";

export const PermissionRoutes = (
  <>
    <Route path="permissions" element={<PermissionsPage />} />
    <Route path="permissions/:id" element={<PermissionPage />} />
    <Route path="permissions/create" element={<PermissionCreateOrUpdate />} />
  </>
);
