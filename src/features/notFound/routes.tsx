import { Route } from "react-router";
import { NotFoundPage } from "./pages";

export const NotFoundRoutes = (
  <Route path="*" element={<NotFoundPage />} />
);
