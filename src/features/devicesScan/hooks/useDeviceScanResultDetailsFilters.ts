import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

export const useDeviceScanResultDetailsFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    createdAt: searchParams.get("createdAt") || "",
    port: searchParams.get("port") || "",
    list_sort: searchParams.get("list_sort") || "",
    list_page: Number(searchParams.get("list_page")) || 1,
  });

  const { createdAt, port, list_sort, list_page } = filters;

  useEffect(() => {
    const params: Record<string, any> = {};

    if (createdAt) params.createdAt = createdAt;
    if (port) params.scan = port;
    if (list_sort) params.list_sort = list_sort;
    if (list_page) params.list_page = list_page;

    setSearchParams(params);
  }, [createdAt, port, list_sort, list_page]);

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
