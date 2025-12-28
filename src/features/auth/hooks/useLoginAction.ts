import { useMutation } from "@tanstack/react-query";
import type { Login } from "../types";
import { login } from "../api";
import { useNavigate } from "react-router";

export const useLoginAction = () => {
  const navigate = useNavigate();

  const loginAction = useMutation({
    mutationFn: (input: Login) => login(input),
    onSuccess: () => {
      navigate("/dashboard", { replace: true });
    },
  });

  return {
    loginAction,
  };
};
