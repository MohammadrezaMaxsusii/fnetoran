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
import { apiCreateSchema } from "../schemas";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { AlertCircleIcon, ChevronDownIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { startOfDay } from "date-fns";
import { formatLocalDate } from "@/shared/utils/fromatLocalDate";
import { useState } from "react";
import { z } from "zod";
import { useFeedActions } from "../hooks/useFeedActions";
import { useAttackTypesQuery } from "../hooks";
import { getErrorMessage } from "@/shared/utils";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useZonesQuery } from "@/features/zones/hooks";
import type { Zone } from "@/features/zones/types/zoneType";
import { Textarea } from "@/components/ui/textarea";

export const IPCreate = () => {
  const [openCalendar, setOpenCalendar] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { createFeedAction } = useFeedActions();
  const { zones } = useZonesQuery();
  const { attackTypes } = useAttackTypesQuery();
  const form = useForm({
    resolver: zodResolver(apiCreateSchema),
    defaultValues: {
      ip: "",
      zone_ids: "",
      action: "",
      attack_type: "",
      evidence: "",
      scheduled_at: "",
    },
  });

  const submitHandler = async (input: z.infer<typeof apiCreateSchema>) => {
    try {
      await createFeedAction.mutateAsync({
        ...input,
        zone_ids: [Number(input.zone_ids)],
      });
      form.reset();
      setOpenModal(false);
    } catch (error) {
      console.log(error)
      // setErrorMessage(getErrorMessage(error));
    }
  };

  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      <DialogTrigger asChild>
        <Button>
          <AddIcon className="text-foreground" />
          Add IP
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-background-default text-white p-8 max-h-11/12 overflow-y-auto max-w-115! **:last:data-[slot=dialog-close]:top-9 **:last:data-[slot=dialog-close]:end-8">
        {/* Dialog header */}
        <DialogHeader className="gap-4">
          <DialogTitle className="text-lg font-bold">Add IP</DialogTitle>
          <DialogDescription className="hidden">
            Add another feed
          </DialogDescription>
          {errorMessage && (
            <Alert variant="destructive">
              <AlertCircleIcon />
              <AlertTitle>Something went wrong!</AlertTitle>
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
          )}
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
                    IP:
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="bg-muted"
                      placeholder="Enter your IP"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="action"
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    htmlFor="type"
                    className="text-gray-lighter font-normal ps-0.5"
                  >
                    Type:
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
                        <SelectItem
                          value="unblock"
                          className="hover:bg-primary! hover:text-foreground! [&_svg:not([class*='text-'])]:text-forground"
                        >
                          Unblock
                        </SelectItem>
                        <SelectItem
                          value="block"
                          className="hover:bg-primary! hover:text-foreground! [&_svg:not([class*='text-'])]:text-forground"
                        >
                          Block
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="zone_ids"
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    htmlFor="zone_ids"
                    className="text-gray-lighter font-normal ps-0.5"
                  >
                    Zone:
                  </FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger
                        id="zone_ids"
                        className="w-full bg-muted border-default opacity-100! [&_svg:not([class*='text-'])]:text-foreground [&_svg:not([class*='text-'])]:opacity-100"
                      >
                        <SelectValue placeholder="Select zones" />
                      </SelectTrigger>

                      <SelectContent>
                        {zones?.data.map((zone: Zone) => (
                          <SelectItem
                            value={String(zone.id)}
                            className="hover:bg-primary! hover:text-foreground! [&_svg:not([class*='text-'])]:text-forground"
                          >
                            {zone.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="attack_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    htmlFor="attack_type"
                    className="text-gray-lighter font-normal ps-0.5"
                  >
                    Attack Type:
                  </FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger
                        id="attack_type"
                        className="w-full bg-muted border-default opacity-100! [&_svg:not([class*='text-'])]:text-foreground [&_svg:not([class*='text-'])]:opacity-100"
                      >
                        <SelectValue placeholder="Select attack type" />
                      </SelectTrigger>

                      <SelectContent>
                        {attackTypes?.data.map((attackType) => (
                          <SelectItem
                            value={attackType}
                            className="hover:bg-primary! hover:text-foreground! [&_svg:not([class*='text-'])]:text-forground"
                          >
                            {attackType}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="evidence"
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    htmlFor="evidence"
                    className="text-gray-lighter font-normal ps-0.5"
                  >
                    Evidence:
                  </FormLabel>
                  <FormControl>
                    {/* <Input
                      className="bg-muted"
                      placeholder="Enter your evidence"
                      {...field}
                    /> */}

                    <Textarea className="bg-muted" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="scheduled_at"
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    htmlFor="scheduled_at"
                    className="text-gray-lighter font-normal ps-0.5"
                  >
                    Deleted at:
                  </FormLabel>
                  <FormControl>
                    <Popover open={openCalendar} onOpenChange={setOpenCalendar}>
                      <PopoverTrigger asChild>
                        <Button
                          id="date"
                          className="bg-muted hover:bg-muted/75 border border-default justify-between font-normal"
                        >
                          {field.value ? (
                            <span>{field.value}</span>
                          ) : (
                            <span className="text-muted-foreground">
                              Select date
                            </span>
                          )}
                          <ChevronDownIcon />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent
                        className="w-auto overflow-hidden p-0"
                        align="start"
                      >
                        <Calendar
                          mode="single"
                          captionLayout="dropdown"
                          disabled={(date) => date < startOfDay(new Date())}
                          onSelect={(date) => {
                            if (date) {
                              const formatedDate = formatLocalDate(date);
                              field.onChange(formatedDate);
                            }
                            setOpenCalendar(false);
                          }}
                          classNames={{
                            day_button: "hover:bg-primary hover:text-white",
                          }}
                        />
                      </PopoverContent>
                    </Popover>
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
