import { AppSidebarProvider } from "@/shared/providers/AppSidebarProvider";
import { Outlet } from "react-router";
import { AppHeader } from "./AppHeader";

export const AppLayout = () => (
  <AppSidebarProvider>
    <div>
      <AppHeader />
      <Outlet />
    </div>
  </AppSidebarProvider>
);
