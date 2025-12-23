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
import { useLocation, useNavigate } from "react-router-dom";
import * as z from "zod";
import { Spinner } from "@/components/ui/spinner";
import { Progress } from "@/components/ui/progress";
import type { recoverySchema } from "../schemas";
import { useUserInfoAction } from "../hooks";

interface Props {
  setMode: (mode: "otp" | "password") => void;
  form: UseFormReturn<z.infer<typeof recoverySchema>>;
}

export const OTPForm = ({ form, setMode }: Props) => {
  const { userInfoAction } = useUserInfoAction();
  const location = useLocation();
  const navigate = useNavigate();

  const resendHandler = () => {
    const forgetPasswordField = location.state.forgetPasswordField;
    userInfoAction.mutate({ forgetPasswordField });
  };

  return (
    <div className="p-10 bg-card rounded-4xl w-110">
      <h1 className="font-bold text-2xl text-center mb-9">
        Receive Verification Code
      </h1>

      <div className="flex items-center justify-between">
        <span className="text-orange">Check Your Phone</span>
        <Button
          variant="secondary"
          onClick={() => navigate(-1)}
        >
          <img src="/icons/back.svg" alt="back icon" className="size-6" />
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
                    <InputOTP maxLength={4} {...field}>
                      <InputOTPGroup className="w-full flex justify-between items-center">
                        <InputOTPSlot
                          index={0}
                          className="w-20 h-10"
                        />
                        <InputOTPSlot
                          index={1}
                          className="w-20 h-10"
                        />
                        <InputOTPSlot
                          index={2}
                          className="w-20 h-10"
                        />
                        <InputOTPSlot
                          index={3}
                          className="w-20 h-10"
                        />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid place-content-center my-2">
              <Button type="button" variant="link" onClick={resendHandler}>
                <img
                  src="/icons/resend.svg"
                  alt="resend icon"
                  className="size-4"
                />
                Resend Code
              </Button>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full mt-4"
          >
            {false ? <Spinner /> : "Code Verification"}
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
