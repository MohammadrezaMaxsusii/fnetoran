import { AppSidebarProvider } from "@/shared/providers/AppSidebarProvider";
import { Outlet } from "react-router";

export const AppLayout = () => (
  <AppSidebarProvider>
    <Outlet />
  </AppSidebarProvider>
);
