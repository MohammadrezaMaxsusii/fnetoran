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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { locationFormSchema } from "../schemas";
import { AlertCircleIcon } from "lucide-react";
import { useState } from "react";
import { z } from "zod";
import { useLocationActions } from "../hooks";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { FieldError } from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";

interface Props {
  parentId?: number | null;
}

export const LocationCreate = ({ parentId }: Props) => {
  const [openModal, setOpenModal] = useState(false);
  const [errors, setErrors] = useState<{ message: string }[]>();
  const { createLocationAction } = useLocationActions();
  const form = useForm({
    resolver: zodResolver(locationFormSchema),
    defaultValues: {
      name: "",
      location_type: "",
    },
  });

  const submitHandler = async (input: z.infer<typeof locationFormSchema>) => {
    try {
      await createLocationAction.mutateAsync({...input, parent_id: parentId});
      form.reset();
      setOpenModal(false);
      setErrors(undefined);
    } catch (error) {
      if (error instanceof Array) setErrors(error);
    }
  };

  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      <DialogTrigger asChild>
        <span className="inline-block size-full p-2 cursor-pointer">Create</span>
      </DialogTrigger>

      <DialogContent className="bg-background-default text-white p-8 max-h-11/12 overflow-y-auto max-w-115! **:last:data-[slot=dialog-close]:top-9 **:last:data-[slot=dialog-close]:inset-e-8">
        {/* Dialog header */}
        <DialogHeader className="gap-4">
          <DialogTitle className="text-lg font-bold">
            Create location
          </DialogTitle>
          <DialogDescription className="hidden">
            Add another location
          </DialogDescription>
          {errors && (
            <Alert variant="destructive">
              <AlertCircleIcon />
              <AlertTitle>Something went wrong!</AlertTitle>
              <AlertDescription>
                <FieldError errors={errors} />
              </AlertDescription>
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
              name="location_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    htmlFor="location_type"
                    className="text-gray-lighter font-normal ps-0.5"
                  >
                    Location type:
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="bg-muted"
                      placeholder="Enter your location type"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    htmlFor="address"
                    className="text-gray-lighter font-normal ps-0.5"
                  >
                    Address:
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="bg-muted"
                      placeholder="Enter your address"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="room_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    htmlFor="room_number"
                    className="text-gray-lighter font-normal ps-0.5"
                  >
                    Room number:
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="bg-muted"
                      placeholder="Enter your room number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="capacity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    htmlFor="capacity"
                    className="text-gray-lighter font-normal ps-0.5"
                  >
                    Capacity:
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="bg-muted"
                      placeholder="Enter your capacity"
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
                {createLocationAction.isPending ? (
                  <Spinner />
                ) : (
                  <span>Create</span>
                )}
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
