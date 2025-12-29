import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { useUsersQuery } from "@/features/users/hooks";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import type { User } from "@/features/users/types";
import { getDate, getTime } from "@/shared/utils";
import {
  Empty,
  EmptyContent,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDownIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";

export const UserTable = () => {
  const { users, usersIsLoading } = useUsersQuery();
  const form = useForm();
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);

  if (usersIsLoading) {
    return (
      <section className="w-full bg-gray-darker p-6 rounded-2xl space-y-2">
        {/* Header of table */}
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-primary">Users List</span>
          <Button onClick={() => {}}>
            <img src="/icons/plus.svg" />
            Add user
          </Button>
        </div>

        {/* User table */}
        <Table>
          <TableBody className="flex flex-col gap-1">
            {Array.from({ length: 3 }).map((_, index) => (
              <TableRow
                key={index}
                className="bg-gray-darker hover:bg-gray-darker odd:bg-gray-items odd:hover:bg-gray-items rounded-lg border border-default"
              >
                <TableCell className="block rounded-lg overflow-hidden px-8">
                  <div className="flex justify-between items-center space-x-4">
                    <Skeleton className="size-8 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-62.5" />
                      <Skeleton className="h-3 w-50" />
                    </div>
                    <Skeleton className="h-4 w-25" />
                    <Skeleton className="h-4 w-11" />
                    <Skeleton className="h-4 w-14" />
                    <div className="flex items-center gap-2">
                      <Skeleton className="w-32.5 h-8" />
                      <Skeleton className="size-8" />
                      <Skeleton className="size-8" />
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
    );
  }

  if (users.data.length === 0) {
    return (
      <section className="w-full bg-gray-darker p-6 rounded-2xl space-y-2">
        {/* Header */}
        <div className="flex items-center justify-between p-7">
          <span className="text-lg font-bold text-primary">Users List</span>
          <Button onClick={() => {}}>
            <img src="/icons/plus.svg" />
            Add user
          </Button>
        </div>

        {/* Empty section */}
        <Empty className="py-3! gap-2">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <img src="/icons/user.svg" alt="user icon" className="size-5" />
            </EmptyMedia>
            <EmptyTitle>Users List Empty!</EmptyTitle>
          </EmptyHeader>
          <EmptyContent className="text-sm text-muted-foreground">
            Users will appear here once they are added.
          </EmptyContent>
        </Empty>
      </section>
    );
  }

  return (
    <section className="w-full bg-gray-darker rounded-2xl">
      {/* Header of table */}
      <div className="flex items-center justify-between p-7">
        <span className="text-lg font-bold text-primary">Users List</span>
        <Button onClick={() => {}}>
          <img src="/icons/plus.svg" />
          Add user
        </Button>
      </div>

      <div className="px-7">
        <Separator className="bg-default" />
      </div>

      {/* Filter section */}
      <div className="p-7 flex items-center justify-between">
        <Form {...form}>
          <div className="flex items-center gap-4">
            <span className="text-gray-lighter text-sm">User Status: </span>
            <FormField
              control={form.control}
              name="active"
              render={() => (
                <FormItem className="flex items-center">
                  <FormControl>
                    <Checkbox id="active" />
                  </FormControl>
                  <FormLabel htmlFor="active">Active</FormLabel>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="inactive"
              render={() => (
                <FormItem className="flex items-center">
                  <FormControl>
                    <Checkbox id="inactive" />
                  </FormControl>
                  <FormLabel htmlFor="inactive">Inactive</FormLabel>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="date"
            render={() => (
              <FormItem className="flex items-center">
                <FormLabel
                  htmlFor="date"
                  className="text-gray-lighter font-normal"
                >
                  Date:{" "}
                </FormLabel>
                <FormControl>
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        id="date"
                        className="bg-muted hover:bg-muted/75 border border-default w-48 justify-between font-normal"
                      >
                        <div>
                          {date ? date.toLocaleDateString() : "Select date"}
                        </div>
                        <ChevronDownIcon />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-auto overflow-hidden p-0"
                      align="start"
                    >
                      <Calendar
                        mode="single"
                        selected={date}
                        captionLayout="dropdown"
                        onSelect={(date) => {
                          setDate(date);
                          setOpen(false);
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
        </Form>
      </div>

      {/* User table */}
      <div className="px-7 pb-7">
        <Table>
          <TableBody>
            {users.data.map((user: User, index: number) => (
              <TableRow
                key={user.id}
                className="bg-gray-darker hover:bg-gray-darker odd:bg-gray-items odd:hover:bg-gray-items"
              >
                <TableCell className="px-5 py-2 rounded-l-lg text-center font-bold">
                  {index}
                </TableCell>

                {/* User info */}
                <TableCell className="px-4 py-2">
                  <div className="flex items-center gap-4">
                    <div className="border-2 border-orange rounded-full size-8">
                      {/* To do fetch user profile */}
                      <img
                        src={user.profileId ? "" : "/icons/user.svg"}
                        alt="profile image"
                        className="size-full rounded-full"
                      />
                    </div>

                    <div className="flex flex-col">
                      <span className="text-sm font-bold">
                        {user.firstName + " " + user.lastName}
                      </span>
                      <span className="text-xs text-gray-lighter">
                        {user.email}
                      </span>
                    </div>
                  </div>
                </TableCell>

                {/* User role */}
                <TableCell className="px-4 py-2 text-center">
                  {user.role.name}
                </TableCell>

                {/* User register time */}
                <TableCell className="px-4 py-2 text-center">
                  {getDate(user.createdAt)} | {getTime(user.createdAt)}
                </TableCell>

                {/* User status */}
                <TableCell className="px-4 py-2 text-center">
                  {user.active ? (
                    <div className="flex items-center justify-center gap-1">
                      <div className="w-3 h-3 bg-green rounded-full" />
                      <span>Active</span>
                    </div>
                  ) : (
                    <span className="text-gray-lighter">Inactive</span>
                  )}
                </TableCell>

                {/* Operation section */}
                <TableCell className="px-4 py-2 text-center rounded-r-lg space-x-1.5">
                  {/* edit user */}
                  <Button className="bg-navy-blue hover:bg-navy-blue text-blue-darker border border-blue-darker px-6">
                    <img
                      src="/icons/edit.svg"
                      alt="edit icon"
                      className="size-5"
                    />
                    Edit User
                  </Button>

                  {/* delete user */}
                  <Button className="bg-red-darker hover:bg-red-darker border border-red p-2.5!">
                    <img
                      src="/icons/delete.svg"
                      alt="delete icon"
                      className="size-5"
                    />
                  </Button>

                  {/* view user */}
                  <Button className="p-2.5!">
                    <img
                      src="/icons/view.svg"
                      alt="edit icon"
                      className="size-5"
                    />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
};
