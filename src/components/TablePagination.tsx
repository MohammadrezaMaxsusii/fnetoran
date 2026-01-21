import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import { CustomPaginationPrevious } from "@/components/CustomPaginationPrevious";
import { CustomPaginationNext } from "@/components/CustomPaginationNext";
import { getPaginationPages } from "@/shared/utils";

interface Props {
  count: number;
  currentPage: number;
  updateFilters: ({ list_page }: { list_page: number }) => void;
}

export const TablePagination = ({
  count,
  currentPage,
  updateFilters,
}: Props) => {
  const totalPages = Math.ceil(count / 8);

  if (totalPages <= 1) return null;

  const pages = getPaginationPages(currentPage, totalPages);

  return (
    <Pagination className="pb-7">
      <PaginationContent className="[&_li_a]:hover:bg-blue-darker [&_li_a]:hover:text-foreground [&_li_a]:size-7! [&_li_a]:font-normal [&_li_a]:text-sm [&_li_a]:rounded-lg [&_li_a[data-active]]:bg-blue-darker">
        {/* Previous */}
        <CustomPaginationPrevious
          disable={currentPage <= 1}
          onClick={() =>
            currentPage > 1 && updateFilters({ list_page: currentPage - 1 })
          }
        />

        {/* Pages */}
        {pages.map((page, index) =>
          page === "ellipsis" ? (
            <PaginationItem key={`ellipsis-${index}`}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={page} className="cursor-pointer">
              <PaginationLink
                {...(currentPage === page && {
                  isActive: true,
                })}
                onClick={() => updateFilters({ list_page: page })}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          )
        )}

        {/* Next */}
        <CustomPaginationNext
          disable={currentPage >= totalPages}
          onClick={() =>
            currentPage < totalPages &&
            updateFilters({ list_page: currentPage + 1 })
          }
        />
      </PaginationContent>
    </Pagination>
  );
};
