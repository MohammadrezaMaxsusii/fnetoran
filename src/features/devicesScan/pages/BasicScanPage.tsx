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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { FieldError } from "@/components/ui/field";
import { basicScanSchema } from "../schemas";
import { Textarea } from "@/components/ui/textarea";
import type z from "zod";
import { useDeviceScanActions } from "../hooks";

export const BasicScanPage = () => {
  const { createBasicDeviceScanAction } = useDeviceScanActions();
  const [openCalendar, setOpenCalendar] = useState(false);
  const [errors, setErrors] = useState<{ message: string }[]>();
  const form = useForm({
    resolver: zodResolver(basicScanSchema),
    defaultValues: {
      name: "",
      range: "",
    },
  });

  const submitHandler = async (input: z.infer<typeof basicScanSchema>) => {
    try {
      await createBasicDeviceScanAction.mutateAsync(input);
    } catch (error) {
      if (error instanceof Array) setErrors(error);
    }
  };

  return (
    <div className="w-full">
      {/* Error handling */}
      {errors && (
        <Alert variant="destructive" className="mb-8">
          <AlertCircleIcon />
          <AlertTitle>Something went wrong!</AlertTitle>
          <AlertDescription>
            <FieldError errors={errors} />
          </AlertDescription>
        </Alert>
      )}

      <Form {...form}>
        <form
          className="flex flex-col gap-8  w-full"
          onSubmit={form.handleSubmit(submitHandler)}
        >
          {/* Name input */}
          <FormField
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel
                  htmlFor="name"
                  className="text-gray-lighter font-normal ps-0.5"
                >
                  Name:
                </FormLabel>
                <FormControl>
                  <Input
                    className="bg-muted h-auto py-3"
                    placeholder="Enter your name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Description input */}
          <FormField
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel
                  htmlFor="description"
                  className="text-gray-lighter font-normal ps-0.5"
                >
                  Description:
                </FormLabel>
                <FormControl>
                  <Textarea
                    className="bg-muted py-3 h-41.5"
                    placeholder="Enter your description"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Target input */}
          <FormField
            name="range"
            render={({ field }) => (
              <FormItem>
                <FormLabel
                  htmlFor="range"
                  className="text-gray-lighter font-normal ps-0.5"
                >
                  Targets:
                </FormLabel>
                <FormControl>
                  <Textarea
                    className="bg-muted py-3 h-41.5"
                    placeholder="Enter your targets"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Schedule input */}
          <FormField
            name="schedule_time"
            render={({ field }) => (
              <FormItem>
                <FormLabel
                  htmlFor="schedule_time"
                  className="text-gray-lighter font-normal ps-0.5"
                >
                  Schedule:
                </FormLabel>
                <FormControl>
                  <Popover open={openCalendar} onOpenChange={setOpenCalendar}>
                    <PopoverTrigger asChild>
                      <Button
                        id="date"
                        className="h-auto p-3 bg-muted hover:bg-muted/75 border border-default justify-between font-normal"
                      >
                        {field.value ? (
                          <span>{field.value}</span>
                        ) : (
                          <span className="text-muted-foreground">
                            Enter your schedule date
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

          <Button>Scan</Button>
        </form>
      </Form>
    </div>
  );
};
