import { useMutation } from "@tanstack/react-query";
import type { Recovery } from "../types";
import { recovery } from "../api";
import { useNavigate } from "react-router";

export const useRecoveryAction = () => {
  const navigate = useNavigate();

  const recoveryAction = useMutation({
    mutationFn: (input: Recovery) => recovery(input),
    onSuccess: () => {
      navigate("/success-login", { replace: true });
    },
  });

  return {
    recoveryAction,
  };
};
