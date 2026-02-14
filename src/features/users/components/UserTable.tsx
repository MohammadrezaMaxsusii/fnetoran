import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useUserActions, useUsersQuery } from "@/features/users/hooks";
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
import { ChevronDownIcon, FunnelX } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { userTableItems } from "../constants";
import { useUsersFilters } from "../hooks/useUsersFilters";
import { UserDetails } from "./UserDetails";
import { useRolesQuery } from "@/features/roles/hooks";
import type { Role } from "@/features/roles/types";
import { formatLocalDate } from "@/shared/utils/fromatLocalDate";
import { TablePagination } from "@/components/TablePagination";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router";
import { startOfDay } from "date-fns";
import UsersIcon from "@/shared/icons/users.svg?react";
import { DeleteModal } from "@/components/DeleteModal";
import EditIcon from "@/shared/icons/edit.svg?react";
import { UserAvatar } from "./UserAvatar";
import { toast } from "sonner";

type FilterFormValues = {
  active?: boolean;
  createdAt?: string;
  roleId?: string;
  list_sort?: string;
  list_page?: number;
};

export const UserTable = () => {
  const { filters, updateFilters } = useUsersFilters();
  const { users, usersIsLoading } = useUsersQuery(filters);
  const { deleteUserAction } = useUserActions();
  const navigate = useNavigate();
  const { roles } = useRolesQuery();
  const [open, setOpen] = useState(false);
  const form = useForm<FilterFormValues>({
    defaultValues: {
      active: filters.active,
      createdAt: filters.createdAt,
      roleId: filters.roleId,
      list_sort: filters.list_sort,
      list_page: filters.list_page,
    },
  });

  useEffect(() => {
    const subscription = form.watch((values) => {
      updateFilters(values);
    });

    return () => subscription.unsubscribe();
  }, [form, updateFilters]);

  return (
    <section className="w-full bg-gray-darker rounded-2xl">
      {/* Header of table */}
      <div className="flex items-center justify-between p-7">
        <span className="text-lg font-bold text-primary">Users List</span>
        <Button
          onClick={() => {
            navigate("/users/create");
          }}
        >
          <img src="/icons/plus.svg" alt="add icon" />
          Add user
        </Button>
      </div>

      <div className="px-7">
        <Separator className="bg-default" />
      </div>

      {/* Filter section */}
      <div className="p-7 flex items-center justify-between">
        <Form {...form}>
          <form className="flex justify-between items-center w-full">
            <div className="flex items-center gap-4">
              <span className="text-gray-lighter text-sm">User Status: </span>
              <FormField
                control={form.control}
                name="active"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-6">
                    <FormControl>
                      <RadioGroup
                        value={
                          field.value === undefined ? "" : String(field.value)
                        }
                        onValueChange={(value) => {
                          field.onChange(value);
                        }}
                        className="flex space-x-4"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="true" id="active-true" />
                          <Label htmlFor="active-true">Active</Label>
                        </div>

                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="false" id="active-false" />
                          <Label htmlFor="active-false">Inactive</Label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="createdAt"
              render={({ field }) => (
                <FormItem className="flex items-center">
                  <FormLabel
                    htmlFor="createdAt"
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
                          disabled={(date) => date > startOfDay(new Date())}
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
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="roleId"
              render={({ field }) => (
                <FormItem className="flex items-center">
                  <FormLabel
                    htmlFor="roleId"
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
                        {roles?.data.map((role: Role) => (
                          <SelectItem
                            key={role.id}
                            value={String(role.id)}
                            className="hover:bg-primary! hover:text-foreground! [&_svg:not([class*='text-'])]:text-forground"
                          >
                            {role.name}
                          </SelectItem>
                        ))}
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
              name="list_sort"
              render={({ field }) => (
                <FormItem className="flex items-center">
                  <FormLabel
                    htmlFor="list_sort"
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
                          value="asc"
                          className="hover:bg-primary! hover:text-foreground! [&_svg:not([class*='text-'])]:text-forground"
                        >
                          Asecending
                        </SelectItem>
                        <SelectItem
                          value="desc"
                          className="hover:bg-primary! hover:text-foreground! [&_svg:not([class*='text-'])]:text-forground"
                        >
                          Descending
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="button"
              variant="secondary"
              size="icon"
              className="border border-red bg-red-darker hover:bg-red-darker"
              onClick={() => form.reset()}
            >
              <FunnelX className="text-red" />
            </Button>
          </form>
        </Form>
      </div>

      {/* User table */}
      {usersIsLoading ? (
        <section className="w-full bg-gray-darker rounded-2xl">
          <Table>
            <TableBody className="flex flex-col gap-1 px-7 pb-7">
              {Array.from({ length: 8 }).map((_, index) => (
                <TableRow
                  key={index}
                  className="bg-gray-darker hover:bg-gray-darker odd:bg-gray-items odd:hover:bg-gray-items rounded-lg border border-default last:border!"
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
      ) : users?.data.length === 0 ? (
        <>
          {/* Empty section */}
          <Empty className="pt-3! pb-7! gap-2">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <UsersIcon className="size-5" />
              </EmptyMedia>
              <EmptyTitle>Users List Empty!</EmptyTitle>
            </EmptyHeader>
            <EmptyContent className="text-sm text-muted-foreground">
              Users will appear here once they are added.
            </EmptyContent>
          </Empty>
        </>
      ) : (
        <div className="px-7 pb-7">
          <Table className="border-separate border-spacing-y-1">
            {/* Table header */}
            <TableHeader>
              <TableRow className="hover:bg-secondary">
                {userTableItems.map((userTableItem) => (
                  <TableHead
                    key={userTableItem}
                    className="text-center text-sm text-gray-lighter"
                  >
                    {userTableItem}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>

            {/* Table body */}
            <TableBody>
              {users?.data.map((user: User) => (
                <TableRow
                  key={user.id}
                  className="bg-gray-darker hover:bg-gray-darker odd:bg-gray-items odd:hover:bg-gray-items"
                >
                  <TableCell className="px-5 py-2 rounded-l-lg text-center font-bold border-y border-s border-default">
                    {user.id}
                  </TableCell>

                  {/* User info */}
                  <TableCell className="px-4 py-2 border-y border-default">
                    <div className="flex items-center gap-4">
                      <UserAvatar profileId={user.profileId} />

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
                  <TableCell className="px-4 py-2 text-center border-y border-default">
                    {user.role.name}
                  </TableCell>

                  {/* User register time */}
                  <TableCell className="px-4 py-2 text-center border-y border-default">
                    {getDate(user.createdAt)} | {getTime(user.createdAt)}
                  </TableCell>

                  {/* User status */}
                  <TableCell className="px-4 py-2 text-start border-y border-default">
                    {user.active ? (
                      <div className="flex items-center justify-center gap-1">
                        <div className="w-3 h-3 bg-green rounded-full" />
                        <span>Active</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-1">
                        <div className="w-3 h-3 bg-red rounded-full" />
                        <span>Inactive</span>
                      </div>
                    )}
                  </TableCell>

                  {/* Operation section */}
                  <TableCell className="w-1/5 px-4 py-2 text-center rounded-r-lg space-x-1.5 border-y border-e border-default">
                    {/* edit user */}
                    <Button
                      className="bg-navy-blue hover:bg-navy-blue text-blue-darker border border-blue-darker px-6"
                      onClick={() => navigate(`/users/update/${user.id}`)}
                    >
                      <EditIcon className="size-5" />
                      Edit User
                    </Button>

                    {/* delete user */}
                    <DeleteModal
                      title="User"
                      isLoading={deleteUserAction.isPending}
                      onClick={() =>
                        deleteUserAction.mutate(
                          { userId: user.id },
                          {
                            onSuccess: (data) => {
                              toast.success(data.message);
                            },
                            onError: (error) => {
                              if (error instanceof Array)
                                toast.error(error[0].message);
                            },
                          },
                        )
                      }
                    />

                    {/* view user */}
                    <UserDetails user={user} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Pagination section */}
      <TablePagination
        count={users?.count}
        currentPage={filters.list_page}
        updateFilters={updateFilters}
      />
    </section>
  );
};
