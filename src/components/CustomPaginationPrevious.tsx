import { cn } from "@/lib/utils";
import { PaginationItem, PaginationLink } from "./ui/pagination";
import ArrowIcon from "@/shared/icons/blueArrow.svg?react";

interface Props {
  disable: boolean;
  onClick: () => void;
}

export const CustomPaginationPrevious = ({ disable, onClick }: Props) => {
  return (
    <PaginationItem>
      <PaginationLink
        onClick={onClick}
        className={cn(
          "bg-navy-blue hover:bg-navy-blue! border border-blue-darker",
          !disable && "cursor-pointer"
        )}
      >
        <ArrowIcon className="size-4" />
      </PaginationLink>
    </PaginationItem>
  );
};
