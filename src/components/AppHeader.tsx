import { useLocation } from "react-router";
import { Notifications } from "./Notifications";

export const AppHeader = () => {
  const location = useLocation();
  const title = location.pathname.split("/")[1];

  return (
    <header className="flex items-center justify-between">
      <h1 className="capitalize text-3xl relative after:content-[''] after:h-0.5 after:w-2/5 after:bg-primary after:absolute after:bottom-0 after:start-0">{title}</h1>

      {/* <Notifications /> */}
    </header>
  );
};
