import { useMutation } from "@tanstack/react-query";
import type { Login } from "../types";
import { login } from "../api";
import { useNavigate } from "react-router-dom";

export const useLoginAction = () => {
  const navigate = useNavigate();

  const loginAction = useMutation({
    mutationKey: ["login"],
    mutationFn: (input: Login) => login(input),
    onSuccess: () => {
      navigate("/", { replace: true });
    },
  });

  return {
    loginAction,
  };
};
