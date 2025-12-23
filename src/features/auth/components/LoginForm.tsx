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

export const LoginForm = () => {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const { loginAction } = useLoginAction();

  const onSubmit = async (input: Login) => {
    loginAction.mutate(input);
    form.reset();
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
              <FormControl className="bg-gray-darker">
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
            <img src="/icons/error.svg" alt="error icon" className="size-5" />
            <span className="text-sm text-red">
              The username or password you entered is invalid.
            </span>
          </div>
        )}

        <div className="flex items-center justify-between mt-14">
          <div className="text-xs space-x-1.5">
            <span className="text-gray-lighter">Forget Password?</span>
            <Link to="/forgot-password" className="text-blue-darker">
              Click Here
            </Link>
          </div>

          <Button type="submit" disabled={loginAction.isPending}>
            {loginAction.isPending ? <Spinner /> : "Send Code"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
