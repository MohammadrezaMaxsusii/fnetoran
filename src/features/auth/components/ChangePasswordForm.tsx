import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import type { UseFormReturn } from "react-hook-form";
import * as z from "zod";
import { Spinner } from "@/components/ui/spinner";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import {
  getPasswordStrength,
  getPasswordStyles,
} from "@/shared/utils/getPasswordStrength";
import { recoverySchema } from "../schemas";
import { useRecoveryAction } from "../hooks";
import type { Recovery } from "../types";
import { useLocation } from "react-router";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import ErrorIcon from "@/shared/icons/error.svg?react";
import BackIcon from "@/shared/icons/back.svg?react";

// This implementation follows the current (problematic) API behavior.
// Component must be adjusted after the API is corrected.

interface Props {
  setMode: (mode: "otp" | "password") => void;
  form: UseFormReturn<z.infer<typeof recoverySchema>>;
}

export const ChangePasswordForm = ({ form, setMode }: Props) => {
  const { recoveryAction } = useRecoveryAction();
  const [strengthStyle, setStengthStyle] = useState<{
    width: string;
    color: string;
  } | null>(null);
  useEffect(() => {
    const subscription = form.watch((value) => {
      const strength = getPasswordStrength(value.newPassword || "");
      const strengthStyle = getPasswordStyles[strength - 1];
      setStengthStyle(strengthStyle);
    });

    return () => subscription.unsubscribe();
  }, [form]);

  const location = useLocation();

  const onSubmit = (input: Recovery) => {
    const { newPassword, otp } = input;
    const uuid = location.state.uuid;

    const newInput = {
      newPassword,
      otp,
      uuid,
    };

    recoveryAction.mutate(newInput);
    form.reset();
  };

  return (
    <div className="p-10 bg-card rounded-4xl w-110">
      <h1 className="font-bold text-2xl text-center mb-9">Change Password</h1>

      <div className="flex items-center justify-between">
        <span className="text-orange">Enter Your New Password.</span>
        <Button variant="secondary" onClick={() => setMode("otp")}>
          <BackIcon className="size-5" />
          Back
        </Button>
      </div>

      <Form {...form}>
        <form
          className="space-y-8 mt-10 w-full"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div>
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem className="w-full! gap-1">
                  <FormLabel className="text-sm text-gray-lighter ms-3">
                    New Password
                  </FormLabel>

                  <FormControl className="bg-gray-darker" autoFocus>
                    <Input placeholder="Enter your password" {...field} />
                  </FormControl>

                  <div className="mx-4">
                    <Progress
                      className={cn(
                        "w-full h-1 bg-gray-darker [&>div]:rounded-full rounded-full transition-all duration-300",
                        strengthStyle?.color,
                        strengthStyle?.width
                      )}
                    />
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div>
            <FormField
              control={form.control}
              name="repeatNewPassword"
              render={({ field }) => (
                <FormItem className="w-full!">
                  <FormLabel className="text-sm text-gray-lighter ms-3">
                    Repeat new Password
                  </FormLabel>
                  <FormControl className="bg-gray-darker">
                    <Input placeholder="Enter your password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {recoveryAction.isError && (
            <div className="flex items-center gap-2">
              <ErrorIcon className="text-red" />
              <span className="text-sm text-red">password did not change.</span>
            </div>
          )}

          <Button
            type="submit"
            className="w-full mt-4"
            disabled={recoveryAction.isPending}
          >
            {recoveryAction.isPending ? <Spinner /> : "Password Recovery"}
          </Button>
        </form>
      </Form>

      {/* Progress section */}
      <Progress
        value={100}
        className="h-3 bg-gray-darker [&>div]:bg-linear-to-r! [&>div]:from-blue-darker! [&>div]:to-blue-lighter! [&>div]:rounded-full [&>div]:border-2 [&>div]:border-gray-darker rounded-full border-2 border-default! w-full! mt-18"
      />
    </div>
  );
};
