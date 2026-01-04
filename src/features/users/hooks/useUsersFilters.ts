import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

export const useUsersFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    active:
      searchParams.get("active") === "true"
        ? true
        : searchParams.get("active") === "false"
        ? false
        : undefined,
    createdAt: searchParams.get("createdAt") || "",
    roleId: searchParams.get("roleId") || "",
    list_sort: searchParams.get("list_sort") || "",
    list_page: Number(searchParams.get("list_page")) || 1,
  });

  const { active, createdAt, roleId, list_sort, list_page } = filters;

  useEffect(() => {
    const params: Record<string, any> = {};

    if (active) params.active = active;
    if (createdAt) params.createdAt = createdAt;
    if (roleId) params.roleId = roleId;
    if (list_sort) params.list_sort = list_sort;
    if (list_page) params.list_page = list_page;

    setSearchParams(params);
  }, [active, createdAt, roleId, list_sort, list_page]);

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
