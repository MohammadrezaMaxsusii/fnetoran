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
import type { Feed } from "../types/feedType";
import { getDate } from "@/shared/utils";

interface Props {
  feed: Feed;
}

export const FeedDetails = ({ feed }: Props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="p-2.5!">
          <ViewIcon className="size-5" />
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-background-default text-white p-8 max-h-11/12 overflow-y-auto max-w-115! **:last:data-[slot=dialog-close]:top-9 **:last:data-[slot=dialog-close]:end-8">
        {/* Dialog header */}
        <DialogHeader>
          <DialogTitle className="text-lg font-bold">
            View Feed Details
          </DialogTitle>
          <DialogDescription className="hidden">
            Feed information overview
          </DialogDescription>
        </DialogHeader>

        {/* Dialog content */}
        <Item className="py-1 px-0">
          <ItemContent className="flex flex-row justify-between">
            <ItemTitle className="font-normal text-gray-lighter">IP:</ItemTitle>
            <ItemDescription className="font-normal text-white capitalize">
              {feed.item || "---"}
            </ItemDescription>
          </ItemContent>
        </Item>
        <Item className="py-1 px-0">
          <ItemContent className="flex flex-row justify-between">
            <ItemTitle className="font-normal text-gray-lighter">
              Status:
            </ItemTitle>
            <ItemDescription className="font-normal text-white capitalize">
              {feed.active ? (
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
              Type:
            </ItemTitle>
            <ItemDescription className="font-normal text-white capitalize">
              {feed.type || "---"}
            </ItemDescription>
          </ItemContent>
        </Item>
        <Item className="py-1 px-0">
          <ItemContent className="flex flex-row justify-between">
            <ItemTitle className="font-normal text-gray-lighter">
              Feed:
            </ItemTitle>
            <ItemDescription className="font-normal text-white capitalize">
              {feed.fileName || "---"}
            </ItemDescription>
          </ItemContent>
        </Item>
        <Item className="py-1 px-0">
          <ItemContent className="flex flex-row justify-between">
            <ItemTitle className="font-normal text-gray-lighter">
              Reffrence:
            </ItemTitle>
            <ItemDescription className="font-normal text-white capitalize">
              {feed.source || "---"}
            </ItemDescription>
          </ItemContent>
        </Item>
        <Item className="py-1 px-0">
          <ItemContent className="flex flex-row justify-between">
            <ItemTitle className="font-normal text-gray-lighter">
              Remove date:
            </ItemTitle>
            <ItemDescription className="font-normal text-white capitalize">
              {getDate(feed.removeDate) || "---"}
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
