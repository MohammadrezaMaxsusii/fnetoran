import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

export const useRolesFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    createdAt: searchParams.get("createdAt") || "",
    role: searchParams.get("role") || "",
    list_sort: searchParams.get("list_sort") || "",
    list_page: Number(searchParams.get("list_page")) || 1,
  });

  const { createdAt, role, list_sort, list_page } = filters;

  useEffect(() => {
    const params: Record<string, any> = {};

    if (createdAt) params.createdAt = createdAt;
    if (role) params.role = role;
    if (list_sort) params.list_sort = list_sort;
    if (list_page) params.list_page = list_page;

    setSearchParams(params);
  }, [createdAt, role, list_sort, list_page]);

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
