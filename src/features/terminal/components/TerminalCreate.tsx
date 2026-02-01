import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import AddIcon from "@/shared/icons/plus.svg?react";
import RightArrowIcon from "@/shared/icons/rightArrow.svg?react";
import { Separator } from "@/components/ui/separator";
import { useDevicesQuery } from "@/features/devices/hooks";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Empty,
  EmptyContent,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import type { Device } from "@/features/devices/types";
import DevicesIcon from "@/shared/icons/devices.svg?react";

interface Props {
  tabs: { id: string; ip: string }[];
  setTabs: (value: { id: string; ip: string }[]) => void;
}

export const TerminalCreate = ({ tabs, setTabs }: Props) => {
  const [openModal, setOpenModal] = useState(false);
  const { devices, devicesIsLoading } = useDevicesQuery();

  const filteredData = () => {
    return devices?.data.filter(
      (device: Device) => !tabs.some((tab) => tab.id === device.id),
    );
  };

  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      <DialogTrigger asChild>
        <Button className="rounded-none">
          <AddIcon className="text-foreground" />
          Add Terminal
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-background-default text-white p-8 max-h-11/12 max-w-115! **:last:data-[slot=dialog-close]:top-9 **:last:data-[slot=dialog-close]:end-8">
        {/* Dialog header */}
        <DialogHeader>
          <DialogTitle className="text-lg font-bold">
            Create a New Terminal
          </DialogTitle>
          <DialogDescription className="hidden">
            Create another terminal
          </DialogDescription>
        </DialogHeader>

        <div>
          <span className="text-sm text-orange">
            Choosing a device and open a terminal
          </span>

          <Separator className="my-3 bg-default" />

          {/* Main content */}
          <div>
            {devicesIsLoading ? (
              <section className="space-y-4">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 p-2.5 pe-6 border border-default bg-gray-darker rounded-lg"
                  >
                    <Skeleton className="size-20" />
                    <div className="space-y-1.5">
                      <Skeleton className="h-4 w-40" />
                      <Skeleton className="h-3 w-16" />
                      <Skeleton className="h-3 w-14" />
                    </div>
                    <Skeleton className="size-11 rounded-sm ms-auto" />
                  </div>
                ))}
              </section>
            ) : filteredData().length === 0 ? (
              <>
                <Empty className="pt-3! pb-7! gap-2">
                  <EmptyHeader>
                    <EmptyMedia variant="icon">
                      <DevicesIcon className="size-5" />
                    </EmptyMedia>
                    <EmptyTitle>Devices List Empty!</EmptyTitle>
                  </EmptyHeader>
                  <EmptyContent className="text-sm text-muted-foreground">
                    Devices will appear here once they are added.
                  </EmptyContent>
                </Empty>
              </>
            ) : (
              <div className="space-y-4">
                {filteredData().map((device: Device) => (
                  <div
                    key={device.id}
                    className="flex items-center gap-3 border border-default hover:border-primary p-2.5 pe-6 rounded-lg group cursor-pointer"
                    onClick={() => {
                      setTabs([...tabs, { id: device.id, ip: device.ip }]);
                      setOpenModal(false);
                    }}
                  >
                    <div className="size-14">
                      <img
                        src={`/images/os/${device.type}.svg`}
                        alt="vendor image"
                        className="size-full"
                      />
                    </div>
                    <div>
                      <span className="text-sm font-bold">{device.ip}</span>
                      <div className="text- flex flex-col">
                        <span>{device.type || "---"}</span>
                      </div>
                    </div>
                    <Button className="size-11 bg-navy-blue border border-primary text-primary group-hover:bg-primary group-hover:text-white ms-auto">
                      <RightArrowIcon className="size-6" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Dialog footer */}
        <DialogFooter>
          <DialogClose asChild>
            <Button className="w-full" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
