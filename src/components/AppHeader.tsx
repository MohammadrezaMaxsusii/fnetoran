import { useLocation } from "react-router";

export const AppHeader = () => {
  const location = useLocation();
  const title = location.pathname.split("/")[1];

  return (
    <header className="flex items-center justify-between py-7 sticky inset-x-0 top-0 z-50 bg-background-default">
      <h1 className="capitalize text-3xl relative after:content-[''] after:h-0.5 after:w-2/5 after:bg-primary after:absolute after:bottom-0 after:start-0">{title}</h1>

      {/* To do notifications */}

      {/* To do toggle theme */}

      {/* To do user profile */}
    </header>
  );
};
