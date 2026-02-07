import { useState, useMemo, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { AlertCircleIcon, Search } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Spinner } from "@/components/ui/spinner";
import type {
  CategoryOfPermissions,
  Permission,
} from "@/features/permission/types";
import type { PermissionsOfRole } from "@/features/roles/types";
import PermissionIcon from "@/shared/icons/permission.svg?react";

import {
  usePermissionsCategoryQuery,
  usePermissionsOfPermissionCategoryQuery,
} from "@/features/permission/hooks";
import { permissionUpdateSchema } from "@/features/permission/schemas/permissionCreateOrUpdateSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePermissionsCategoryActions } from "../hooks/usePermissionsCategoryActions";
import { FieldError } from "@/components/ui/field";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import EditIcon from "@/shared/icons/edit.svg?react";

interface Props {
  categoryOfPermission: Permission;
}

// This implementation follows the current (problematic) API behavior.
// Component must be adjusted after the API is corrected.

export const PermissionUpdateForm = ({ categoryOfPermission }: Props) => {
  const [openModal, setOpenModal] = useState(false);
  const [errors, setErrors] = useState<{ message: string }[]>();
  const [checkedParents, setCheckedParents] = useState<string[]>([]);
  const [checkedChildren, setCheckedChildren] = useState<string[]>([]);
  const [search, setSearch] = useState("");

  const { permissionsCategory } = usePermissionsCategoryQuery();
  const {
    updatePremissionsCategoryAction,
    createPermissionOfPermissionCategoryAction,
    deletePermissionOfPermissionCategoryAction,
  } = usePermissionsCategoryActions();
  const { permissionsOfPermissionCateogory } =
    usePermissionsOfPermissionCategoryQuery(categoryOfPermission.id);

  const form = useForm({
    resolver: zodResolver(permissionUpdateSchema),
  });

  const permissionIds =
    permissionsOfPermissionCateogory?.data[0].permissions.map(
      (item: Permission) => String(item.id),
    );

  useEffect(() => {
    if (!permissionsOfPermissionCateogory?.data || !permissionsCategory?.data)
      return;

    const newCheckedParents = permissionsCategory.data
      .filter((category: CategoryOfPermissions) =>
        category.permissions.every((p) => permissionIds.includes(String(p.id))),
      )
      .map((category: CategoryOfPermissions) => category.id);

    form.reset({
      name: categoryOfPermission.name,
      permissionIds,
    });

    setCheckedChildren(permissionIds);
    setCheckedParents(newCheckedParents);
  }, [
    permissionsOfPermissionCateogory,
    permissionsCategory?.data,
    categoryOfPermission.name,
    form,
  ]);

  const filteredData = useMemo(() => {
    if (!search) return permissionsCategory?.data;

    return permissionsCategory?.data
      ?.map((category: CategoryOfPermissions) => {
        const filteredPermissions = category.permissions.filter((permission) =>
          permission.text.toLowerCase().includes(search.toLowerCase()),
        );

        if (filteredPermissions.length === 0) return null;

        return { ...category, permissions: filteredPermissions };
      })
      .filter(Boolean) as CategoryOfPermissions[];
  }, [permissionsCategory?.data, search]);

  const handleParentChange = (
    category: CategoryOfPermissions,
    isChecked: boolean,
  ) => {
    let newCheckedChildren: string[] = [];

    if (isChecked) {
      setCheckedParents((prev) => Array.from(new Set([...prev, category.id])));
      newCheckedChildren = Array.from(
        new Set([
          ...checkedChildren,
          ...category.permissions.map((p) => String(p.id)),
        ]),
      );
    } else {
      setCheckedParents((prev) => prev.filter((id) => id !== category.id));
      newCheckedChildren = checkedChildren.filter(
        (id) => !category.permissions.some((p) => String(p.id) === id),
      );
    }

    setCheckedChildren(newCheckedChildren);
    form.setValue("permissionIds", newCheckedChildren, {
      shouldValidate: true,
    });
  };

  const handleChildChange = (
    category: CategoryOfPermissions,
    permission: PermissionsOfRole,
    isChecked: boolean,
  ) => {
    let newCheckedChildren: string[] = [];
    const permissionId = String(permission.id);

    if (isChecked) {
      newCheckedChildren = Array.from(
        new Set([...checkedChildren, permissionId]),
      );
      if (!checkedParents.includes(category.id)) {
        setCheckedParents((prev) => [...prev, category.id]);
      }
    } else {
      newCheckedChildren = checkedChildren.filter((id) => id !== permissionId);

      const siblingsChecked = category.permissions.some(
        (p) =>
          checkedChildren.includes(String(p.id)) &&
          String(p.id) !== permissionId,
      );

      if (!siblingsChecked) {
        setCheckedParents((prev) => prev.filter((id) => id !== category.id));
      }
    }

    setCheckedChildren(newCheckedChildren);
    form.setValue("permissionIds", newCheckedChildren, {
      shouldValidate: true,
    });
  };

  const isParentChecked = (category: CategoryOfPermissions) =>
    checkedParents.includes(category.id);

  const isChildChecked = (permission: PermissionsOfRole) =>
    checkedChildren.includes(String(permission.id));

  const submitHandler = async () => {
    try {
      const values = form.getValues();
      const res = await updatePremissionsCategoryAction.mutateAsync({
        id: categoryOfPermission.id,
        name: values.name,
      });
      await deletePermissionOfPermissionCategoryAction.mutateAsync({
        categoryId: categoryOfPermission.id,
        permissionIds: permissionIds,
      });
      await createPermissionOfPermissionCategoryAction.mutateAsync({
        categoryId: res.data.id,
        permissionIds: checkedChildren,
      });

      setOpenModal(false);
      form.reset();
      setCheckedParents([]);
      setCheckedChildren([]);
      setSearch("");
    } catch (error) {
      if (Array.isArray(error)) setErrors(error);
    }
  };

  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      <DialogTrigger asChild>
        <Button className="bg-navy-blue hover:bg-navy-blue border border-blue-darker text-blue-darker">
          <EditIcon className="text-blue-darkest! fill-blue-darkest!" />
          Edit permission
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-background-default text-white p-8 max-h-11/12 max-w-115! **:last:data-[slot=dialog-close]:top-9 **:last:data-[slot=dialog-close]:end-8">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold flex items-center">
            Update Permission Category
          </DialogTitle>
          <DialogDescription className="hidden">
            Update existing permission
          </DialogDescription>
          {errors && (
            <Alert variant="destructive">
              <AlertCircleIcon />
              <AlertTitle>Something went wrong!</AlertTitle>
              <AlertDescription>
                <FieldError errors={errors} />
              </AlertDescription>
            </Alert>
          )}
        </DialogHeader>

        <Form {...form}>
          <form
            className="flex flex-col gap-4"
            onSubmit={form.handleSubmit(submitHandler)}
          >
            <span className="text-sm text-orange">Select Permissions</span>

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <InputGroup className="bg-gray-darker">
                      <InputGroupInput
                        {...field}
                        placeholder="Enter your permission name"
                        className={cn(
                          form.formState.errors.name &&
                            "border-red-500 focus:outline-red-500",
                        )}
                      />
                      <InputGroupAddon align="inline-end">
                        <PermissionIcon />
                      </InputGroupAddon>
                    </InputGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <InputGroup className="bg-gray-darker">
              <InputGroupInput
                placeholder="Search your access..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <InputGroupAddon align="inline-end">
                <Search />
              </InputGroupAddon>
            </InputGroup>

            <div className="flex flex-col gap-3 border border-default p-4 rounded-md h-100 overflow-y-auto">
              {filteredData?.map((category: CategoryOfPermissions) => (
                <div key={category.id} className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      checked={isParentChecked(category)}
                      onCheckedChange={(checked) =>
                        handleParentChange(category, checked === true)
                      }
                    />
                    <span className="text-primary">{category.name}</span>
                  </div>

                  <div className="flex flex-col gap-1">
                    {category.permissions.map((permission) => (
                      <div
                        key={permission.id}
                        className="flex items-center gap-2 bg-gray-darker p-2 rounded-md"
                      >
                        <FormField
                          control={form.control}
                          name="permissionIds"
                          render={() => (
                            <FormItem className="flex items-center gap-2">
                              <FormControl>
                                <Checkbox
                                  checked={isChildChecked(permission)}
                                  onCheckedChange={(checked) =>
                                    handleChildChange(
                                      category,
                                      permission,
                                      checked === true,
                                    )
                                  }
                                />
                              </FormControl>
                              <FormLabel>{permission.text}</FormLabel>
                            </FormItem>
                          )}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              {filteredData?.length === 0 && (
                <span className="text-sm text-gray-400">
                  No permissions found
                </span>
              )}
            </div>

            {form.formState.errors.permissionIds && (
              <FormMessage>
                {form.formState.errors.permissionIds.message}
              </FormMessage>
            )}

            <DialogFooter className="grid grid-cols-2 gap-3">
              <DialogClose asChild>
                <Button variant="secondary">Close</Button>
              </DialogClose>

              <Button
                type="submit"
                className="bg-navy-blue hover:bg-navy-blue text-blue-darker border border-blue-darker"
              >
                {createPermissionOfPermissionCategoryAction.isPending ? (
                  <Spinner />
                ) : (
                  "Confirm Role"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
