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
import { feedCreateSchema } from "../schemas";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDownIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { startOfDay } from "date-fns";
import { formatLocalDate } from "@/shared/utils/fromatLocalDate";
import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { z } from "zod";
import { useFeedActions } from "../hooks/useFeedActions";
import { useFeedsQuery } from "../hooks";

export const FeedCreate = () => {
  const [open, setOpen] = useState(false);
  const { createFeedAction } = useFeedActions();
  const { feeds, feedsIsPending, feedsError } = useFeedsQuery();
  const form = useForm({
    resolver: zodResolver(feedCreateSchema),
    defaultValues: {
      fileType: "available_files",
    },
  });

  const fileType = form.watch("fileType");

  const submitHandler = async (input: z.infer<typeof feedCreateSchema>) => {
    console.log("hiiiiiiiiiiii");
    let newInput = {...input}
    console.log(newInput);
    delete newInput.removeDate;
    await createFeedAction.mutateAsync(newInput);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <AddIcon className="text-foreground" />
          Add Feed
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-background-default text-white p-8 max-h-11/12 overflow-y-auto max-w-115! **:last:data-[slot=dialog-close]:top-9 **:last:data-[slot=dialog-close]:end-8">
        {/* Dialog header */}
        <DialogHeader>
          <DialogTitle className="text-lg font-bold">Add feed</DialogTitle>
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
              name="item"
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
              name="source"
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    htmlFor="source"
                    className="text-gray-lighter font-normal ps-0.5"
                  >
                    Refrence:
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="bg-muted"
                      placeholder="Enter your refrence"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="fileName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    htmlFor="fileName"
                    className="text-gray-lighter font-normal ps-0.5 flex justify-between items-center"
                  >
                    Feed:
                    <FormField
                      name="fileType"
                      render={(fileType) => (
                        <FormItem>
                          <FormControl>
                            <RadioGroup
                              value={fileType.field.value}
                              onValueChange={fileType.field.onChange}
                              className="flex space-x-4"
                            >
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem
                                  value="available_files"
                                  id="available_files"
                                />
                                <Label htmlFor="available_files">
                                  Exist feed
                                </Label>
                              </div>

                              <div className="flex items-center space-x-2">
                                <RadioGroupItem
                                  value="new_file"
                                  id="new_file"
                                />
                                <Label htmlFor="new_file">New feed</Label>
                              </div>
                            </RadioGroup>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </FormLabel>
                  <FormControl>
                    {fileType === "new_file" ? (
                      <Input
                        className="bg-muted"
                        placeholder="Enter your Feed"
                        {...field}
                      />
                    ) : (
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger
                          id="feed"
                          className="w-full bg-muted border-default opacity-100! [&_svg:not([class*='text-'])]:text-foreground [&_svg:not([class*='text-'])]:opacity-100"
                        >
                          <SelectValue
                            placeholder={feeds?.data.length === 0 ? "Please select new feed and add your feed" : "Select feed"}
                          />
                        </SelectTrigger>
                        <SelectContent>
                          {feeds?.data.map((feed: any) => (
                            <SelectItem
                              key={feed.id}
                              value={String(feed.id)}
                              className="hover:bg-primary! hover:text-foreground! [&_svg:not([class*='text-'])]:text-forground"
                            >
                              {feed.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
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
                          value="allow"
                          className="hover:bg-primary! hover:text-foreground! [&_svg:not([class*='text-'])]:text-forground"
                        >
                          Allow
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
              name="removeDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    htmlFor="removeDate"
                    className="text-gray-lighter font-normal ps-0.5"
                  >
                    Deleted at:
                  </FormLabel>
                  <FormControl>
                    <Popover open={open} onOpenChange={setOpen}>
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
                            setOpen(false);
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
