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
import {
  useApproveIp,
  useFeedsFilters,
  useFeedsQuery,
  useGetExecuteApis,
  useRejectIp,
} from "../hooks";
import { TablePagination } from "@/components/TablePagination";
import type { API } from "../types/apiType";
import { toast } from "sonner";
import { pendingApiTableItems } from "../constants/pendingApiTableConstant";
import { Spinner } from "@/components/ui/spinner";
import { executeApiTableItems } from "../constants";

type FilterFormValues = {
  feed?: string;
  active?: string;
  type?: string;
  list_sort?: string;
  list_page?: number;
};

export const ExecuteIPsTable = () => {
  const { filters, updateFilters } = useFeedsFilters();
  const { feeds, feedsIsPending } = useFeedsQuery(filters);
  const { executeApis, executeApisLoading } = useGetExecuteApis();
  // const { deleteFeedAction } = useFeedActions();
  // const { mutateAsync: approveIp, isPending: pendingApprove } = useApproveIp();
  // const { mutateAsync: rejectApi, isPending: pendingReject } = useRejectIp();
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

  // const handleApproveIp = async (id: number) => {
  //   try {
  //     await approveIp(id);
  //   } catch (error) {
  //     toast.error(error.detail);
  //   }
  // };

  // const handleRejectIp = async (id: number) => {
  //   try {
  //     await rejectApi(id);
  //   } catch (error) {
  //     toast.error(error.detail);
  //   }
  // };

  return (
    <section className="w-full bg-gray-darker rounded-2xl">
      {/* Header of table */}
      <div className="flex items-center justify-between p-7">
        <span className="text-lg font-bold text-primary">Log IP List</span>
        {/* <IPCreate /> */}
      </div>

      <div className="px-7">
        <Separator className="bg-default" />
      </div>

      {/* Feed table */}
      {executeApisLoading ? (
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
      ) : executeApis?.data.length === 0 ? (
        <section className="w-full bg-gray-darker rounded-2xl space-y-2">
          {/* Empty section */}
          <Empty className="pt-3! pb-7! gap-2">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <FirewallIcon className="size-5" />
              </EmptyMedia>
              <EmptyTitle>IP List Empty!</EmptyTitle>
            </EmptyHeader>
            <EmptyContent className="text-sm text-muted-foreground">
              IPs will appear here once they are added.
            </EmptyContent>
          </Empty>
        </section>
      ) : (
        <div className="px-7 pb-7">
          <Table className="border-separate border-spacing-y-1">
            {/* Table header */}
            <TableHeader>
              <TableRow className="hover:bg-secondary">
                {executeApiTableItems.map((feedTableItem) => (
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
              {executeApis?.data.map((api: API) => (
                <TableRow
                  key={api.id}
                  className="bg-gray-darker hover:bg-gray-darker odd:bg-gray-items odd:hover:bg-gray-items"
                >
                  <TableCell className="px-5 py-2 rounded-l-lg text-center font-bold border-y border-s border-default">
                    {api.id}
                  </TableCell>

                  <TableCell className="px-4 py-2 text-center border-y border-default">
                    {api.ipAddress}
                  </TableCell>

                  <TableCell className="px-4 py-2 text-center border-y border-default">
                    {api.errorMessage}
                  </TableCell>

                  {/* <TableCell className="px-4 py-2 text-center border-y border-default">
                    {api.executedAt
                      ? getDate(api.executedAt) | getTime(api.executedAt)
                      : "-"}
                  </TableCell> */}

                  <TableCell className="px-4 py-2 text-center border-y border-default">
                    {api.device.ip}
                  </TableCell>

                  <TableCell className="px-4 py-2 text-start border-y border-default">
                    {api.status === "approved" ? (
                      <div className="flex items-center justify-center gap-1">
                        <div className="w-3 h-3 bg-green rounded-full" />
                        <span>{api.status}</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-1">
                        <div className="w-3 h-3 bg-red rounded-full" />
                        <span>{api.status}</span>
                      </div>
                    )}
                  </TableCell>

                  <TableCell className="px-4 py-2 text-center border-y border-default">
                    {api.action}
                  </TableCell>

                  <TableCell className="px-4 py-2 text-center border-y border-default">
                    {api.zones}
                  </TableCell>

                  <TableCell className="px-4 py-2 text-center border-y border-default">
                    {api.approvalStatus}
                  </TableCell>

                  <TableCell className="px-4 py-2 text-center border-y border-default">
                    {api.requestedBy}
                  </TableCell>

                  <TableCell className="px-4 py-2 text-center border-y border-default">
                    {api.approver}
                  </TableCell>

                  <TableCell className="px-4 py-2 text-center border-y border-default">
                    {api.evidence || "-"}
                  </TableCell>

                  <TableCell className="px-4 py-2 text-center border-y border-default">
                    {api.attackType}
                  </TableCell>

                  {/* Feed created at */}
                  <TableCell className="px-4 py-2 text-center border-y border-default">
                    {getDate(api.createdAt)} | {getTime(api.createdAt)}
                  </TableCell>

                  {/* Operation section */}
                  <TableCell className="w-1/4 px-4 py-2 text-center rounded-r-lg space-x-1.5 border-y border-e border-default">
                    {/* edit feed */}
                    {/* <Button
                      className="bg-navy-blue hover:bg-navy-blue text-blue-darker border border-blue-darker px-6"
                      onClick={() => handleApproveIp(api.id)}
                      disabled={pendingApprove}
                    >
                      {pendingApprove ? <Spinner /> : "Approve"}
                    </Button> */}

                    {/* <Button
                      className="bg-red-darker hover:bg-red-darker text-red-500 border border-red px-6"
                      onClick={() => handleRejectIp(api.id)}
                      disabled={pendingReject}
                    >
                      {pendingReject ? <Spinner /> : "Reject"}
                    </Button> */}
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
