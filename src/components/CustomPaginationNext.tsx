import { PaginationItem, PaginationLink } from "./ui/pagination";

interface Props {
  href: string;
}

export const CustomPaginationNext = ({ href }: Props) => {
  return (
    <PaginationItem>
      <PaginationLink
        href={href}
        className="bg-navy-blue hover:bg-navy-blue! border border-blue-darker"
      >
        <img
          src="/icons/blueArrow.svg"
          alt="right arrow icon"
          className="size-4 rotate-180"
        />
      </PaginationLink>
    </PaginationItem>
  );
};
