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
import { FunnelX } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import FirewallIcon from "@/shared/icons/firewall.svg?react";
import { useZonesFilters, useZoneActions, useZonesQuery } from "../hooks";
import { zoneTableItems } from "../constants";
import { ZoneCreate } from "./ZoneCreate";
import type { Zone } from "../types/zoneType";
import { TablePagination } from "@/components/TablePagination";
import { getDate, getTime } from "@/shared/utils";
import { DeleteModal } from "@/components/DeleteModal";
import { ZoneUpdate } from "./ZoneUpdate";

type FilterFormValues = {
  zone?: string;
  list_sort?: string;
  list_page?: number;
};

export const ZonesTable = () => {
  const { filters, updateFilters } = useZonesFilters();
  const { zones, zonesIsPending } = useZonesQuery(filters);
  const { deleteZoneAction } = useZoneActions();
  const form = useForm<FilterFormValues>({
    defaultValues: {
      zone: filters.zone,
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
        <span className="text-lg font-bold text-primary">Zones List</span>
        <ZoneCreate />
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
              name="zone"
              render={({ field }) => (
                <FormItem className="flex items-center">
                  <FormLabel
                    htmlFor="zone"
                    className="text-gray-lighter font-normal"
                  >
                    Zone:
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

      {/* Zone table */}
      {zonesIsPending ? (
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
      ) : zones?.data.length === 0 ? (
        <section className="w-full bg-gray-darker rounded-2xl space-y-2">
          {/* Empty section */}
          <Empty className="pt-3! pb-7! gap-2">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <FirewallIcon className="size-5" />
              </EmptyMedia>
              <EmptyTitle>Zones List Empty!</EmptyTitle>
            </EmptyHeader>
            <EmptyContent className="text-sm text-muted-foreground">
              Zones will appear here once they are added.
            </EmptyContent>
          </Empty>
        </section>
      ) : (
        <div className="px-7 pb-7">
          <Table className="border-separate border-spacing-y-1">
            {/* Table header */}
            <TableHeader>
              <TableRow className="hover:bg-secondary">
                {zoneTableItems.map((zoneTableItem) => (
                  <TableHead
                    key={zoneTableItem}
                    className="text-center text-sm text-gray-lighter"
                  >
                    {zoneTableItem}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>

            {/* Table body */}
            <TableBody>
              {zones?.data.map((zone: Zone) => (
                  <TableRow
                    key={zone.id}
                    className="bg-gray-darker hover:bg-gray-darker odd:bg-gray-items odd:hover:bg-gray-items"
                  >
                    <TableCell className="px-5 py-2 rounded-l-lg text-center font-bold border-y border-s border-default">
                      {zone.id}
                    </TableCell>

                    <TableCell className="px-4 py-2 text-center border-y border-default">
                      {zone.name}
                    </TableCell>

                    <TableCell className="px-4 py-2 text-center border-y border-default">
                      {zone.description || "-"}
                    </TableCell>

                    <TableCell className="px-4 py-2 text-center border-y border-default">
                      {getDate(zone.createdAt)} | {getTime(zone.createdAt)}
                    </TableCell>

                    {/* Operation section */}
                    <TableCell className="w-1/4 px-4 py-2 text-center rounded-r-lg space-x-1.5 border-y border-e border-default">
                      {/* edit zone */}
                      <ZoneUpdate currentZone={zone} />

                      {/* Delete zone */}
                      <DeleteModal
                        title="Zone"
                        onClick={() => deleteZoneAction.mutateAsync(zone.id)}
                      />
                    </TableCell>
                  </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Pagination section */}
      <TablePagination
        count={zones?.count}
        currentPage={zones?.list_page}
        updateFilters={updateFilters}
      />
    </section>
  );
};
