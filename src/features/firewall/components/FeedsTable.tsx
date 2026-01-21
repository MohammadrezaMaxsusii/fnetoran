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
import { FunnelX } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DeleteModal } from "@/components/DeleteModal";
import { Input } from "@/components/ui/input";
import FirewallIcon from "@/shared/icons/firewall.svg?react";
import EditIcon from "@/shared/icons/edit.svg?react";
import { useFeedsFilters, useFeedsQuery } from "../hooks";
import { feedTableItems } from "../constants";
import { FeedCreate } from "./FeedCreate";
import type { Feed } from "../types/feedType";
import { useFeedActions } from "../hooks/useFeedActions";
import { FeedDetails } from "./FeedDetails";
import { TablePagination } from "@/components/TablePagination";

type FilterFormValues = {
  feed?: string;
  active?: string;
  type?: string;
  list_sort?: string;
  list_page?: number;
};

export const FeedsTable = () => {
  const { filters, updateFilters } = useFeedsFilters();
  const { feeds, feedsIsPending } = useFeedsQuery(filters);
  const { deleteFeedAction } = useFeedActions();
  const form = useForm<FilterFormValues>({
    defaultValues: {
      feed: filters.feed,
      active: filters.active,
      type: filters.type,
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
        <span className="text-lg font-bold text-primary">Feeds List</span>
        <FeedCreate />
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
              name="feed"
              render={({ field }) => (
                <FormItem className="flex items-center">
                  <FormLabel
                    htmlFor="feed"
                    className="text-gray-lighter font-normal"
                  >
                    Feed:
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
              name="active"
              render={({ field }) => (
                <FormItem className="flex items-center">
                  <FormLabel
                    htmlFor="active"
                    className="text-gray-lighter font-normal"
                  >
                    Status:
                  </FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger
                        id="status"
                        className="w-45 bg-muted border-default opacity-100! [&_svg:not([class*='text-'])]:text-foreground [&_svg:not([class*='text-'])]:opacity-100"
                      >
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem
                          value="true"
                          className="hover:bg-primary! hover:text-foreground! [&_svg:not([class*='text-'])]:text-forground"
                        >
                          True
                        </SelectItem>
                        <SelectItem
                          value="false"
                          className="hover:bg-primary! hover:text-foreground! [&_svg:not([class*='text-'])]:text-forground"
                        >
                          False
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
              name="type"
              render={({ field }) => (
                <FormItem className="flex items-center">
                  <FormLabel
                    htmlFor="type"
                    className="text-gray-lighter font-normal"
                  >
                    Type:
                  </FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger
                        id="type"
                        className="w-45 bg-muted border-default opacity-100! [&_svg:not([class*='text-'])]:text-foreground [&_svg:not([class*='text-'])]:opacity-100"
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

      {/* Feed table */}
      {feedsIsPending ? (
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
      ) : feeds?.data.length === 0 ? (
        <section className="w-full bg-gray-darker rounded-2xl space-y-2">
          {/* Empty section */}
          <Empty className="pt-3! pb-7! gap-2">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <FirewallIcon className="size-5" />
              </EmptyMedia>
              <EmptyTitle>Feeds List Empty!</EmptyTitle>
            </EmptyHeader>
            <EmptyContent className="text-sm text-muted-foreground">
              Feeds will appear here once they are added.
            </EmptyContent>
          </Empty>
        </section>
      ) : (
        <div className="px-7 pb-7">
          <Table className="border-separate border-spacing-y-1">
            {/* Table header */}
            <TableHeader>
              <TableRow className="hover:bg-secondary">
                {feedTableItems.map((feedTableItem) => (
                  <TableHead
                    key={feedTableItem}
                    className="text-center text-sm text-gray-lighter"
                  >
                    {feedTableItem}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>

            {/* Table body */}
            <TableBody>
              {feeds?.data.map((feed: Feed) => (
                <TableRow
                  key={feed.id}
                  className="bg-gray-darker hover:bg-gray-darker odd:bg-gray-items odd:hover:bg-gray-items"
                >
                  <TableCell className="px-5 py-2 rounded-l-lg text-center font-bold border-y border-s border-default">
                    {feed.id}
                  </TableCell>

                  {/* Feed IP */}
                  <TableCell className="px-4 py-2 text-center border-y border-default">
                    {feed.item}
                  </TableCell>

                  {/* Feed */}
                  <TableCell className="px-4 py-2 text-center border-y border-default">
                    {feed.fileName || "---"}
                  </TableCell>

                  {/* Feed type */}
                  <TableCell className="px-4 py-2 text-center border-y border-default capitalize">
                    {feed.type || "---"}
                  </TableCell>

                  {/* Feed created at */}
                  <TableCell className="px-4 py-2 text-center border-y border-default">
                    {getDate(feed.createdAt)} | {getTime(feed.createdAt)}
                  </TableCell>

                  {/* Feed status */}
                  <TableCell className="px-4 py-2 text-center border-y border-default">
                    {feed.active ? (
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
                  <TableCell className="w-1/4 px-4 py-2 text-center rounded-r-lg space-x-1.5 border-y border-e border-default">
                    {/* edit feed */}
                    <Button className="bg-navy-blue hover:bg-navy-blue text-blue-darker border border-blue-darker px-6">
                      <EditIcon className="size-5 text-blue-darker" />
                      Edit Feed
                    </Button>

                    {/* Delete feed */}
                    <DeleteModal
                      title="Feed"
                      onClick={() => deleteFeedAction.mutateAsync(feed.id)}
                    />

                    {/* View feed */}
                    <FeedDetails feed={feed} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Pagination section */}
      <TablePagination
        count={feeds?.count}
        currentPage={filters.list_page}
        updateFilters={updateFilters}
      />
    </section>
  );
};
