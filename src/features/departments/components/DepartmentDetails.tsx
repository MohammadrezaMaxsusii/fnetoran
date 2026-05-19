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
import type { Department } from "../types";
import { getDate } from "@/shared/utils";

interface Props {
  department: Department;
}

export const DepartmentDetails = ({ department }: Props) => {
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
            View Department Details
          </DialogTitle>
          <DialogDescription className="hidden">
            Department information overview
          </DialogDescription>
        </DialogHeader>

        {/* Dialog content */}
        <Item className="py-1 px-0">
          <ItemContent className="flex flex-row justify-between">
            <ItemTitle className="font-normal text-gray-lighter">
              Department id:
            </ItemTitle>
            <ItemDescription className="font-normal text-white capitalize">
              {department.id}
            </ItemDescription>
          </ItemContent>
        </Item>

        <Item className="py-1 px-0">
          <ItemContent className="flex flex-row justify-between">
            <ItemTitle className="font-normal text-gray-lighter">
              Name:
            </ItemTitle>
            <ItemDescription className="font-normal text-white capitalize">
              {department.name}
            </ItemDescription>
          </ItemContent>
        </Item>

        <Item className="py-1 px-0">
          <ItemContent className="flex flex-row justify-between">
            <ItemTitle className="font-normal text-gray-lighter">
              Code:
            </ItemTitle>
            <ItemDescription className="font-normal text-white capitalize">
              {department.code || "---"}
            </ItemDescription>
          </ItemContent>
        </Item>

        <Item className="py-1 px-0">
          <ItemContent className="flex flex-row justify-between">
            <ItemTitle className="font-normal text-gray-lighter">
              Description:
            </ItemTitle>
            <ItemDescription className="font-normal text-white capitalize">
              {department.description || "---"}
            </ItemDescription>
          </ItemContent>
        </Item>

        <Item className="py-1 px-0">
          <ItemContent className="flex flex-row justify-between">
            <ItemTitle className="font-normal text-gray-lighter">
              Create date:
            </ItemTitle>
            <ItemDescription className="font-normal text-white capitalize">
              {getDate(department.createdAt!) || "---"}
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
