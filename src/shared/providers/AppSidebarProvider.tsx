import type { ReactNode } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";

export const AppSidebarProvider = ({ children }: { children: ReactNode }) => {
  return (
    <SidebarProvider className="h-full">
      <AppSidebar />

      {children}
    </SidebarProvider>
  );
};
