import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export const NotFoundPage = () => {
  return (
    <div className="w-screen h-screen">
      <img
        src="/images/notFound.webp"
        alt="not found image"
        className="size-full object-cover object-center"
      />

      <div className="absolute bottom-19 start-1/2 -translate-x-1/2 flex items-center gap-8">
        <p className="text-sm">
          This page could not be found, click to return to the main page.
        </p>
        <Button>
          <Link to="/dashboard" className="flex items-center gap-1">
            <img
              src="/icons/dashboard.svg"
              alt="dashboard icon"
              className="size-5 brightness-0 invert"
            />
            Dashboard
          </Link>
        </Button>
      </div>
    </div>
  );
};
