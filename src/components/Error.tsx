import ErrorIcon from "@/shared/icons/error.svg?react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router";

interface Props {
  error?: string;
}

export const Error = ({ error }: Props) => {
  const navigate = useNavigate();

  return (
    <div className="w-screen h-screen grid place-content-center">
      <div className="flex flex-col items-center justify-center gap-5">
        <ErrorIcon className="text-red size-40 mx-auto" />
        <h1 className="text-3xl">Something went wrong!</h1>
        {error && <p className="text-xl text-center max-w-160">{error}</p>}
        <Button
          variant="secondary"
          className="border border-default"
          onClick={() => navigate(-1)}
        >
          Back to previous page
        </Button>
      </div>
    </div>
  );
};
