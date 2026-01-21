import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
// import { useUsersQuery } from "@/features/users/hooks";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import type { Device } from "@/features/devices/types";
// import { getDate, getTime } from "@/shared/utils";
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
import { deviceTableItems } from "../constants";
import { useUsersFilters } from "../hooks/useUsersFilters";
// import { UserDetails } from "./UserDetails";
// import { useRolesQuery } from "@/features/roles/hooks";
// import type { Role } from "@/features/roles/types";
// import { UserDelete } from "./UserDelete";
import { formatLocalDate } from "@/shared/utils/fromatLocalDate";
// import { UserTablePagination } from "./UserTablePagination";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
// import { useNavigate } from "react-router";
import { startOfDay } from "date-fns";
import UsersIcon from "@/shared/icons/users.svg?react";
import {
  useDeviceActions,
  useDevicesQuery,
  useDeviceTypesQuery,
} from "../hooks";
import { DeleteModal } from "@/components/DeleteModal";
import { DeviceCreate } from "./DeviceCreate";

type FilterFormValues = {
  type?: string,
  list_sort?: string;
  list_page?: number;
};

export const DeviceTable = () => {
  const { filters, updateFilters } = useUsersFilters();
  // const { users, usersIsLoading } = useUsersQuery(filters);
  const { devices, devicesIsLoading } = useDevicesQuery(filters);
  const { deleteDeviceAction } = useDeviceActions();
  const { deviceTypes, deviceTypesIsPending } = useDeviceTypesQuery();
  // const navigate = useNavigate();
  // const { roles } = useRolesQuery();
  const [open, setOpen] = useState(false);
  const form = useForm<FilterFormValues>({
    defaultValues: {
      type: filters.type,
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
        <span className="text-lg font-bold text-primary">Devices List</span>

        <DeviceCreate />
        {/* <Button
          onClick={() => {
            navigate("/users/create");
          }}
        >
          <img src="/icons/plus.svg" alt="add icon" />
          Add device
        </Button> */}
      </div>

      <div className="px-7">
        <Separator className="bg-default" />
      </div>

      {/* Filter section */}
      <div className="p-7 flex items-center justify-between">
        <Form {...form}>
          <form className="flex justify-between items-center w-full">
            {/* <div className="flex items-center gap-4">
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
            </div> */}

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

            {!deviceTypesIsPending && (
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem className="flex items-center">
                    <FormLabel
                      htmlFor="roleId"
                      className="text-gray-lighter font-normal"
                    >
                      Device Type:
                    </FormLabel>

                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger
                          id="role"
                          className="w-45 bg-muted border-default opacity-100! [&_svg:not([class*='text-'])]:text-foreground [&_svg:not([class*='text-'])]:opacity-100"
                        >
                          <SelectValue placeholder="Select device type" />
                        </SelectTrigger>

                        <SelectContent>
                          {Object.keys(deviceTypes?.data).map(
                            (deviceType: string) => (
                              <SelectItem
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
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

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

      {/* Device table */}
      {devicesIsLoading ? (
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
                      <Skeleton className="h-4 w-11" />

                      <Skeleton className="h-4 w-25" />
                      <Skeleton className="h-4 w-25" />
                      <Skeleton className="h-4 w-25" />
                      <Skeleton className="h-4 w-25" />
                      <Skeleton className="h-4 w-25" />
                      <Skeleton className="h-4 w-25" />

                      <div className="flex items-center gap-2">
                        <Skeleton className="size-8" />
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
      ) : devices?.data.length === 0 ? (
        <>
          <Empty className="pt-3! pb-7! gap-2">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <UsersIcon className="size-5" />
              </EmptyMedia>
              <EmptyTitle>Devices List Empty!</EmptyTitle>
            </EmptyHeader>
            <EmptyContent className="text-sm text-muted-foreground">
              Devices will appear here once they are added.
            </EmptyContent>
          </Empty>
        </>
      ) : (
        <div className="px-7 pb-7">
          <Table className="border-separate border-spacing-y-1">
            {/* Table header */}
            <TableHeader>
              <TableRow className="hover:bg-secondary">
                {deviceTableItems.map((deviceTableItem) => (
                  <TableHead
                    key={deviceTableItem}
                    className="text-center text-sm text-gray-lighter"
                  >
                    {deviceTableItem}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>

            <TableBody>
              {devices?.data.map((device: Device) => (
                <TableRow
                  key={device.id}
                  className="bg-gray-darker hover:bg-gray-darker odd:bg-gray-items odd:hover:bg-gray-items"
                >
                  <TableCell className="px-5 py-2 rounded-l-lg text-center font-bold border-y border-s border-default">
                    {device.id}
                  </TableCell>

                  <TableCell className="px-4 py-2 text-center border-y border-default">
                    {device.type}
                  </TableCell>

                  <TableCell className="px-4 py-2 text-center border-y border-default">
                    {device.model || "-"}
                  </TableCell>

                  <TableCell className="px-4 py-2 text-center border-y border-default">
                    {device.ip}
                  </TableCell>

                  <TableCell className="px-4 py-2 text-center border-y border-default">
                    {device.portCount ?? "-"}
                  </TableCell>

                  <TableCell className="px-4 py-2 text-center border-y border-default">
                    {device.hostname ?? "-"}
                  </TableCell>

                  <TableCell className="px-4 py-2 text-center border-y border-default">
                    {device.series ?? "-"}
                  </TableCell>

                  <TableCell className="px-4 py-2 text-center rounded-r-lg space-x-1.5 border-y border-e border-default">
                    <Button className="bg-navy-blue hover:bg-navy-blue border text-blue-darker border-blue-darker p-2.5!">
                      <img
                        src="/icons/edit.svg"
                        alt="edit icon"
                        className="size-5"
                      />
                    </Button>

                    <DeleteModal
                      title="Device"
                      onClick={() => deleteDeviceAction.mutate(device.id)}
                    />

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
      )}
    </section>
  );
};
