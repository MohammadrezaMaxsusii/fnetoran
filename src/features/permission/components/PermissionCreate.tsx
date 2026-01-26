import { useState, useMemo } from "react";
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
import AddIcon from "@/shared/icons/plus.svg?react";
import { AlertCircleIcon, Search } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Spinner } from "@/components/ui/spinner";
import type { CategoryOfPermissions } from "@/features/permission/types";
import type { PermissionsOfRole } from "@/features/roles/types";
import PermissionIcon from "@/shared/icons/permission.svg?react";

import { usePermissionsCategoryQuery } from "@/features/permission/hooks";
import { permissionCreateSchema } from "@/features/permission/schemas/permissionCreateOrUpdateSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePermissionsCategoryActions } from "../hooks/usePermissionsCategoryActions";
import { FieldError } from "@/components/ui/field";

export const PermissionCreate = () => {
  const [openModal, setOpenModal] = useState(false);
  const [errors, setErrors] = useState<{ message: string }[]>();
  const [checkedParents, setCheckedParents] = useState<string[]>([]);
  const [checkedChildren, setCheckedChildren] = useState<string[]>([]);
  const [search, setSearch] = useState("");

  const { permissionsCategory } = usePermissionsCategoryQuery();
  const {
    createPremissionsCategoryAction,
    createPermissionOfPermissionCategoryAction,
  } = usePermissionsCategoryActions();

  const form = useForm({
    resolver: zodResolver(permissionCreateSchema),
  });

  // Filtered permissions based on search
  const filteredData = useMemo(() => {
    if (!search) return permissionsCategory?.data;

    return permissionsCategory?.data
      .map((category: CategoryOfPermissions) => {
        const filteredPermissions = category.permissions.filter((permission) =>
          permission.text.toLowerCase().includes(search.toLowerCase()),
        );

        if (filteredPermissions.length === 0) return null;

        return {
          ...category,
          permissions: filteredPermissions,
        };
      })
      .filter(Boolean) as CategoryOfPermissions[];
  }, [permissionsCategory?.data, search]);

  // Handlers
  const handleParentChange = (
    category: CategoryOfPermissions,
    isChecked: boolean,
  ) => {
    if (isChecked) {
      setCheckedParents((prev) => Array.from(new Set([...prev, category.id])));
      setCheckedChildren((prev) =>
        Array.from(
          new Set([...prev, ...category.permissions.map((p) => p.id)]),
        ),
      );
    } else {
      setCheckedParents((prev) => prev.filter((id) => id !== category.id));
      setCheckedChildren((prev) =>
        prev.filter((id) => !category.permissions.some((p) => p.id === id)),
      );
    }
  };

  const handleChildChange = (
    category: CategoryOfPermissions,
    permission: PermissionsOfRole,
    isChecked: boolean,
  ) => {
    if (isChecked) {
      setCheckedChildren((prev) =>
        Array.from(new Set([...prev, permission.id])),
      );
      if (!checkedParents.includes(category.id)) {
        setCheckedParents((prev) => [...prev, category.id]);
      }
    } else {
      setCheckedChildren((prev) => prev.filter((id) => id !== permission.id));

      const siblingsChecked = category.permissions.some(
        (p) => checkedChildren.includes(p.id) && p.id !== permission.id,
      );

      if (!siblingsChecked) {
        setCheckedParents((prev) => prev.filter((id) => id !== category.id));
      }
    }
  };

  const isParentChecked = (category: CategoryOfPermissions) =>
    checkedParents.includes(category.id);

  const isChildChecked = (permission: PermissionsOfRole) =>
    checkedChildren.includes(permission.id);

  // Submit
  const submitHandler = async () => {
    try {
      const values = form.getValues();
      const res = await createPremissionsCategoryAction.mutateAsync({
        name: values.name,
      });
      await createPermissionOfPermissionCategoryAction.mutateAsync({
        categoryId: res.data.id,
        permissionIds: checkedChildren,
      });
      form.reset();
      setCheckedParents([]);
      setCheckedChildren([]);
      setSearch("");
      setOpenModal(false);
    } catch (error) {
      if (error instanceof Array) setErrors(error);
    }
  };

  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      <DialogTrigger asChild>
        <Button>
          <AddIcon className="text-foreground" />
          Add permission
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-background-default text-white p-8 max-h-11/12 max-w-115! **:last:data-[slot=dialog-close]:top-9 **:last:data-[slot=dialog-close]:end-8">
        {/* Dialog header */}
        <DialogHeader>
          <DialogTitle className="text-lg font-bold flex items-center">
            Create a New Permission Category
          </DialogTitle>
          <DialogDescription className="hidden">
            Create another permission
          </DialogDescription>
          {errors && (
            <Alert variant="destructive">
              <AlertCircleIcon />
              <AlertTitle>Something went wrong!</AlertTitle>
              <AlertDescription>
                <FieldError errors={errors}/>
              </AlertDescription>
            </Alert>
          )}
        </DialogHeader>

        {/* Main content */}
        <div className="flex flex-col gap-4">
          <span className="text-sm text-orange">Select Permissions</span>

          {/* Permission Name */}
          <InputGroup className="bg-gray-darker">
            <InputGroupInput
              placeholder="Enter your permission name"
              {...form.register("name")}
            />
            <InputGroupAddon align="inline-end">
              <PermissionIcon />
            </InputGroupAddon>
          </InputGroup>

          {/* Search */}
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

          {/* Checkbox Tree */}
          <div className="flex flex-col gap-3 border border-default p-4 rounded-md h-100 overflow-y-auto">
            {filteredData?.map((category: CategoryOfPermissions) => (
              <div key={category.id} className="flex flex-col gap-2">
                {/* Parent checkbox */}
                <div className="flex items-center gap-2">
                  <Checkbox
                    checked={isParentChecked(category)}
                    onCheckedChange={(checked) =>
                      handleParentChange(category, checked === true)
                    }
                  />
                  <span className="text-primary">{category.name}</span>
                </div>

                {/* Children checkbox */}
                <div className="flex flex-col gap-1">
                  {category.permissions.map((permission) => (
                    <div
                      key={permission.id}
                      className="flex items-center gap-2 bg-gray-darker p-2 rounded-md"
                    >
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
                      <span>{permission.text}</span>
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

          {/* Dialog footer */}
          <DialogFooter className="grid grid-cols-2 gap-3">
            <DialogClose asChild>
              <Button variant="secondary">Close</Button>
            </DialogClose>

            <Button
              onClick={submitHandler}
              className="bg-navy-blue hover:bg-navy-blue text-blue-darker border border-blue-darker"
            >
              {createPermissionOfPermissionCategoryAction.isPending ? (
                <Spinner />
              ) : (
                "Confirm Role"
              )}
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};
