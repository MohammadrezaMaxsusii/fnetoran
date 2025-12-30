import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

export const useUsersFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    status: searchParams.get("status") || "",
    date: searchParams.get("date") || "",
    role: searchParams.get("role") || "",
    sort: searchParams.get("sort") || "",
  });

  const { status, date, role, sort } = filters;

  useEffect(() => {
    const params: Record<string, any> = {};

    if (filters.status) params.status = filters.status;
    if (filters.date) params.date = filters.date;
    if (filters.role) params.role = filters.role;
    if (filters.sort) params.sort = filters.sort;

    setSearchParams(params);
  }, [status, date, role, sort]);

  const updateFilters = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return {
    filters,
    updateFilters,
  };
};
