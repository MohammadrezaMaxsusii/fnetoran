import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";
import ViewIcon from "@/shared/icons/view.svg?react";
import type { Location } from "../types";
import { getDate } from "@/shared/utils";

interface Props {
  location: Location;
}

export const LocationDetails = ({ location }: Props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="rounded-full size-6 absolute inset-e-1 p-0"
          size="icon"
        >
          <ViewIcon />
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-background-default text-white p-8 max-h-11/12 overflow-y-auto max-w-115! **:last:data-[slot=dialog-close]:top-9 **:last:data-[slot=dialog-close]:inset-e-8">
        {/* Dialog header */}
        <DialogHeader>
          <DialogTitle className="text-lg font-bold">
            View Location Details
          </DialogTitle>
          <DialogDescription className="hidden">
            Location information overview
          </DialogDescription>
        </DialogHeader>

        {/* Dialog content */}
        <Item className="py-1 px-0">
          <ItemContent className="flex flex-row justify-between">
            <ItemTitle className="font-normal text-gray-lighter">
              Name:
            </ItemTitle>
            <ItemDescription className="font-normal text-white capitalize">
              {location.name}
            </ItemDescription>
          </ItemContent>
        </Item>

        <Item className="py-1 px-0">
          <ItemContent className="flex flex-row justify-between">
            <ItemTitle className="font-normal text-gray-lighter">
              Location type:
            </ItemTitle>
            <ItemDescription className="font-normal text-white capitalize">
              {location.location_type}
            </ItemDescription>
          </ItemContent>
        </Item>

        <Item className="py-1 px-0">
          <ItemContent className="flex flex-row justify-between">
            <ItemTitle className="font-normal text-gray-lighter">
              Address:
            </ItemTitle>
            <ItemDescription className="font-normal text-white capitalize">
              {location.address || "---"}
            </ItemDescription>
          </ItemContent>
        </Item>

        <Item className="py-1 px-0">
          <ItemContent className="flex flex-row justify-between">
            <ItemTitle className="font-normal text-gray-lighter">
              Room number:
            </ItemTitle>
            <ItemDescription className="font-normal text-white capitalize">
              {location.room_number || "---"}
            </ItemDescription>
          </ItemContent>
        </Item>

        <Item className="py-1 px-0">
          <ItemContent className="flex flex-row justify-between">
            <ItemTitle className="font-normal text-gray-lighter">
              Capacity:
            </ItemTitle>
            <ItemDescription className="font-normal text-white capitalize">
              {location.capacity || "---"}
            </ItemDescription>
          </ItemContent>
        </Item>

        <Item className="py-1 px-0">
          <ItemContent className="flex flex-row justify-between">
            <ItemTitle className="font-normal text-gray-lighter">
              Description:
            </ItemTitle>
            <ItemDescription className="font-normal text-white capitalize">
              {location.description || "---"}
            </ItemDescription>
          </ItemContent>
        </Item>

        <Item className="py-1 px-0">
          <ItemContent className="flex flex-row justify-between">
            <ItemTitle className="font-normal text-gray-lighter">
              Status:
            </ItemTitle>
            <ItemDescription className="font-normal text-white capitalize">
              {location.is_active ? (
                <span className="flex items-center justify-center gap-1">
                  <span className="inline-block w-3 h-3 bg-green rounded-full" />
                  <span>Active</span>
                </span>
              ) : (
                <span className="flex items-center justify-center gap-1">
                  <span className="inline-block w-3 h-3 bg-red rounded-full" />
                  <span>Inactive</span>
                </span>
              )}
            </ItemDescription>
          </ItemContent>
        </Item>

        <Item className="py-1 px-0">
          <ItemContent className="flex flex-row justify-between">
            <ItemTitle className="font-normal text-gray-lighter">
              Create date:
            </ItemTitle>
            <ItemDescription className="font-normal text-white capitalize">
              {getDate(location.createdAt!) || "---"}
            </ItemDescription>
          </ItemContent>
        </Item>

        {/* Dialog footer */}
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary" className="w-full">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
