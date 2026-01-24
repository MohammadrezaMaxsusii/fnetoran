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
import AddIcon from "@/shared/icons/plus.svg?react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { zoneCreateSchema } from "../schemas";
import { AlertCircleIcon } from "lucide-react";
import { useState } from "react";
import { z } from "zod";
import { useZoneActions } from "../hooks";
import { getErrorMessage } from "@/shared/utils";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export const ZoneCreate = () => {
  const [openModal, setOpenModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { createZoneAction } = useZoneActions();
  const form = useForm({
    resolver: zodResolver(zoneCreateSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const submitHandler = async (input: z.infer<typeof zoneCreateSchema>) => {
    try {
      await createZoneAction.mutateAsync(input);
      form.reset();
      setOpenModal(false);
    } catch (error) {
      setErrorMessage(getErrorMessage(error));
    }
  };

  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      <DialogTrigger asChild>
        <Button>
          <AddIcon className="text-foreground" />
          Add Zone
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-background-default text-white p-8 max-h-11/12 overflow-y-auto max-w-115! **:last:data-[slot=dialog-close]:top-9 **:last:data-[slot=dialog-close]:end-8">
        {/* Dialog header */}
        <DialogHeader className="gap-4">
          <DialogTitle className="text-lg font-bold">Add zone</DialogTitle>
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
                      className="bg-muted"
                      placeholder="Enter your name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
                    <Input
                      className="bg-muted"
                      placeholder="Enter your description"
                      {...field}
                    />
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
