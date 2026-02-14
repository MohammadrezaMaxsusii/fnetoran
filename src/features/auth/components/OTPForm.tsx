import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import type { UseFormReturn } from "react-hook-form";
import { useLocation, useNavigate } from "react-router";
import * as z from "zod";
import { Progress } from "@/components/ui/progress";
import type { recoverySchema } from "../schemas";
import { useUserInfoAction } from "../hooks";
import { useEffect, useState } from "react";
import BackIcon from "@/shared/icons/back.svg?react";
import ResendIcon from "@/shared/icons/resend.svg?react";

// This implementation follows the current (problematic) API behavior.
// Component must be adjusted after the API is corrected.

interface Props {
  setMode: (mode: "otp" | "password") => void;
  form: UseFormReturn<z.infer<typeof recoverySchema>>;
}

export const OTPForm = ({ form, setMode }: Props) => {
  const [isDisabled, setIsDisabled] = useState(true);
  const { userInfoAction } = useUserInfoAction();
  const location = useLocation();
  const navigate = useNavigate();

  const resendHandler = () => {
    const forgetPasswordField = location.state.forgetPasswordField;
    userInfoAction.mutate({ forgetPasswordField });
  };

  useEffect(() => {
    const otpValue = form.getValues("otp");

    if (otpValue.length === 4) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [form.watch("otp")]);

  return (
    <div className="p-10 bg-card rounded-4xl w-110">
      <h1 className="font-bold text-2xl text-center mb-9">
        Receive Verification Code
      </h1>

      {/* Header of card */}
      <div className="flex items-center justify-between">
        <span className="text-orange">Check Your Phone</span>
        <Button
          variant="secondary"
          onClick={() => navigate("/forgot-password")}
        >
          <BackIcon className="size-5" />
          Back
        </Button>
      </div>

      <Form {...form}>
        <form
          onSubmit={() => setMode("password")}
          className="space-y-7.5 mt-10 w-full"
        >
          <div>
            <FormField
              control={form.control}
              name="otp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm text-gray-lighter ms-3">
                    OTP Code
                  </FormLabel>
                  <FormControl className="bg-gray-darker">
                    <InputOTP maxLength={4} {...field} autoFocus>
                      <InputOTPGroup className="w-full flex justify-between items-center">
                        <InputOTPSlot index={0} className="w-20 h-10" />
                        <InputOTPSlot index={1} className="w-20 h-10" />
                        <InputOTPSlot index={2} className="w-20 h-10" />
                        <InputOTPSlot index={3} className="w-20 h-10" />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Resenc code section */}
            <div className="grid place-content-center my-2">
              <Button type="button" variant="link" onClick={resendHandler}>
                <ResendIcon />
                Resend Code
              </Button>
            </div>
          </div>

          <Button type="submit" disabled={isDisabled} className="w-full mt-4">
            Code Verification
          </Button>
        </form>
      </Form>

      {/* Progress section */}
      <Progress
        value={66}
        className="h-3 bg-gray-darker [&>div]:bg-linear-to-r! [&>div]:from-blue-darker! [&>div]:to-blue-lighter! [&>div]:rounded-full [&>div]:border-2 [&>div]:border-gray-darker rounded-full border-2 border-default! w-full! mt-18"
      />
    </div>
  );
};
