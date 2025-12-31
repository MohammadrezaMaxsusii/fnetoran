import { PaginationItem, PaginationLink } from "./ui/pagination";

interface Props {
  href: string;
}

export const CustomPaginationPrevious = ({ href }: Props) => {
  return (
    <PaginationItem>
      <PaginationLink
        href={href}
        className="bg-navy-blue hover:bg-navy-blue! border border-blue-darker"
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
