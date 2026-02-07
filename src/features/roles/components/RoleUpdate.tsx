import { useState, useMemo, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
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
import {
  AlertCircleIcon,
  Clock,
  MinusIcon,
  PlusIcon,
  Search,
} from "lucide-react";
import { useRoleActions } from "../hooks";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { getEndTime, getStartTime, isOnlyNumber } from "@/shared/utils";
import { Spinner } from "@/components/ui/spinner";
import type { PermissionsOfRole, Role } from "../types";
import type {
  CategoryOfPermissions,
  Permission,
} from "@/features/permission/types";
import {
  usePermissionsCategoryQuery,
  usePermissionsOfRoleQuery,
  usePremissionsOfRoleActions,
} from "@/features/permission/hooks";
import { Input } from "@/components/ui/input";
import { ButtonGroup } from "@/components/ui/button-group";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { workingTime } from "../constants";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { roleFormSchema } from "../schemas/roleCreateOrUpdateSchema";
import { permissionsOfRoleFormSchema } from "@/features/permission/schemas/permissionCreateOrUpdateSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { dayItems } from "@/features/dashboard/constants";
import { Label } from "@/components/ui/label";
import { FieldError } from "@/components/ui/field";
import EditIcon from "@/shared/icons/edit.svg?react";

interface Props {
  role: Role;
}

// This implementation follows the current (problematic) API behavior.
// Component must be adjusted after the API is corrected.

export const RoleUpdate = ({ role }: Props) => {
  const [step, setStep] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const [errors, setErrors] = useState<{ message: string }[]>();
  const [checkedParents, setCheckedParents] = useState<string[]>([]);
  const [checkedChildren, setCheckedChildren] = useState<string[]>([]);
  const { updateRoleAction } = useRoleActions();
  const { permissionsCategory } = usePermissionsCategoryQuery();
  const [search, setSearch] = useState("");
  const { createPermissionsOfRoleAction, deletePermissionsOfRoleAction } =
    usePremissionsOfRoleActions();
  const { permissionsOfRole } = usePermissionsOfRoleQuery(role.id);
  const permissionIds = permissionsOfRole?.data[0].permissions.map(
    (item: Permission) => String(item.id),
  );

  const roleForm = useForm({
    resolver: zodResolver(roleFormSchema),
    defaultValues: {
      name: "",
      maxRequestPerMinute: 100,
      workingTimeLimitStart: "01:00:00",
      workingTimeLimitEnd: "23:30:00",
      workingDayLimit: [0, 1, 2, 3, 4, 5, 6],
    },
  });

  useEffect(() => {
    if (role) {
      roleForm.reset({
        ...role,
        workingDayLimit: role.workingDayLimit.map((item) => String(item)),
        workingTimeLimitStart: getStartTime(role.workingTimeLimit),
        workingTimeLimitEnd: getEndTime(role.workingTimeLimit),
      });
    }
  }, [role]);

  const permissionsOfRoleForm = useForm({
    resolver: zodResolver(permissionsOfRoleFormSchema),
    defaultValues: {
      role_ids: [],
      permission_ids: [],
    },
  });

  const maxRequestPerMinute = roleForm.watch("maxRequestPerMinute");

  // Filter categories by children (permissions)
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

  const handleParentChange = (
    category: CategoryOfPermissions,
    isChecked: boolean,
  ) => {
    let newCheckedChildren: string[] = [];

    if (isChecked) {
      setCheckedParents((prev) => Array.from(new Set([...prev, category.id])));
      newCheckedChildren = Array.from(
        new Set([...checkedChildren, ...category.permissions.map((p) => p.id)]),
      );
    } else {
      setCheckedParents((prev) => prev.filter((id) => id !== category.id));
      newCheckedChildren = checkedChildren.filter(
        (id) => !category.permissions.some((p) => p.id === id),
      );
    }

    setCheckedChildren(newCheckedChildren);
    permissionsOfRoleForm.setValue("permission_ids", newCheckedChildren, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

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
      newCheckedChildren = checkedChildren.filter((id) => id !== permission.id);

      const siblingsChecked = category.permissions.some(
        (p) => checkedChildren.includes(p.id) && p.id !== permission.id,
      );

      if (!siblingsChecked) {
        setCheckedParents((prev) => prev.filter((id) => id !== category.id));
      }
    }

    setCheckedChildren(newCheckedChildren);
    permissionsOfRoleForm.setValue("permission_ids", newCheckedChildren, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const isParentChecked = (category: CategoryOfPermissions) =>
    checkedParents.includes(category.id);

  const isChildChecked = (permission: PermissionsOfRole) =>
    checkedChildren.includes(permission.id);

  const roleFormSubmitHandler = async (
    input: z.infer<typeof roleFormSchema>,
  ) => {
    try {
      const newInput = {
        ...input,
        id: role.id,
      };
      await updateRoleAction.mutateAsync(newInput);
      setStep(2);
      setErrors(undefined);
    } catch (error) {
      if (error instanceof Array) setErrors(error);
    }
  };

  const permissionsOfRoleFormSubmitHandler = async () => {
    try {
      await deletePermissionsOfRoleAction.mutateAsync({
        permission_ids: permissionIds,
        role_ids: [role.id],
      });
      await createPermissionsOfRoleAction.mutateAsync({
        role_ids: [role.id],
        permission_ids: checkedChildren,
      });

      setOpenModal(false);
      permissionsOfRoleForm.reset();
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
        <Button className="bg-navy-blue hover:bg-navy-blue text-blue-darker border border-blue-darker px-6">
          <EditIcon className="size-5 text-blue-darker" />
          Edit Role
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-background-default text-white p-8 max-h-11/12 max-w-115! **:last:data-[slot=dialog-close]:top-9 **:last:data-[slot=dialog-close]:end-8">
        {/* Dialog header */}
        <DialogHeader>
          <DialogTitle className="text-lg font-bold">
            Create a New Role
          </DialogTitle>
          <DialogDescription className="hidden">
            Create another role
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

        {/* Main content */}
        {step === 1 ? (
          <Form {...roleForm}>
            <form
              onSubmit={roleForm.handleSubmit(roleFormSubmitHandler)}
              className="flex flex-col gap-6"
            >
              <span className="text-sm text-orange">
                Choosing a name and role time limits
              </span>

              <FormField
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel
                      htmlFor="name"
                      className="text-gray-lighter font-normal ps-0.5"
                    >
                      Role name:
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="bg-muted"
                        placeholder="Enter your refrence"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="maxRequestPerMinute"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <div className="flex items-center justify-between">
                      <FormLabel className="text-xs text-gray-lighter">
                        Maximum Request Per Minutes
                      </FormLabel>
                      <FormControl>
                        <ButtonGroup
                          orientation="horizontal"
                          className="items-center"
                        >
                          <ButtonGroup>
                            <Button
                              type="button"
                              size="icon"
                              className="disabled:text-gray-500 rounded-full size-5"
                              disabled={maxRequestPerMinute === 0}
                              onClick={() =>
                                field.onChange(
                                  Number(field.value) > 0
                                    ? Number(field.value) - 1
                                    : 0,
                                )
                              }
                            >
                              <MinusIcon className="size-3" />
                            </Button>
                          </ButtonGroup>
                          <ButtonGroup className="relative">
                            <InputGroup className="rounded-md!">
                              <InputGroupInput
                                placeholder="0"
                                className="w-30 rounded-md font-bold pe-10"
                                inputMode="numeric"
                                value={field.value}
                                onChange={(e) =>
                                  isOnlyNumber(e.target.value) &&
                                  field.onChange(e.target.value)
                                }
                              ></InputGroupInput>
                            </InputGroup>
                            <span className="absolute top-1/2 end-2 -translate-y-1/2 text-xs text-gray-lighter">
                              Days
                            </span>
                          </ButtonGroup>
                          <ButtonGroup>
                            <Button
                              type="button"
                              size="icon"
                              className="rounded-full size-5"
                              onClick={() =>
                                field.onChange(Number(field.value) + 1)
                              }
                            >
                              <PlusIcon className="size-3" />
                            </Button>
                          </ButtonGroup>
                        </ButtonGroup>
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="workingDayLimit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-lighter font-normal ps-0.5">
                      Daily role limit
                    </FormLabel>
                    <FormControl>
                      <ToggleGroup
                        type="multiple"
                        className="flex flex-wrap gap-2 grow border border-default p-2 text-white *:rounded-md! *:bg-gray-items *:hover:bg-gray-items *:hover:text-foreground *:data-[state=on]:bg-blue-darkest *:data-[state=on]:text-blue-darker *:data-[state=on]:border *:data-[state=on]:border-primary"
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        {dayItems.map(({ item, value }) => (
                          <ToggleGroupItem key={item} value={String(item)}>
                            {value}
                          </ToggleGroupItem>
                        ))}
                      </ToggleGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex flex-col gap-2">
                <Label className="text-gray-lighter text-nowrap font-normal ps-0.5">
                  Operating hours on selected days
                </Label>

                <div className="flex justify-between gap-3 *:basis-1/2">
                  <FormField
                    control={roleForm.control}
                    name="workingTimeLimitStart"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <SelectTrigger
                              id="workingTimeLimitStart"
                              className="w-full h-11! bg-muted border-default opacity-100! [&_svg:not([class*='text-'])]:text-foreground [&_svg:not([class*='text-'])]:opacity-100"
                            >
                              <div className="flex items-center w-full">
                                <Clock className="text-primary" />
                                <div className="flex flex-col mx-auto">
                                  <span className="text-xs text-orange font-bold">
                                    Start time
                                  </span>
                                  <SelectValue
                                    placeholder={field.value ? field.value : ""}
                                  />
                                </div>
                              </div>
                            </SelectTrigger>
                            <SelectContent>
                              {workingTime.map((time) => (
                                <SelectItem
                                  key={time}
                                  value={time}
                                  className="hover:bg-primary! hover:text-foreground! [&_svg:not([class*='text-'])]:text-forground"
                                >
                                  {time}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormDescription />
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={roleForm.control}
                    name="workingTimeLimitEnd"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <SelectTrigger
                              id="workingTimeLimitStart"
                              className="w-full h-11! bg-muted border-default opacity-100! [&_svg:not([class*='text-'])]:text-foreground [&_svg:not([class*='text-'])]:opacity-100"
                            >
                              <div className="flex items-center w-full">
                                <Clock className="text-primary" />
                                <div className="flex flex-col mx-auto">
                                  <span className="text-xs text-orange font-bold">
                                    End time
                                  </span>
                                  <SelectValue
                                    placeholder={field.value ? field.value : ""}
                                  />
                                </div>
                              </div>
                            </SelectTrigger>
                            <SelectContent>
                              {workingTime.map((time) => (
                                <SelectItem
                                  key={time}
                                  value={time}
                                  className="hover:bg-primary! hover:text-foreground! [&_svg:not([class*='text-'])]:text-forground"
                                >
                                  {time}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormDescription />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Dialog footer */}
              <DialogFooter className="grid grid-cols-2 gap-3">
                <DialogClose asChild>
                  <Button variant="secondary">Close</Button>
                </DialogClose>

                <Button
                  type="submit"
                  className="bg-navy-blue hover:bg-navy-blue text-blue-darker border border-blue-darker"
                >
                  {updateRoleAction.isPending ? <Spinner /> : "Continue"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        ) : (
          <Form {...permissionsOfRoleForm}>
            <form
              className="flex flex-col gap-4"
              onSubmit={permissionsOfRoleForm.handleSubmit(
                permissionsOfRoleFormSubmitHandler,
              )}
            >
              <span className="text-sm text-orange">Select Permissions</span>

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
                            control={permissionsOfRoleForm.control}
                            name="permission_ids"
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

              {permissionsOfRoleForm.formState.errors.permission_ids && (
                <FormMessage>
                  <>
                    {
                      permissionsOfRoleForm.formState.errors.permission_ids
                        .message
                    }
                  </>
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
                  {createPermissionsOfRoleAction.isPending ? (
                    <Spinner />
                  ) : (
                    "Confirm Role"
                  )}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
};
