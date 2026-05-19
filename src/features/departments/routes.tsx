import { Route } from "react-router";
import { DepartmentsPage } from "./pages";

export const DepartmentsRoutes = (
  <Route path="adminstration/departments/:id" element={<DepartmentsPage />} />
);
