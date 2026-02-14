import { useState } from "react";
import type {
  FieldValues,
  Path,
  UseFormReturn,
} from "react-hook-form";
import type {
  CategoryOfPermissions,
} from "@/features/permission/types";
import type {
  PermissionsOfRole,
} from "@/features/roles/types";

export function useCheckboxTree<
  TFieldValues extends FieldValues,
  TFieldName extends Path<TFieldValues>
>(
  form: UseFormReturn<TFieldValues>,
  fieldName: TFieldName,
) {
  const [checkedParents, setCheckedParents] = useState<string[]>([]);
  const [checkedChildren, setCheckedChildren] = useState<string[]>([]);
  const [search, setSearch] = useState("");

  //  Filter section
  const filterData = (
    permissionsCategory: CategoryOfPermissions[] | undefined,
  ) => {
    if (!permissionsCategory) return [];
    if (!search) return permissionsCategory;

    return permissionsCategory
      .map((category) => {
        const filteredPermissions = category.permissions.filter((p) =>
          p.text.toLowerCase().includes(search.toLowerCase()),
        );

        if (filteredPermissions.length === 0) return null;

        return { ...category, permissions: filteredPermissions };
      })
      .filter(Boolean) as CategoryOfPermissions[];
  };

  // Parent handler
  const handleParentChange = (
    category: CategoryOfPermissions,
    isChecked: boolean,
  ) => {
    let newCheckedChildren: string[] = [];

    if (isChecked) {
      setCheckedParents((prev) =>
        Array.from(new Set([...prev, category.id])),
      );

      newCheckedChildren = Array.from(
        new Set([
          ...checkedChildren,
          ...category.permissions.map((p) => p.id),
        ]),
      );
    } else {
      setCheckedParents((prev) =>
        prev.filter((id) => id !== category.id),
      );

      newCheckedChildren = checkedChildren.filter(
        (id) => !category.permissions.some((p) => p.id === id),
      );
    }

    setCheckedChildren(newCheckedChildren);

    form.setValue(fieldName, newCheckedChildren as any, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  // Child handler
  const handleChildChange = (
    category: CategoryOfPermissions,
    permission: PermissionsOfRole,
    isChecked: boolean,
  ) => {
    let newCheckedChildren: string[] = [];

    if (isChecked) {
      newCheckedChildren = Array.from(
        new Set([...checkedChildren, permission.id]),
      );

      if (!checkedParents.includes(category.id)) {
        setCheckedParents((prev) => [...prev, category.id]);
      }
    } else {
      newCheckedChildren = checkedChildren.filter(
        (id) => id !== permission.id,
      );

      const siblingsChecked = category.permissions.some(
        (p) =>
          checkedChildren.includes(p.id) &&
          p.id !== permission.id,
      );

      if (!siblingsChecked) {
        setCheckedParents((prev) =>
          prev.filter((id) => id !== category.id),
        );
      }
    }

    setCheckedChildren(newCheckedChildren);

    form.setValue(fieldName, newCheckedChildren as any, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  // Parent check handler
  const isParentChecked = (category: CategoryOfPermissions) =>
    checkedParents.includes(category.id);

  // Child check handler
  const isChildChecked = (permission: PermissionsOfRole) =>
    checkedChildren.includes(permission.id);

  return {
    checkedParents,
    checkedChildren,
    search,
    setSearch,
    setCheckedParents,
    setCheckedChildren,
    filterData,
    handleParentChange,
    handleChildChange,
    isParentChecked,
    isChildChecked,
  };
}
