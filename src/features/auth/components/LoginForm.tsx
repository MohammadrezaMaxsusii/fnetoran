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
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import type { Login } from "../types";
import { loginSchema } from "../schemas";
import { useLoginAction } from "../hooks";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router";
import { Spinner } from "@/components/ui/spinner";
import { useState } from "react";
import ErrorIcon from "@/shared/icons/error.svg?react";
import { FieldError } from "@/components/ui/field";

export const LoginForm = () => {
  const [errors, setErrors] = useState<{ message: string }[]>();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const { loginAction } = useLoginAction();

  const onSubmit = async (input: Login) => {
    try {
      await loginAction.mutateAsync(input);
      setErrors(undefined);
    } catch (error: unknown) {
      if (error instanceof Array) setErrors(error);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-7.5 mt-14 w-100"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="grid grid-cols-3">
              <FormLabel className="col-span-1 text-gray-lighter">
                Username
              </FormLabel>
              <FormControl className="bg-gray-darker" autoFocus>
                <Input
                  className="col-span-2 w-full"
                  placeholder="Enter your username"
                  {...field}
                />
              </FormControl>
              <FormMessage className="col-start-2 col-span-2" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="grid grid-cols-3">
              <FormLabel className="col-span-1 text-gray-lighter">
                password
              </FormLabel>
              <FormControl className="bg-gray-darker">
                <Input
                  className="col-span-2"
                  placeholder="Enter your password"
                  type="password"
                  {...field}
                />
              </FormControl>
              <FormMessage className="col-start-2 col-span-2" />
            </FormItem>
          )}
        />

        <Separator />

        {/* Error section */}
        {loginAction.isError && (
          <div className="flex items-center gap-2">
            <ErrorIcon className="text-red" />
            <FieldError errors={errors} />
          </div>
        )}

        <div className="flex items-center justify-between mt-14">
          <div className="text-xs space-x-1.5">
            <span className="text-gray-lighter">Forget Password?</span>
            <Link to="/forgot-password" className="text-blue-darker">
              Click Here
            </Link>
          </div>

          <Button
            type="submit"
            disabled={loginAction.isPending}
            className="w-25"
          >
            {loginAction.isPending ? <Spinner /> : "Login"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
