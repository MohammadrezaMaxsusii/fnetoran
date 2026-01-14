import { Route } from "react-router";
import { UserCreateOrUpdatePage, UsersPage } from "./pages";

export const UsersRoutes = (
  <>
    <Route path="users" element={<UsersPage />} />
    <Route path="users/create" element={<UserCreateOrUpdatePage />} />
    <Route path="users/update/:id" element={<UserCreateOrUpdatePage />} />
  </>
);
