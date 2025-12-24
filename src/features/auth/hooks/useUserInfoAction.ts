import { useMutation } from "@tanstack/react-query";
import { userInfo } from "../api";
import { useNavigate } from "react-router";

export const useUserInfoAction = () => {
  const navigate = useNavigate();

  const userInfoAction = useMutation({
    mutationFn: userInfo,
    onSuccess: (data, variable) => {
      navigate("/change-password", {
        state: {
          forgetPasswordField: variable.forgetPasswordField,
          uuid: data.data.uuid,
        },
      });
    },
  });

  return {
    userInfoAction,
  };
};
