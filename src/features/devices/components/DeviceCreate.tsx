import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AddIcon from "@/shared/icons/plus.svg?react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { deviceCreateSchema } from "../schemas";
import { useDeviceActions, useDeviceTypesQuery } from "../hooks";
import { z } from "zod";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

export const DeviceCreate = () => {
  const [tab, setTab] = useState("ssh");
  const { createDeviceAction, createDeviceCredentialAction } =
    useDeviceActions();
  const { deviceTypes } = useDeviceTypesQuery();

  const form = useForm({
    resolver: zodResolver(deviceCreateSchema),
    defaultValues: {
      ip: "",
      vendor: "",
      type: "",
      subtype: "",
      username: "",
      password: "",
      apiKey: "",
    },
  });

  const deviceTypeValue = form.watch("type");

  const submitHandler = async (input: z.infer<typeof deviceCreateSchema>) => {
    const device = await createDeviceAction.mutateAsync({
      ip: input.ip,
      vendor: input.vendor,
      type: input.type,
      subtype: input.subtype,
    });

    await createDeviceCredentialAction.mutateAsync({
      deviceId: device.data.id,
      authType: tab,
      connectType: tab,
      ...(tab === "ssh" && {
        username: input.username,
        password: input.password,
      }),
      ...(tab === "api-key" && { apiKey: input.apiKey }),
    });

    form.reset();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <AddIcon className="text-foreground" />
          Add device
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-background-default text-white p-8 max-h-11/12 overflow-y-auto max-w-115! **:last:data-[slot=dialog-close]:top-9 **:last:data-[slot=dialog-close]:end-8">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold">Add device</DialogTitle>

          <DialogDescription className="hidden">
            Add another feed
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            className="flex flex-col gap-8 py-4 w-full"
            onSubmit={form.handleSubmit(submitHandler)}
          >
            <FormField
              name="ip"
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    htmlFor="item"
                    className="text-gray-lighter font-normal ps-0.5"
                  >
                    IP
                  </FormLabel>

                  <FormControl>
                    <Input placeholder="Enter your IP" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="vendor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    htmlFor="item"
                    className="text-gray-lighter font-normal ps-0.5"
                  >
                    Vendor
                  </FormLabel>

                  <FormControl>
                    <Input placeholder="Enter your vendor" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    htmlFor="type"
                    className="text-gray-lighter font-normal ps-0.5"
                  >
                    Type
                  </FormLabel>

                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger
                        id="type"
                        className="w-full bg-muted border-default opacity-100! [&_svg:not([class*='text-'])]:text-foreground [&_svg:not([class*='text-'])]:opacity-100"
                      >
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>

                      <SelectContent>
                        {Object.keys(deviceTypes?.data).map(
                          (deviceType: string) => (
                            <SelectItem
                              key={deviceType}
                              value={deviceType}
                              className="hover:bg-primary! hover:text-foreground! [&_svg:not([class*='text-'])]:text-forground"
                            >
                              {deviceType}
                            </SelectItem>
                          )
                        )}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="subtype"
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    htmlFor="subtype"
                    className="text-gray-lighter font-normal ps-0.5"
                  >
                    Sub Type
                  </FormLabel>

                  <FormControl>
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                      disabled={!deviceTypeValue}
                    >
                      <SelectTrigger
                        id="subtype"
                        className="w-full bg-muted border-default opacity-100! [&_svg:not([class*='text-'])]:text-foreground [&_svg:not([class*='text-'])]:opacity-100"
                      >
                        <SelectValue placeholder="Select sub type" />
                      </SelectTrigger>

                      <SelectContent>
                        {deviceTypeValue &&
                          deviceTypes.data[deviceTypeValue].map(
                            (subtype: string) => (
                              <SelectItem
                                key={subtype}
                                value={subtype}
                                className="hover:bg-primary! hover:text-foreground! [&_svg:not([class*='text-'])]:text-forground"
                              >
                                {subtype}
                              </SelectItem>
                            )
                          )}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Tabs
              className="rounded-lg bg-gray-light p-2"
              value={tab}
              onValueChange={(value) => setTab(value)}
            >
              <TabsList>
                <TabsTrigger value="ssh">SSH</TabsTrigger>

                <TabsTrigger value="api-key">API</TabsTrigger>
              </TabsList>

              <TabsContent value="ssh">
                <div className="flex gap-x-4 rounded-md bg-background-default p-4">
                  <FormField
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel
                          htmlFor="item"
                          className="text-gray-lighter font-normal ps-0.5"
                        >
                          Username
                        </FormLabel>

                        <FormControl>
                          <Input placeholder="Enter your IP" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel
                          htmlFor="item"
                          className="text-gray-lighter font-normal ps-0.5"
                        >
                          Password
                        </FormLabel>

                        <FormControl>
                          <Input placeholder="Enter your IP" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </TabsContent>

              <TabsContent value="api-key">
                <div className="rounded-md bg-background-default p-4">
                  <FormField
                    name="apiKey"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel
                          htmlFor="apiKey"
                          className="text-gray-lighter font-normal ps-0.5"
                        >
                          API Key
                        </FormLabel>

                        <FormControl>
                          <Input placeholder="Enter your API key" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </TabsContent>
            </Tabs>

            {/* Dialog footer */}
            <DialogFooter className="grid grid-cols-2 gap-3">
              <Button
                type="submit"
                className="bg-navy-blue hover:bg-navy-blue text-blue-darker border border-blue-darker"
              >
                Create
              </Button>

              <DialogClose asChild>
                <Button variant="secondary">Close</Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
