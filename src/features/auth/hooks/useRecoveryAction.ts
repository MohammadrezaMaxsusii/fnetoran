import { useMutation } from "@tanstack/react-query";
import type { Recovery } from "../types";
import { recovery } from "../api";

export const useRecoveryAction = () => {
  const recoveryAction = useMutation({
    mutationKey: ["recovery"],
    mutationFn: (input: Recovery) => recovery(input),
  });

  return {
    recoveryAction,
  };
};
