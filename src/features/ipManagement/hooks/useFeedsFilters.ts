import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

export const useFeedsFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    feed: searchParams.get("feed") || "",
    active: searchParams.get("active") || "",
    type: searchParams.get("type") || "",
    list_sort: searchParams.get("list_sort") || "",
    list_page: Number(searchParams.get("list_page")) || 1,
  });

  const { feed, active, type, list_sort, list_page } = filters;

  useEffect(() => {
    const params: Record<string, any> = {};

    if (feed) params.feed = feed;
    if (active) params.active = active;
    if (type) params.type = type;
    if (list_sort) params.list_sort = list_sort;
    if (list_page) params.list_page = list_page;

    setSearchParams(params);
  }, [feed, active, type, list_sort, list_page]);

  const updateFilters = (next: Partial<typeof filters>) => {
    setFilters((prev) => ({
      ...prev,
      ...next,
    }));
  };

  return {
    filters,
    updateFilters,
  };
};
