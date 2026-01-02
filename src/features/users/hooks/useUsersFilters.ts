import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

export const useUsersFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    status: searchParams.get("status") || "",
    date: searchParams.get("date") || "",
    role: searchParams.get("role") || "",
    sort: searchParams.get("sort") || "",
    list_page: searchParams.get("list_page") || "",
  });

  const { status, date, role, sort, list_page } = filters;

  useEffect(() => {
    const params: Record<string, any> = {};

    if (filters.status) params.status = status;
    if (filters.date) params.date = date;
    if (filters.role) params.role = role;
    if (filters.sort) params.sort = sort;
    if (filters.list_page) params.list_page = list_page;

    setSearchParams(params);
  }, [status, date, role, sort, list_page]);

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
