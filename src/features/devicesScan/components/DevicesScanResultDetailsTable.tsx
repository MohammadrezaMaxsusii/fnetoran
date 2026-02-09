import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
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
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  devicesScanResultDetailsTableConstantItems,
  devicesScanResultTableItems,
} from "../constants";
import {
  useDeviceScanResultDetailsFilters,
  useDeviceScanResultFilters,
  useDevicesScanResultQuery,
} from "../hooks";
import { formatLocalDate } from "@/shared/utils/fromatLocalDate";
import { startOfDay } from "date-fns";
import { Input } from "@/components/ui/input";
import ViewIcon from "@/shared/icons/view.svg?react";
import DevicesIcon from "@/shared/icons/devices.svg?react";
import BackIcon from "@/shared/icons/back.svg?react";
import { useNavigate, useParams } from "react-router";
import { TablePagination } from "@/components/TablePagination";
import { useDeviceScanResultDetailsQuery } from "../hooks/useDeviceScanResultDetailsQuery";

type FilterFormValues = {
  createdAt?: string;
  port?: string;
  list_sort?: string;
  list_page?: number;
};

export const DevicesScanResultDetailsTable = () => {
  const id = useParams().id as string;
  const detailsId = useParams().detailsId as string;
  const { filters, updateFilters } = useDeviceScanResultDetailsFilters();
  const { devicesScanResultDetails, devicesScanResultDetailsIsLoading } =
    useDeviceScanResultDetailsQuery(detailsId, filters);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const form = useForm<FilterFormValues>({
    defaultValues: {
      createdAt: filters.createdAt,
      port: filters.port,
      list_sort: filters.list_sort,
      list_page: filters.list_page,
    },
  });

  form.watch((values) => {
    updateFilters(values);
  });

  return (
    <section className="w-full bg-gray-darker rounded-2xl">
      {/* Header of table */}
      <div className="flex items-center justify-between p-7">
        <span className="text-lg font-bold text-primary">
          Scan Result Details
        </span>
        <Button
          variant="secondary"
          className="border border-default p-3"
          onClick={() => navigate(`/devices/scan/${id}`)}
        >
          <BackIcon className="size-5.5" />
          Back to List
        </Button>
      </div>

      <div className="px-7">
        <Separator className="bg-default" />
      </div>

      {/* Filter section */}
      <div className="p-7 flex items-center justify-between">
        <Form {...form}>
          <form className="flex justify-between items-center w-full">
            <FormField
              control={form.control}
              name="port"
              render={({ field }) => (
                <FormItem className="flex items-center">
                  <FormLabel
                    htmlFor="port"
                    className="text-gray-lighter font-normal"
                  >
                    Port:
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="bg-muted"
                      placeholder="Search..."
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />

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

      {/* Scan result details table */}
      {devicesScanResultDetailsIsLoading ? (
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
      ) : devicesScanResultDetails?.data.details.length === 0 ? (
        <section className="w-full bg-gray-darker rounded-2xl space-y-2">
          {/* Empty section */}
          <Empty className="pt-3! pb-7! gap-2">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <DevicesIcon className="size-5" />
              </EmptyMedia>
              <EmptyTitle>Scan Result Details List Empty!</EmptyTitle>
            </EmptyHeader>
            <EmptyContent className="text-sm text-muted-foreground">
              Scan Result Details will appear here once they are added.
            </EmptyContent>
          </Empty>
        </section>
      ) : (
        <div className="px-7 pb-7">
          <Table className="border-separate border-spacing-y-1">
            {/* Table header */}
            <TableHeader>
              <TableRow className="hover:bg-secondary">
                {devicesScanResultDetailsTableConstantItems.map(
                  (devicesScanResultDetailsTableConstantItem) => (
                    <TableHead
                      key={devicesScanResultDetailsTableConstantItem}
                      className="text-center text-sm text-gray-lighter"
                    >
                      {devicesScanResultDetailsTableConstantItem}
                    </TableHead>
                  ),
                )}
              </TableRow>
            </TableHeader>

            {/* Table body */}
            <TableBody>
              {devicesScanResultDetails?.data.details.map(
                (deviceScanResultDetails: any) => (
                  <TableRow
                    key={deviceScanResultDetails.id}
                    className="bg-gray-darker hover:bg-gray-darker odd:bg-gray-items odd:hover:bg-gray-items"
                  >
                    <TableCell className="px-5 py-4 rounded-l-lg text-center font-bold border-y border-s border-default">
                      {deviceScanResultDetails.id}
                    </TableCell>

                    {/* Product section */}
                    <TableCell className="px-4 py-4 text-center border-y border-default">
                      {deviceScanResultDetails.product || "---"}
                    </TableCell>

                    {/* Service section */}
                    <TableCell className="px-4 py-4 text-center border-y border-default">
                      {deviceScanResultDetails.service || "---"}
                    </TableCell>

                    {/* Version section */}
                    <TableCell className="px-4 py-4 text-center border-y border-default">
                      {deviceScanResultDetails.version || "---"}
                    </TableCell>

                    {/* Port section */}
                    <TableCell className="px-4 py-4 text-center border-y border-default">
                      {deviceScanResultDetails.port || "---"}
                    </TableCell>

                    {/* Info section */}
                    <TableCell className="px-4 py-4 text-center border-y border-default">
                      {deviceScanResultDetails.extrainfo || "---"}
                    </TableCell>

                    {/* Created at section */}
                    <TableCell className="w-1/6 px-4 py-4 text-center rounded-r-lg space-x-1.5 border-y border-e border-default">
                      {getDate(deviceScanResultDetails.createdAt)} |{" "}
                      {getTime(deviceScanResultDetails.createdAt)}
                    </TableCell>
                  </TableRow>
                ),
              )}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Pagination section */}
      <TablePagination
        count={devicesScanResultDetails?.count}
        currentPage={filters.list_page}
        updateFilters={updateFilters}
      />
    </section>
  );
};
