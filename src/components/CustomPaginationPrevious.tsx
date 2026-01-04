import { cn } from "@/lib/utils";
import { PaginationItem, PaginationLink } from "./ui/pagination";

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
        <img
          src="/icons/blueArrow.svg"
          alt="left arrow icon"
          className="size-4"
        />
      </PaginationLink>
    </PaginationItem>
  );
};
