import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

export const useZonesFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    zone: searchParams.get("zone") || "",
    list_sort: searchParams.get("list_sort") || "",
    list_page: Number(searchParams.get("list_page")) || 1,
  });

  const { zone, list_sort, list_page } = filters;

  useEffect(() => {
    const params: Record<string, any> = {};

    if (zone) params.zone = zone;
    if (list_sort) params.list_sort = list_sort;
    if (list_page) params.list_page = list_page;

    setSearchParams(params);
  }, [zone, list_sort, list_page]);

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
