import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useOrganizationActions,
  useOrganizationsQuery,
  useOrganizationsFilters,
} from "@/features/organization/hooks";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import type { Organization } from "../types";
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
import { organizationTableItems } from "../constants";
import { formatLocalDate } from "@/shared/utils/fromatLocalDate";
import { startOfDay } from "date-fns";
import { DeleteModal } from "@/components/DeleteModal";
import { Input } from "@/components/ui/input";
import OrganizationsIcon from "@/shared/icons/organizations.svg?react";
import { TablePagination } from "@/components/TablePagination";
import { OrganizationCreate } from "./OrganizationCreate";
import { OrganizationUpdate } from "./OrganizationUpdate";
import { toast } from "sonner";
import { Avatar } from "@/features/users/components";
import ViewIcon from "@/shared/icons/view.svg?react";
import { useNavigate } from "react-router";

type FilterFormValues = {
  createdAt: string;
  search: string;
  list_sort: string;
  list_page: number;
};

export const OrganizationsTable = () => {
  const navigate = useNavigate();
  const { filters, updateFilters } = useOrganizationsFilters();
  const { organizations, organizationsIsLoading } =
    useOrganizationsQuery(filters);
  const { deleteOrganizationAction } = useOrganizationActions();
  const [open, setOpen] = useState(false);
  const form = useForm<FilterFormValues>({
    defaultValues: {
      createdAt: filters.createdAt,
      search: filters.search,
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
          Organizations List
        </span>
        <OrganizationCreate />
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
              name="search"
              render={({ field }) => (
                <FormItem className="flex items-center">
                  <FormLabel
                    htmlFor="search"
                    className="text-gray-lighter font-normal"
                  >
                    Organization:
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

      {/* Organization table */}
      {organizationsIsLoading ? (
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
      ) : organizations?.data.length === 0 ? (
        <section className="w-full bg-gray-darker rounded-2xl space-y-2">
          {/* Empty section */}
          <Empty className="pt-3! pb-7! gap-2">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <OrganizationsIcon className="size-5" />
              </EmptyMedia>
              <EmptyTitle>Organizations List Empty!</EmptyTitle>
            </EmptyHeader>
            <EmptyContent className="text-sm text-muted-foreground">
              Organizations will appear here once they are added.
            </EmptyContent>
          </Empty>
        </section>
      ) : (
        <div className="px-7 pb-7">
          <Table className="border-separate border-spacing-y-1">
            {/* Table header */}
            <TableHeader>
              <TableRow className="hover:bg-secondary">
                {organizationTableItems.map((organizationTableItem) => (
                  <TableHead
                    key={organizationTableItem}
                    className="text-center text-sm text-gray-lighter"
                  >
                    {organizationTableItem}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>

            {/* Table body */}
            <TableBody>
              {organizations?.data.map((organization: Organization) => (
                <TableRow
                  key={organization.id}
                  className="bg-gray-darker hover:bg-gray-darker odd:bg-gray-items odd:hover:bg-gray-items"
                >
                  <TableCell className="px-5 py-2 rounded-l-lg text-center font-bold border-y border-s border-default">
                    {organization.id}
                  </TableCell>

                  {/* Organization info */}
                  <TableCell className="px-4 py-2 border-y border-default">
                    <div className="flex items-center gap-4">
                      <div className="border-2 border-orange rounded-full size-8">
                        {organization.logo ? (
                          <Avatar avatarId={organization.logo} />
                        ) : (
                          <img
                            src="/icons/user.svg"
                            alt="profile image"
                            className="size-full rounded-full object-cover"
                          />
                        )}
                      </div>

                      <div className="flex flex-col">
                        <span className="text-sm font-bold capitalize">
                          {organization.name}
                        </span>
                        <span className="text-xs text-gray-lighter lowercase">
                          {organization.email}
                        </span>
                      </div>
                    </div>
                  </TableCell>

                  {/* Organization phone */}
                  <TableCell className="px-4 py-2 text-center border-y border-default">
                    {organization.phone || "---"}
                  </TableCell>

                  {/* Organization address */}
                  <TableCell className="px-4 py-2 text-center border-y border-default">
                    {organization.address || "---"}
                  </TableCell>

                  {/* Organization code */}
                  <TableCell className="px-4 py-2 text-center border-y border-default">
                    {organization.code || "---"}
                  </TableCell>

                  {/* Organization national id */}
                  <TableCell className="px-4 py-2 text-center border-y border-default">
                    {organization.national_id || "---"}
                  </TableCell>

                  {/* Organization website */}
                  <TableCell className="px-4 py-2 text-center border-y border-default">
                    {organization.website || "---"}
                  </TableCell>

                  {/* Operation section */}
                  <TableCell className="w-1/4 px-4 py-2 text-center rounded-r-lg space-x-1.5 border-y border-e border-default">
                    {/* Edit organization */}
                    <OrganizationUpdate organization={organization} />

                    {/* Delete organization */}
                    <DeleteModal
                      title="Organization"
                      isLoading={deleteOrganizationAction.isPending}
                      onClick={() =>
                        deleteOrganizationAction.mutate(organization.id, {
                          onSuccess: (data) => {
                            toast.success(data.message);
                          },
                          onError: (error) => {
                            if (error instanceof Array)
                              toast.error(error[0].message);
                          },
                        })
                      }
                    />

                    {/* Departments of organization */}
                    <Button
                      className="p-2.5!"
                      onClick={() => navigate(`/adminstration/departments/${organization.id}`)}
                    >
                      <ViewIcon className="size-5" />
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
        count={organizations?.count}
        currentPage={filters.list_page}
        updateFilters={updateFilters}
      />
    </section>
  );
};
