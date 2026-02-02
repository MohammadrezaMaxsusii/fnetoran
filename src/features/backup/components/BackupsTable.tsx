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
import { ChevronDownIcon, Download, FunnelX } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatLocalDate } from "@/shared/utils/fromatLocalDate";
import { startOfDay } from "date-fns";
import { DeleteModal } from "@/components/DeleteModal";
import { Input } from "@/components/ui/input";
import DevicesIcon from "@/shared/icons/devices.svg?react";
import { useBackupActions, useBackupsFilters, useBackupsQuery } from "../hooks";
import { backupTableItems } from "../constants";
import type { Backup } from "../types";
import { TablePagination } from "@/components/TablePagination";
import { api } from "@/shared/libs/axiosInstance";

type FilterFormValues = {
  createdAt?: string;
  backups?: string;
  list_sort?: string;
  list_page?: number;
};

export const BackupsTable = () => {
  const { filters, updateFilters } = useBackupsFilters();
  const { backups, backupsIsLoading } = useBackupsQuery(filters);
  const { deleteBackupAction } = useBackupActions();
  const [open, setOpen] = useState(false);
  const form = useForm<FilterFormValues>({
    defaultValues: {
      createdAt: filters.createdAt,
      backups: filters.backups,
      list_sort: filters.list_sort,
      list_page: filters.list_page,
    },
  });

  form.watch((values) => {
    updateFilters(values);
  });

  const onButtonClick = async ({
    name,
    url,
  }: {
    name: string;
    url: string;
  }) => {
    try {
      const response = await api.get(url, {
        responseType: "blob",
        withCredentials: true,
      });

      const blob = response.data;
      const downloadUrl = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = `${name}.cfg`;
      document.body.appendChild(link);
      link.click();

      link.remove();
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error("Download error:", error);
    }
  };

  return (
    <section className="w-full bg-gray-darker rounded-2xl">
      {/* Header of table */}
      <div className="flex items-center justify-between p-7">
        <span className="text-lg font-bold text-primary">Backups List</span>
        {/* <RoleCreateOrUpdate /> */}
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
              name="backups"
              render={({ field }) => (
                <FormItem className="flex items-center">
                  <FormLabel
                    htmlFor="backups"
                    className="text-gray-lighter font-normal"
                  >
                    Backups:
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

      {/* Backups table */}
      {backupsIsLoading ? (
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
      ) : backups?.data.length === 0 ? (
        <section className="w-full bg-gray-darker rounded-2xl space-y-2">
          {/* Empty section */}
          <Empty className="pt-3! pb-7! gap-2">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <DevicesIcon className="size-5" />
              </EmptyMedia>
              <EmptyTitle>Backups List Empty!</EmptyTitle>
            </EmptyHeader>
            <EmptyContent className="text-sm text-muted-foreground">
              Backups will appear here once they are added.
            </EmptyContent>
          </Empty>
        </section>
      ) : (
        <div className="px-7 pb-7">
          <Table className="border-separate border-spacing-y-1">
            {/* Table header */}
            <TableHeader>
              <TableRow className="hover:bg-secondary">
                {backupTableItems.map((backupTableItem) => (
                  <TableHead
                    key={backupTableItem}
                    className="text-center text-sm text-gray-lighter"
                  >
                    {backupTableItem}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>

            {/* Table body */}
            <TableBody>
              {backups?.data.map((backup: Backup) => (
                <TableRow
                  key={backup.id}
                  className="bg-gray-darker hover:bg-gray-darker odd:bg-gray-items odd:hover:bg-gray-items"
                >
                  <TableCell className="px-5 py-2 rounded-l-lg text-center font-bold border-y border-s border-default">
                    {backup.id}
                  </TableCell>

                  {/* Backup ip */}
                  <TableCell className="px-4 py-2 text-center border-y border-default">
                    {backup.device.ip}
                  </TableCell>

                  {/* Backup type */}
                  <TableCell className="px-4 py-2 text-center border-y border-default">
                    {backup.backupType}
                  </TableCell>

                  {/* Backup created at */}
                  <TableCell className="px-4 py-2 text-center border-y border-default">
                    {getDate(backup.createdAt)} | {getTime(backup.createdAt)}
                  </TableCell>

                  {/* Backup type */}
                  <TableCell className="px-4 py-2 text-center border-y border-default">
                    {backup.status}
                  </TableCell>

                  {/* Operation section */}
                  <TableCell className="w-1/8 px-4 py-2 text-center rounded-r-lg space-x-1.5 border-y border-e border-default">
                    {/* Edit backup */}
                    {/* <RoleUpdate role={role} /> */}

                    {/* Delete backup */}
                    <DeleteModal
                      title="Backup"
                      onClick={() => deleteBackupAction.mutate(backup.id)}
                    />

                    {/* cfg extension */}

                    {/* Download backup */}
                    <Button
                      className="p-2.5!"
                      onClick={() =>
                        onButtonClick({
                          name: `backup-${backup.id}`,
                          url: `${import.meta.env.VITE_BACKEND_URL}/devices/backup/download/${Number(backup.id)}`,
                        })
                      }
                    >
                      <Download className="size-5" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Pagination section */}
      <TablePagination
        count={backups?.count}
        currentPage={filters.list_page}
        updateFilters={updateFilters}
      />
    </section>
  );
};
