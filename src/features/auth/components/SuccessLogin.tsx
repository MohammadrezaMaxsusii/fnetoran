import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

export const SuccessLogin = () => {
  const navigate = useNavigate();

  return (
    <div className="p-10 bg-card rounded-4xl w-full max-w-110">
      <div className="flex flex-col items-center gap-1.5 mt-5 mb-12">
        <img
          src="/icons/approved.svg"
          alt="success login"
          className="size-25"
        />

        <h3 className="text-green text-xl font-bold">Congratulations!</h3>
        <p className="text-center">
          Your password has been successfully registered.
        </p>
      </div>

      <div>
        <p className="text-orange text-center text-sm">
          Click on the option below to return to the Main Page
        </p>
        <Button
          variant="secondary"
          className="w-full mt-2"
          onClick={() => navigate("/login", { replace: true })}
        >
          <img src="/icons/back.svg" alt="back icon" className="size-6" />
          Back To Login
        </Button>
      </div>
    </div>
  );
};
