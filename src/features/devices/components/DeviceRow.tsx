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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDownIcon, FunnelX, EllipsisIcon } from "lucide-react";
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
import { formatLocalDate } from "@/shared/utils/fromatLocalDate";
import { startOfDay } from "date-fns";
import UsersIcon from "@/shared/icons/users.svg?react";
import {
  useDeviceActions,
  useDevicesQuery,
  useDeviceTypesQuery,
} from "../hooks";
import { DeleteModal } from "@/components/DeleteModal";
import { DeviceCreate } from "./DeviceCreate";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SelectZoneDialog } from "./SelectZoneDialog";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { useBackupActions } from "@/features/backup/hooks";

type FilterFormValues = {
  type?: string;
  list_sort?: string;
  list_page?: number;
};

export const DeviceRow = ({ device }) => {
  //   const { filters, updateFilters } = useUsersFilters();
  //   const { devices, devicesIsLoading } = useDevicesQuery(filters);
  const { deleteDeviceAction, registerForFirewallAction } = useDeviceActions();
  //   const { deviceTypes, deviceTypesIsPending } = useDeviceTypesQuery();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { createBackupAction } = useBackupActions();
  //   const [openDialog, setOpenDialog] = useState(false);
  //   const form = useForm<FilterFormValues>({
  //     defaultValues: {
  //       type: filters.type,
  //       list_sort: filters.list_sort,
  //       list_page: filters.list_page,
  //     },
  //   });

  const handleRegisterForFirewall = async (id: number) => {
    try {
      await registerForFirewallAction.mutateAsync(id);
    } catch (error) {
      toast.error(error.detail);
    }
  };

  return (
    <>
      <TableRow
        key={device.id}
        className="bg-gray-darker hover:bg-gray-darker odd:bg-gray-items odd:hover:bg-gray-items"
      >
        <TableCell className="px-5 py-2 rounded-l-lg text-center font-bold border-y border-s border-default">
          {device.id}
        </TableCell>

        <TableCell className="px-4 py-2 border-y border-default">
          <div className="flex items-center gap-4">
            <div className="border-2 border-orange rounded-full size-12 bg-white">
              {/* To do fetch user profile */}
              <img
                src={`/images/os/${device.vendor}.svg`}
                // alt="profile image"
                className="size-full rounded-full"
              />
            </div>

            <div className="flex flex-col">
              <span className="text-sm font-bold capitalize">
                {device.vendor}
              </span>
            </div>
          </div>
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

        <TableCell className="px-4 py-2 text-center border-y border-default space-x-1.5">
          <Button className="bg-navy-blue hover:bg-navy-blue border text-blue-darker border-blue-darker p-2.5!">
            <img src="/icons/edit.svg" alt="edit icon" className="size-5" />
          </Button>

          <DeleteModal
            title="Device"
            onClick={() => deleteDeviceAction.mutate(device.id)}
          />

          <Button className="p-2.5!">
            <img src="/icons/view.svg" alt="edit icon" className="size-5" />
          </Button>
        </TableCell>

        <TableCell className="px-4 py-2 text-center rounded-r-lg border-y border-e border-default">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="secondary"
                className="border border-foreground/25"
                size="icon"
              >
                <EllipsisIcon />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent>
              <DropdownMenuItem
                onClick={() => handleRegisterForFirewall(device.id)}
              >
                Register for firewall
              </DropdownMenuItem>

              <DropdownMenuItem onClick={() => setOpen(true)}>
                Add to zone
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => navigate(`/devices/terminal/${device.id}`)}
              >
                Terminal
              </DropdownMenuItem>

              <DropdownMenuSub>
                <DropdownMenuSubTrigger>Backup</DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem
                      onClick={() =>
                        createBackupAction.mutate(
                          { device_id: device.id, backup_type: "running" },
                          {
                            onSuccess: () => {
                              toast.success("Backup successfully");
                            },
                            onError: () => {
                              toast.error("Backup faild.");
                            },
                          },
                        )
                      }
                    >
                      Running backup
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      onClick={() =>
                        createBackupAction.mutate(
                          { device_id: device.id, backup_type: "startup" },
                          {
                            onSuccess: () => {
                              toast.success("Backup successfully");
                            },
                            onError: () => {
                              toast.error("Backup faild.");
                            },
                          },
                        )
                      }
                    >
                      Startup backup
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>
      </TableRow>

      <SelectZoneDialog open={open} setOpen={setOpen} deviceId={device.id} />
    </>
  );
};
