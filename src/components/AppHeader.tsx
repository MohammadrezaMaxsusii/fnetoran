import { useLocation } from "react-router";
import { Profile } from "./Profile";

// This feature is temporarily mocked because the backend API is not ready yet;

export const AppHeader = () => {
  const location = useLocation();
  const title = location.pathname.split("/")[1];

  return (
    <header className="flex items-center justify-between py-6.5 pe-5">
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
