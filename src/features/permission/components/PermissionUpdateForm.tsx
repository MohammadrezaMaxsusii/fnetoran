import { useState, useEffect } from "react";
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
import type { CategoryOfPermissions, Permission } from "@/features/permission/types";
import PermissionIcon from "@/shared/icons/permission.svg?react";
import EditIcon from "@/shared/icons/edit.svg?react";
import { toast } from "sonner";
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
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { useCheckboxTree } from "../hooks/useCheckboxTree";

interface Props {
  categoryOfPermission: Permission;
}

export const PermissionUpdateForm = ({ categoryOfPermission }: Props) => {
  const [openModal, setOpenModal] = useState(false);
  const [errors, setErrors] = useState<{ message: string }[] | undefined>(undefined);
  const { permissionsCategory } = usePermissionsCategoryQuery();
  const { permissionsOfPermissionCateogory } =
    usePermissionsOfPermissionCategoryQuery(categoryOfPermission.id);
  const {
    updatePremissionsCategoryAction,
    createPermissionOfPermissionCategoryAction,
    deletePermissionOfPermissionCategoryAction,
  } = usePermissionsCategoryActions();

  const form = useForm({
    resolver: zodResolver(permissionUpdateSchema),
    defaultValues: { name: "", permissionIds: [] },
  });

  const initialPermissionIds =
    permissionsOfPermissionCateogory?.data[0]?.permissions.map((p: Permission) =>
      String(p.id),
    );

  const {
    checkedChildren,
    search,
    setSearch,
    filterData,
    handleParentChange,
    handleChildChange,
    isParentChecked,
    isChildChecked,
    setCheckedChildren,
    setCheckedParents,
  } = useCheckboxTree(form);

  useEffect(() => {
    if (!permissionsCategory?.data || !permissionsOfPermissionCateogory?.data)
      return;

    const initialPermissionIds =
      permissionsOfPermissionCateogory.data[0].permissions.map((p: Permission) => p.id);

    if (checkedChildren.length === 0) {
      const newCheckedParents = permissionsCategory.data
        .filter((category: CategoryOfPermissions) =>
          category.permissions.every((p) =>
            initialPermissionIds.includes(p.id),
          ),
        )
        .map((category: CategoryOfPermissions) => category.id);

      setCheckedChildren(initialPermissionIds);
      setCheckedParents(newCheckedParents);
    }

    form.reset({
      name: categoryOfPermission.name,
      permissionIds: initialPermissionIds,
    });
  }, [
    permissionsCategory?.data,
    permissionsOfPermissionCateogory?.data,
    categoryOfPermission.name,
    checkedChildren.length,
    setCheckedChildren,
    setCheckedParents,
    form,
  ]);

  const filteredData = filterData(permissionsCategory?.data);

  const submitHandler = async () => {
    try {
      const values = form.getValues();

      const res = await updatePremissionsCategoryAction.mutateAsync({
        id: categoryOfPermission.id,
        name: values.name,
      });

      await deletePermissionOfPermissionCategoryAction.mutateAsync({
        categoryId: categoryOfPermission.id,
        permissionIds: initialPermissionIds,
      });

      await createPermissionOfPermissionCategoryAction.mutateAsync({
        categoryId: res.data.id,
        permissionIds: checkedChildren,
      });

      setOpenModal(false);
      form.reset();
      setSearch("");
      setErrors(undefined);
      toast.success("Updated successfully.");
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

            {/* Permission Name */}
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
              {filteredData?.map((category) => (
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
