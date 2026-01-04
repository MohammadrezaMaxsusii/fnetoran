import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { CustomPaginationPrevious } from "@/components/CustomPaginationPrevious";
import { CustomPaginationNext } from "@/components/CustomPaginationNext";
import { useUsersFilters } from "../hooks";

interface Props {
  count: number;
}

export const UserTablePagination = ({ count }: Props) => {
  const { filters, updateFilters } = useUsersFilters();
  const totalPages = Math.ceil(count / 8);

  return (
    <>
      {totalPages > 1 && (
        <Pagination className="pb-7">
          <PaginationContent className="[&_li_a]:hover:bg-blue-darker [&_li_a]:hover:text-foreground [&_li_a]:size-7! [&_li_a]:font-normal [&_li_a]:text-sm [&_li_a]:rounded-lg [&_li_a[data-active]]:bg-blue-darker">
            {/* Prev button */}
            <PaginationItem>
              <CustomPaginationPrevious
                disable={filters.list_page <= 1}
                onClick={() => {
                  filters.list_page > 1 &&
                    updateFilters({ list_page: filters.list_page - 1 });
                }}
              />
            </PaginationItem>

            {/* Other button */}
            {Array.from({ length: totalPages }).map((_, index: number) => (
              <PaginationItem key={index}>
                <PaginationLink
                  href={`/users?list_page=${index + 1}`}
                  {...(filters.list_page === index + 1 && {
                    isActive: true,
                  })}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

            {/* Next button */}
            <PaginationItem>
              <CustomPaginationNext
                disable={filters.list_page >= totalPages}
                onClick={() => {
                  filters.list_page < totalPages &&
                    updateFilters({ list_page: filters.list_page + 1 });
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </>
  );
};
