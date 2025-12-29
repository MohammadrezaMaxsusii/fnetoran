import { AppSidebarProvider } from "@/shared/providers/AppSidebarProvider";
import { Outlet } from "react-router";
import { AppHeader } from "./AppHeader";

export const AppLayout = () => (
  <AppSidebarProvider>
    <div className="w-full overflow-x-auto">
      <AppHeader />
      <Outlet />
    </div>
  </AppSidebarProvider>
);
