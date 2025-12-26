import React from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";

export const AppSidebarProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <SidebarProvider className="h-full grid grid-cols-[1fr_10fr] grid-rows-[90px_1fr]">
      <AppSidebar />

      {children}
    </SidebarProvider>
  );
};
