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
import { addToZoneSchema, deviceCreateSchema } from "../schemas";
import { useAddToZone, useDeviceActions, useDeviceTypesQuery } from "../hooks";
import { z } from "zod";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useZonesQuery } from "@/features/zones/hooks";
import { toast } from "sonner";

export const SelectZoneDialog = ({ open, setOpen, deviceId }) => {
  // const { createDeviceAction, createDeviceCredentialAction } =
  //   useDeviceActions();
  // const { deviceTypes } = useDeviceTypesQuery();

  const { zones } = useZonesQuery();

  const { mutateAsync } = useAddToZone();

  const form = useForm({
    resolver: zodResolver(addToZoneSchema),
    defaultValues: {
      zone_id: "",
    },
  });

  console.log(zones)

  const submitHandler = async (input: z.infer<typeof addToZoneSchema>) => {
    try {
      await mutateAsync({
        zone_id: input.zone_id,
        device_id: deviceId,
      });

      form.reset();
      setOpen(false);
    } catch (error) {
      toast.error(error.detail);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="bg-background-default text-white p-8 max-h-11/12 overflow-y-auto max-w-115! **:last:data-[slot=dialog-close]:top-9 **:last:data-[slot=dialog-close]:end-8">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold">
            Add device to zone
          </DialogTitle>

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
              name="zone_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    htmlFor="zone_id"
                    className="text-gray-lighter font-normal ps-0.5"
                  >
                    Zone
                  </FormLabel>

                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger
                        id="zone_id"
                        className="w-full bg-muted border-default opacity-100! [&_svg:not([class*='text-'])]:text-foreground [&_svg:not([class*='text-'])]:opacity-100"
                      >
                        <SelectValue placeholder="Select zone" />
                      </SelectTrigger>

                      <SelectContent>
                        {zones?.data.map((deviceType) => (
                          <SelectItem
                            key={deviceType.id}
                            value={String(deviceType.id)}
                            className="hover:bg-primary! hover:text-foreground! [&_svg:not([class*='text-'])]:text-forground"
                          >
                            {deviceType.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Dialog footer */}
            <DialogFooter className="grid grid-cols-2 gap-3">
              <Button
                type="submit"
                className="bg-navy-blue hover:bg-navy-blue text-blue-darker border border-blue-darker"
              >
                Add
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
