import { useState, useMemo } from "react";
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
import AddIcon from "@/shared/icons/plus.svg?react";
import {
  AlertCircleIcon,
  Clock,
  MinusIcon,
  PlusIcon,
  Search,
} from "lucide-react";
import { useRoleActions } from "../hooks";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { getErrorMessage, isOnlyNumber } from "@/shared/utils";
import { Spinner } from "@/components/ui/spinner";
import type { PermissionsOfRole } from "../types";
import type { CategoryOfPermissions } from "@/features/permission/types";
import {
  usePermissionsCategoryQuery,
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

export const RoleCreate = () => {
  const [step, setStep] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [checkedParents, setCheckedParents] = useState<string[]>([]);
  const [checkedChildren, setCheckedChildren] = useState<string[]>([]);
  const { createRoleAction } = useRoleActions();
  const { createPremissionsOfRoleAction } = usePremissionsOfRoleActions();
  const { permissionsCategory } = usePermissionsCategoryQuery();

  const roleForm = useForm({
    resolver: zodResolver(roleFormSchema),
    defaultValues: {
      name: "",
      maxRequestPerMinute: 100,
      workingDayLimit: ["0", "1", "2", "3", "4", "5", "6"],
    },
  });

  const permissionsOfRoleForm = useForm({
    resolver: zodResolver(permissionsOfRoleFormSchema),
    defaultValues: {
      search: "",
      role_ids: "",
      permission_ids: checkedChildren,
    },
  });

  const maxRequestPerMinute = roleForm.watch("maxRequestPerMinute");
  const search = permissionsOfRoleForm.watch("search");

  // Filter categories by children (permissions)
  const filteredData = useMemo(() => {
    if (!search) return permissionsCategory?.data;

    return permissionsCategory?.data
      .map((category: CategoryOfPermissions) => {
        const filteredPermissions = category.permissions.filter((permission) =>
          permission.text.toLowerCase().includes(search.toLowerCase())
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
    isChecked: boolean
  ) => {
    if (isChecked) {
      setCheckedParents((prev) => Array.from(new Set([...prev, category.id])));
      setCheckedChildren((prev) =>
        Array.from(new Set([...prev, ...category.permissions.map((p) => p.id)]))
      );
    } else {
      setCheckedParents((prev) => prev.filter((id) => id !== category.id));
      setCheckedChildren((prev) =>
        prev.filter((id) => !category.permissions.some((p) => p.id === id))
      );
    }
  };

  const handleChildChange = (
    category: CategoryOfPermissions,
    permission: PermissionsOfRole,
    isChecked: boolean
  ) => {
    if (isChecked) {
      setCheckedChildren((prev) =>
        Array.from(new Set([...prev, permission.id]))
      );
      if (!checkedParents.includes(category.id)) {
        setCheckedParents((prev) => [...prev, category.id]);
      }
    } else {
      setCheckedChildren((prev) => prev.filter((id) => id !== permission.id));

      const siblingsChecked = category.permissions.some(
        (p) => checkedChildren.includes(p.id) && p.id !== permission.id
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

  const roleFormSubmitHandler = async (
    input: z.infer<typeof roleFormSchema>
  ) => {
    try {
      const res = await createRoleAction.mutateAsync(input);
      permissionsOfRoleForm.setValue("role_ids", [res.data.id]);
      setStep(2);
    } catch (error) {
      setErrorMessage(getErrorMessage(error));
    }
  };

  const permissionsOfRoleFormSubmitHandler = async () => {
    permissionsOfRoleForm.setValue("permission_ids", checkedChildren);

    try {
      await createPremissionsOfRoleAction.mutateAsync(permissionsOfRoleForm.getValues());
      roleForm.reset();
      permissionsOfRoleForm.reset();
      setOpenModal(false);
    } catch (error) {
      setErrorMessage(getErrorMessage(error));
    }
  };

  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      <DialogTrigger asChild>
        <Button>
          <AddIcon className="text-foreground" />
          Add role
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
          {errorMessage && (
            <Alert variant="destructive">
              <AlertCircleIcon />
              <AlertTitle>Something went wrong!</AlertTitle>
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
          )}
        </DialogHeader>

        {/* Main content */}

        {step === 1 ? (
          <Form {...roleForm}>
            <form
              onSubmit={roleForm.handleSubmit(roleFormSubmitHandler)}
              className="flex flex-col gap-4"
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
                                    : 0
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

              <div className="flex items-end justify-between *:basis-1/2">
                <FormField
                  control={roleForm.control}
                  name="workingTimeLimitStart"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel
                        htmlFor="workingTimeLimitStart"
                        className="text-gray-lighter text-nowrap font-normal ps-0.5"
                      >
                        Operating hours on selected days
                      </FormLabel>
                      <FormControl>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger
                            id="workingTimeLimitStart"
                            className="w-45 h-12! bg-muted border-default opacity-100! [&_svg:not([class*='text-'])]:text-foreground [&_svg:not([class*='text-'])]:opacity-100"
                          >
                            <div className="flex items-center w-full">
                              <Clock className="text-primary" />
                              <div className="flex flex-col mx-auto">
                                <span className="text-xs text-orange">
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
                    <FormItem className="flex flex-col items-center">
                      <FormControl>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger
                            id="workingTimeLimitStart"
                            className="w-45 h-12! bg-muted border-default opacity-100! [&_svg:not([class*='text-'])]:text-foreground [&_svg:not([class*='text-'])]:opacity-100"
                          >
                            <div className="flex items-center w-full">
                              <Clock className="text-primary" />
                              <div className="flex flex-col mx-auto">
                                <span className="text-xs text-orange">
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

              {/* Dialog footer */}
              <DialogFooter className="grid grid-cols-2 gap-3">
                <DialogClose asChild>
                  <Button variant="secondary">Close</Button>
                </DialogClose>

                <Button
                  type="submit"
                  className="bg-navy-blue hover:bg-navy-blue text-blue-darker border border-blue-darker"
                >
                  {createRoleAction.isPending ? <Spinner /> : "Continue"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        ) : (
          <div className="flex flex-col gap-4">
            <span className="text-sm text-orange">Select Role Permissions</span>

            <InputGroup className="bg-gray-darker">
              <InputGroupInput
                placeholder="Search your access..."
                {...permissionsOfRoleForm.register("search")}
              />
              <InputGroupAddon align="inline-end">
                <Search className="text-white" />
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
                              checked === true
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
              <Button variant="secondary" onClick={() => setStep(1)}>
                Previous
              </Button>

              <Button
                onClick={permissionsOfRoleFormSubmitHandler}
                className="bg-navy-blue hover:bg-navy-blue text-blue-darker border border-blue-darker"
              >
                {createRoleAction?.isPending ? <Spinner /> : "Confirm Role"}
              </Button>
            </DialogFooter>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
