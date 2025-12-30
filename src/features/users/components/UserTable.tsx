import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useUsersQuery } from "@/features/users/hooks";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
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
import { useEffect, useState } from "react";
import { MultiSelect } from "@/components/ui/multiSelect";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQueryClient } from "@tanstack/react-query";
import { userTableItems } from "../constants";
import { useUsersFilters } from "../hooks/useUsersFilters";

type FilterFormValues = {
  active: boolean;
  inactive: boolean;
  date?: Date;
  role: string;
  sort: string;
};

export const UserTable = () => {
  const { filters, updateFilters } = useUsersFilters();
  const { users, usersIsLoading } = useUsersQuery(filters);
  const [open, setOpen] = useState(false);
  const form = useForm<FilterFormValues>({
    defaultValues: {
      active: false,
      inactive: false,
      date: undefined,
      role: "",
    },
  });
  const { active, inactive, date, role, sort } = form.watch();

  useEffect(() => {}, [active, inactive, date, role, sort]);

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
            {Array.from({ length: 8 }).map((_, index) => (
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
          <form
            onSubmit={form.handleSubmit(() => console.log("sss"))}
            className="flex justify-between items-center w-full"
          >
            <div className="flex items-center gap-4">
              <span className="text-gray-lighter text-sm">User Status: </span>
              <FormField
                control={form.control}
                name="active"
                render={({ field }) => (
                  <FormItem className="flex items-center">
                    <FormControl>
                      <Checkbox
                        id="active"
                        checked={field.value}
                        onCheckedChange={(checked) => {
                          field.onChange(checked);
                          if (checked) {
                            form.setValue("inactive", false);
                          }
                        }}
                      />
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
                render={({ field }) => (
                  <FormItem className="flex items-center">
                    <FormControl>
                      <Checkbox
                        id="inactive"
                        checked={field.value}
                        onCheckedChange={(checked) => {
                          field.onChange(checked);
                          if (checked) {
                            form.setValue("active", false);
                          }
                        }}
                      />
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
              render={({ field }) => (
                <FormItem className="flex items-center">
                  <FormLabel
                    htmlFor="date"
                    className="text-gray-lighter font-normal"
                  >
                    Date:
                  </FormLabel>
                  <FormControl>
                    <Popover open={open} onOpenChange={setOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          id="date"
                          className="bg-muted hover:bg-muted/75 border border-default w-48 justify-between font-normal"
                        >
                          {field.value ? (
                            getDate(field.value.toISOString())
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
                          onSelect={(value) => {
                            field.onChange(value);
                            setOpen(false);
                          }}
                          classNames={{
                            day_button: "hover:bg-primary hover:text-white",
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

            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem className="flex items-center">
                  <FormLabel
                    htmlFor="role"
                    className="text-gray-lighter font-normal"
                  >
                    Role:
                  </FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger
                        id="role"
                        className="w-45 bg-muted border-default opacity-100! [&_svg:not([class*='text-'])]:text-foreground [&_svg:not([class*='text-'])]:opacity-100"
                      >
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem
                          value="1"
                          className="hover:bg-primary! hover:text-foreground! [&_svg:not([class*='text-'])]:text-forground"
                        >
                          1
                        </SelectItem>
                        <SelectItem
                          value="2"
                          className="hover:bg-primary! hover:text-foreground! [&_svg:not([class*='text-'])]:text-forground"
                        >
                          2
                        </SelectItem>
                        <SelectItem
                          value="3"
                          className="hover:bg-primary! hover:text-foreground! [&_svg:not([class*='text-'])]:text-forground"
                        >
                          3
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="sort"
              render={({ field }) => (
                <FormItem className="flex items-center">
                  <FormLabel
                    htmlFor="sort"
                    className="text-gray-lighter font-normal"
                  >
                    Sort By:
                  </FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger
                        id="sort"
                        className="w-45 bg-muted border-default opacity-100! [&_svg:not([class*='text-'])]:text-foreground [&_svg:not([class*='text-'])]:opacity-100"
                      >
                        <SelectValue placeholder="Select sort" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem
                          value="1"
                          className="hover:bg-primary! hover:text-foreground! [&_svg:not([class*='text-'])]:text-forground"
                        >
                          1
                        </SelectItem>
                        <SelectItem
                          value="2"
                          className="hover:bg-primary! hover:text-foreground! [&_svg:not([class*='text-'])]:text-forground"
                        >
                          2
                        </SelectItem>
                        <SelectItem
                          value="3"
                          className="hover:bg-primary! hover:text-foreground! [&_svg:not([class*='text-'])]:text-forground"
                        >
                          3
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>

      {/* User table */}
      <div className="px-7 pb-7">
        <Table>
          {/* Table header */}
          <TableHeader>
            <TableRow className="hover:bg-secondary">
              {userTableItems.map((userTableItem) => (
                <TableHead className="text-center text-sm text-gray-lighter">{userTableItem}</TableHead>
              ))}
            </TableRow>
          </TableHeader>

          {/* Table body */}
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
                      <span className="text-sm font-bold capitalize">
                        {user.firstName + " " + user.lastName}
                      </span>
                      <span className="text-xs text-gray-lighter lowercase">
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
