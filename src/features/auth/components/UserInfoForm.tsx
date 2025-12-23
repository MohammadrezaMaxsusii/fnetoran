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
import { useNavigate } from "react-router-dom";
import * as z from "zod";
import { userInfoSchema } from "../schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Spinner } from "@/components/ui/spinner";
import { Progress } from "@/components/ui/progress";
import { useUserInfoAction } from "../hooks";
import type { UserInfo } from "../types";

export const UserInfoForm = () => {
  const { userInfoAction } = useUserInfoAction();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof userInfoSchema>>({
    resolver: zodResolver(userInfoSchema),
    defaultValues: {
      forgetPasswordField: "",
    },
  });

  const onSubmit = (input: UserInfo) => {
    userInfoAction.mutate(input);
    form.reset();
  };

  return (
    <div className="p-10 bg-card rounded-4xl w-110">
      <h1 className="font-bold text-2xl text-center mb-9">Forgot password?</h1>

      <div className="flex items-center justify-between">
        <span className="text-orange">Enter your info account</span>
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
                <FormControl className="bg-gray-darker">
                  <Input
                    placeholder="Enter your username or email or phone"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {userInfoAction.isError && (
            <div className="flex items-center gap-2">
              <img src="/icons/error.svg" alt="error icon" className="size-5" />
              <span className="text-sm text-red">
                The username or password you entered is invalid.
              </span>
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
