import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import * as z from "zod";
import { userInfoSchema } from "../schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Spinner } from "@/components/ui/spinner";
import { Progress } from "@/components/ui/progress";
import { useUserInfoAction } from "../hooks";
import type { UserInfo } from "../types";
import { useState } from "react";
import { getErrorMessage } from "@/shared/utils";
import ErrorIcon from "@/shared/icons/error.svg?react";
import BackIcon from "@/shared/icons/back.svg?react";

export const UserInfoForm = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const { userInfoAction } = useUserInfoAction();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof userInfoSchema>>({
    resolver: zodResolver(userInfoSchema),
    defaultValues: {
      forgetPasswordField: "",
    },
  });

  const onSubmit = async (input: UserInfo) => {
    try {
      await userInfoAction.mutateAsync(input);
    } catch (error) {
      setErrorMessage(getErrorMessage(error));
    }
  };

  return (
    <div className="p-10 bg-card rounded-4xl w-110">
      <h1 className="font-bold text-2xl text-center mb-9">Forgot password?</h1>

      {/* Header of card */}
      <div className="flex items-center justify-between">
        <span className="text-orange">Enter your info account</span>
        <Button variant="secondary" onClick={() => navigate("/login")}>
          <BackIcon className="size-5"/>
          Back
        </Button>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-7.5 mt-10 w-full"
        >
          <FormField
            control={form.control}
            name="forgetPasswordField"
            render={({ field }) => (
              <FormItem className="w-full!">
                <FormLabel className="text-sm text-gray-lighter ms-3">
                  Username
                </FormLabel>
                <FormControl className="bg-gray-darker" autoFocus>
                  <Input
                    placeholder="Enter your username or email or phone"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Error section */}
          {userInfoAction.isError && (
            <div className="flex items-center gap-2">
              <ErrorIcon className="text-red" />
              <span className="text-sm text-red">{errorMessage}</span>
            </div>
          )}

          <Button
            type="submit"
            className="w-full mt-4"
            disabled={userInfoAction.isPending}
          >
            {userInfoAction.isPending ? <Spinner /> : "Password Recovery"}
          </Button>
        </form>
      </Form>

      {/* Progress section */}
      <Progress
        value={33}
        className="h-3 bg-gray-darker [&>div]:bg-linear-to-r! [&>div]:from-blue-darker! [&>div]:to-blue-lighter! [&>div]:rounded-full [&>div]:border-2 [&>div]:border-gray-darker rounded-full border-2 border-default! w-full! mt-18"
      />
    </div>
  );
};
