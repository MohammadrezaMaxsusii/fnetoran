import { Route } from "react-router";
import { FeedPage, FirewallPage } from "./pages";

export const FirewallRoutes = (
  <>
    <Route path="firewall" element={<FirewallPage />} />
    <Route path="feed" element={<FeedPage />} />
  </>
);
