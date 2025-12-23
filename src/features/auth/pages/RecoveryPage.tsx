import { useState } from "react";
import { ChangePasswordForm, OTPForm } from "../components";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { recoverySchema } from "../schemas";

export const RecoveryPage = () => {
  const [mode, setMode] = useState<"otp" | "password">("otp");

  const form = useForm<z.infer<typeof recoverySchema>>({
    resolver: zodResolver(recoverySchema),
    defaultValues: {
      newPassword: "",
      otp: "",
      uuid: "",
    },
  });

  return (
    <>
      {mode === "otp" ? (
        <OTPForm form={form} setMode={setMode} />
      ) : (
        <ChangePasswordForm form={form} setMode={setMode} />
      )}
    </>
  );
};
