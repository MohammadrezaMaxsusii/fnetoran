import { useLocation } from "react-router";
import { Profile } from "./Profile";
import { useEffect, useState } from "react";
import { developmentItems } from "@/shared/constants/developmentConstant";
import { cn } from "@/lib/utils";

export const AppHeader = () => {
  const [isDevelopment, setIsDevelopment] = useState(false);
  const location = useLocation();
  const title = location.pathname.split("/")[1];

  useEffect(() => {
    if (developmentItems.includes(title)) {
      setIsDevelopment(true);
    } else {
      setIsDevelopment(false);
    }
  }, [title]);

  return (
    <header
      className={cn(
        "flex items-center justify-between py-6.5 pe-5 sticky inset-x-0 top-0 z-50",
        !isDevelopment && "bg-background-default"
      )}
    >
      <h1 className="capitalize text-3xl relative after:content-[''] after:h-0.5 after:w-2/5 after:bg-primary after:absolute after:bottom-0 after:start-0">
        {title}
      </h1>

      {/* To do notifications */}

      {/* To do toggle theme */}

      {/* User profile */}
      <Profile />
    </header>
  );
};
