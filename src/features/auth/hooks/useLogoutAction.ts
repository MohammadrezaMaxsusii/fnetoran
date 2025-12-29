import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { logout } from "../api";

export const useLogoutAction = () => {
  const navigate = useNavigate();

  const logoutAction = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      navigate("/login", { replace: true });
    },
  });

  return {
    logoutAction,
  };
};
