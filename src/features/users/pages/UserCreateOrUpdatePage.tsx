import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useRolesQuery } from "@/features/roles/hooks";
import type { Role } from "@/features/roles/types";
import { formatLocalDate } from "@/shared/utils/fromatLocalDate";
import { AlertCircleIcon, ChevronDownIcon } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { useDropzone } from "react-dropzone";
import { cn } from "@/lib/utils";
import { ButtonGroup } from "@/components/ui/button-group";
import PlusIcon from "@/shared/icons/plus.svg?react";
import MinusIcon from "@/shared/icons/minus.svg?react";
import WarningIcon from "@/shared/icons/error.svg?react";
import { getDate, getTargetDate, isOnlyNumber } from "@/shared/utils";
import { Toggle } from "@/components/ui/toggle";
import CalendarIcon from "@/shared/icons/calendar.svg?react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import DatePickerIcon from "@/shared/icons/datePicker.svg?react";
import z from "zod";
import { userCreateOrUpdateSchema } from "../schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputGroup, InputGroupInput } from "@/components/ui/input-group";
import { useSpecificUserQuery, useUserActions } from "../hooks";
import { startOfDay } from "date-fns";
import password from "secure-random-password";
import View from "@/shared/icons/view.svg?react";
import ViewOff from "@/shared/icons/viewOff.svg?react";
import { useFileActions } from "@/shared/hooks/useFileActions";
import { toast } from "sonner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { FieldError } from "@/components/ui/field";

export const UserCreateOrUpdatePage = () => {
  const [openBirthdayCalendar, setOpenBirthdayCalendar] = useState(false);
  const [openDeactivedCalendar, setOpenDeactivedCalendar] = useState(false);
  const [show, setShow] = useState(false);
  const [errorUpload, setErrorUpload] = useState(false);
  const [errors, setErrors] = useState<{ message: string }[]>();
  const [file, setFile] = useState("");
  const { createUserAction, updateUserAction } = useUserActions();
  const { id } = useParams<{ id?: string }>();
  const { specificUser } = useSpecificUserQuery({ user_id: id });
  const { roles, rolesError, rolesIsLoading } = useRolesQuery();
  const { uploadFileAction } = useFileActions();
  const navigate = useNavigate();
  const isEdit = !!id;

  const form = useForm({
    resolver: zodResolver(userCreateOrUpdateSchema),
    defaultValues: {
      roleId: "",
      username: "",
      firstName: "",
      lastName: "",
      cellphone: "",
      email: "",
      password: "",
      passwordHistoryCount: 0,
      expirePasswordDays: 0,
      passwordAdvantageDays: 0,
    },
  });

  const onDrop = useCallback((acceptedFiles: File[], fileRejection: any[]) => {
    if (fileRejection.length > 0) {
      setErrorUpload(true);
      setFile("");
      return;
    }
    const file = acceptedFiles[0];

    if (file) {
      setFile(URL.createObjectURL(file));
      setErrorUpload(false);

      const formData = new FormData();
      formData.append("file", acceptedFiles[0]);

      uploadFileAction.mutate(formData, {
        onSuccess: (data) => {
          toast.success("File upload successfully.");
          form.setValue("profileId", data?.data.id);
        },
        onError: () => {
          toast.error("File upload faild.");
        },
      });
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/jpeg": [],
      "image/png": [],
      "image/jpg": [],
    },
    maxSize: 200 * 1024,
    multiple: false,
    onDrop,
  });

  useEffect(() => {
    form.reset({
      ...specificUser?.data,
      roleId: specificUser?.data.userRoleId,
    });
  }, [specificUser?.data]);

  const [expirePasswordDays, passwordAdvantageDays] = form.watch([
    "expirePasswordDays",
    "passwordAdvantageDays",
  ]);

  const onSubmit = async (input: z.infer<typeof userCreateOrUpdateSchema>) => {
    try {
      if (isEdit) {
        const newInput = {
          ...input,
          userId: specificUser?.data.id,
        };
        await updateUserAction.mutateAsync(newInput);
      } else {
        await createUserAction.mutateAsync(input);
      }
    } catch (error) {
      if (error instanceof Array) setErrors(error);
    }
  };

  return (
    <section className="w-full pe-6 pb-6">
      <div className="bg-gray-darker rounded-2xl">
        {/* Header of table */}
        <div className="flex items-center justify-between p-7">
          <span className="text-lg font-bold text-primary">
            Create New User
          </span>
          <Button
            variant="secondary"
            onClick={() => navigate("/users")}
            className="border border-default p-3"
          >
            <img src="/icons/back.svg" alt="back icon" className="size-5.5" />
            Back to List
          </Button>
        </div>

        <div className="px-7">
          <Separator className="bg-default" />
        </div>

        {/* Form section */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {errors && (
              <div className="px-7 pt-6">
                <Alert variant="destructive">
                  <AlertCircleIcon />
                  <AlertTitle>Something went wrong!</AlertTitle>
                  <AlertDescription>
                    <FieldError errors={errors} />
                  </AlertDescription>
                </Alert>
              </div>
            )}

            {/* Role and premission section */}
            <div className="px-7">
              <div className="flex gap-4 pb-6 pt-3 border-b border-default">
                <div className="grow flex items-center justify-between text-sm bg-blue-darkest rounded-lg p-8">
                  <div>
                    <span className="font-bold">User role</span>
                    <p className="text-blue-darker max-w-3/5">
                      You can choose the user role according to the position and
                      role of the user or employee in their work specialty.
                    </p>
                  </div>
                  <FormField
                    name="roleId"
                    render={({ field }) => (
                      <FormItem className="flex items-baseline gap-3">
                        <FormLabel htmlFor="roleId" className="font-normal">
                          Role:
                        </FormLabel>
                        <div className="space-y-1">
                          <FormControl>
                            <Select
                              value={field.value}
                              onValueChange={field.onChange}
                              disabled={rolesIsLoading}
                            >
                              <SelectTrigger
                                id="role"
                                className="w-70 h-10! bg-muted border-default font-bold opacity-100! [&_svg:not([class*='text-'])]:text-foreground [&_svg:not([class*='text-'])]:opacity-100"
                              >
                                <SelectValue
                                  placeholder={
                                    rolesIsLoading
                                      ? "Loading..."
                                      : "Select role"
                                  }
                                />
                              </SelectTrigger>
                              <SelectContent>
                                {!!rolesError && (
                                  <SelectItem
                                    value="error"
                                    disabled
                                    className="hover:bg-primary! hover:text-foreground! [&_svg:not([class*='text-'])]:text-forground"
                                  >
                                    {rolesError.message}
                                  </SelectItem>
                                )}

                                {roles?.data.length === 0 && (
                                  <SelectItem
                                    value="empty"
                                    disabled
                                    className="hover:bg-primary! hover:text-foreground! [&_svg:not([class*='text-'])]:text-forground"
                                  >
                                    There is no options!
                                  </SelectItem>
                                )}

                                {roles?.data.map((role: Role) => (
                                  <SelectItem
                                    key={role.id}
                                    value={String(role.id)}
                                    className="hover:bg-primary! hover:text-foreground! [&_svg:not([class*='text-'])]:text-forground"
                                  >
                                    {role.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
                {isEdit && (
                  <div className="flex items-center gap-10 p-8 bg-gray-items rounded-lg">
                    <div className="space-y-2">
                      <span className="block text-sm font-bold">
                        Permission
                      </span>
                      <span className="text-primary text-4xl font-bold">
                        39
                      </span>
                      <span className="text-gray-lighter">Access</span>
                    </div>
                    <Button className="bg-orange hover:bg-orange/90 text-gray-darker py-5!">
                      View Permission
                      <img
                        src="/icons/forwardArrow.svg"
                        alt="forward arrow icon"
                        className="size-6"
                      />
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* Profile section */}
            <div className="flex items-center gap-4 px-7 py-6 max-w-130">
              <div
                {...getRootProps()}
                className="relative shrink-0 size-22 rounded-full border-2 border-dashed border-blue-lighter cursor-pointer"
              >
                <FormField
                  name="profileId"
                  render={() => (
                    <FormItem>
                      <FormControl autoFocus>
                        <Input {...getInputProps()} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <img
                  src={file ? file : "/icons/user.svg"}
                  alt="profile image"
                  className="size-full rounded-full p-1 absolute inset-0"
                />

                <img
                  src="/icons/bluePlus.svg"
                  alt="plus icon"
                  className="size-6 absolute bottom-2.5 end-1 translate-y-1/2"
                />
              </div>
              <div>
                <span className="font-bold text-sm">Add Profile Picture</span>
                <p
                  className={cn(
                    "text-xs text-gray-light",
                    errorUpload && "text-red",
                  )}
                >
                  Use a square aspect ratio and JPEG, PNG, or JPG format. The
                  minimum image dimensions are 100 x 100 pixels and the maximum
                  image dimensions are 500 x 500 pixels. The image size should
                  not exceed 200 KB.
                </p>
              </div>
            </div>

            {/* user info section */}
            <div className="grid grid-cols-3 gap-x-20 gap-y-6 px-7 pb-6">
              <FormField
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm text-gray-lighter ms-2.5">
                      Username
                    </FormLabel>
                    <FormControl autoFocus>
                      <Input
                        placeholder="Enter your username"
                        className="bg-muted px-5 h-11 font-bold"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm text-gray-lighter ms-2.5">
                      First name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your first name"
                        className="bg-muted px-5 h-11 font-bold"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm text-gray-lighter ms-2.5">
                      Last name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your last name"
                        className="bg-muted px-5 h-11 font-bold"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm text-gray-lighter ms-2.5">
                      Gender
                    </FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger
                          id="gender"
                          className="px-5 h-11! w-full bg-muted border-default opacity-100! font-bold [&_svg:not([class*='text-'])]:text-foreground [&_svg:not([class*='text-'])]:opacity-100"
                        >
                          <SelectValue placeholder="Enter your gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem
                            value="1"
                            className="hover:bg-primary! hover:text-foreground! [&_svg:not([class*='text-'])]:text-forground"
                          >
                            Male
                          </SelectItem>
                          <SelectItem
                            value="2"
                            className="hover:bg-primary! hover:text-foreground! [&_svg:not([class*='text-'])]:text-forground"
                          >
                            Female
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="nationalId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm text-gray-lighter ms-2.5">
                      National code
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your national code"
                        className="bg-muted px-5 h-11 font-bold"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="education"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm text-gray-lighter ms-2.5">
                      Education
                    </FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger
                          id="education"
                          className="px-5 h-11! w-full bg-muted border-default opacity-100! font-bold [&_svg:not([class*='text-'])]:text-foreground [&_svg:not([class*='text-'])]:opacity-100"
                        >
                          <SelectValue placeholder="Enter your education" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem
                            value="سیکل"
                            className="hover:bg-primary! hover:text-foreground! [&_svg:not([class*='text-'])]:text-forground"
                          >
                            Middle School Diploma
                          </SelectItem>
                          <SelectItem
                            value="پیش دانشگاهی"
                            className="hover:bg-primary! hover:text-foreground! [&_svg:not([class*='text-'])]:text-forground"
                          >
                            Pre-University Diploma
                          </SelectItem>
                          <SelectItem
                            value="دیپلم"
                            className="hover:bg-primary! hover:text-foreground! [&_svg:not([class*='text-'])]:text-forground"
                          >
                            Diploma
                          </SelectItem>
                          <SelectItem
                            value="کاردانی"
                            className="hover:bg-primary! hover:text-foreground! [&_svg:not([class*='text-'])]:text-forground"
                          >
                            Associate
                          </SelectItem>
                          <SelectItem
                            value="کارشناسی"
                            className="hover:bg-primary! hover:text-foreground! [&_svg:not([class*='text-'])]:text-forground"
                          >
                            Bachelor
                          </SelectItem>
                          <SelectItem
                            value="کارشناسی ارشد"
                            className="hover:bg-primary! hover:text-foreground! [&_svg:not([class*='text-'])]:text-forground"
                          >
                            Master
                          </SelectItem>
                          <SelectItem
                            value="دکتری"
                            className="hover:bg-primary! hover:text-foreground! [&_svg:not([class*='text-'])]:text-forground"
                          >
                            Doctoral
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="cellphone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm text-gray-lighter ms-2.5">
                      Mobile Number
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your cellphone"
                        className="bg-muted px-5 h-11 font-bold"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm text-gray-lighter ms-2.5">
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your email"
                        className="bg-muted px-5 h-11 font-bold"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="birthday"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel
                      htmlFor="birthday"
                      className="text-sm text-gray-lighter ms-2.5"
                    >
                      Date of birth
                    </FormLabel>
                    <FormControl>
                      <Popover
                        open={openBirthdayCalendar}
                        onOpenChange={setOpenBirthdayCalendar}
                      >
                        <PopoverTrigger asChild>
                          <Button
                            id="birthday"
                            className="w-full px-5! h-11 font-bold bg-muted hover:bg-muted/75 border border-default justify-between"
                          >
                            <div className="flex items-center gap-2">
                              <DatePickerIcon className="fill-primary size-5.5" />
                              {field.value ? (
                                <span>{field.value}</span>
                              ) : (
                                <span className="text-muted-foreground">
                                  Enter your birthday
                                </span>
                              )}
                            </div>
                            <ChevronDownIcon />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent
                          className="w-auto overflow-hidden p-0"
                          align="start"
                        >
                          <Calendar
                            mode="single"
                            captionLayout="dropdown"
                            disabled={(date) => date > startOfDay(new Date())}
                            onSelect={(date) => {
                              if (date) {
                                const formatedDate = formatLocalDate(date);
                                field.onChange(formatedDate);
                              }
                              setOpenBirthdayCalendar(false);
                            }}
                            classNames={{
                              day_button: "hover:bg-primary hover:text-white",
                            }}
                          />
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Password section */}
            <div className="px-7">
              <div className="grid grid-cols-3 gap-x-20 gap-y-6 py-6 border-y border-default">
                <div className="flex items-end gap-2">
                  <FormField
                    name="password"
                    render={({ field }) => (
                      <FormItem className="grow">
                        <FormLabel className="text-sm text-gray-lighter ms-2.5">
                          Password of choice
                        </FormLabel>
                        <FormControl>
                          <div className="flex gap-2">
                            <div className="relative grow">
                              <Input
                                type={show ? "text" : "password"}
                                placeholder="Enter your password"
                                className="bg-muted px-5 h-11 font-bold relative"
                                {...field}
                              />

                              {show ? (
                                <ViewOff
                                  className="size-6 text-primary absolute end-5 top-1/2 -translate-y-1/2 cursor-pointer"
                                  onClick={() => setShow((prev) => !prev)}
                                />
                              ) : (
                                <View
                                  className="size-6 text-primary absolute end-5 top-1/2 -translate-y-1/2 cursor-pointer"
                                  onClick={() => setShow((prev) => !prev)}
                                />
                              )}
                            </div>

                            <Button
                              type="button"
                              className="bg-blue-darkest hover:bg-blue-darkest/75 border border-blue-darker text-blue-darker h-11"
                              onClick={() => {
                                const passwordValue = password.randomPassword({
                                  length: 10,
                                  characters: [
                                    password.lower,
                                    password.upper,
                                    password.digits,
                                    password.symbols,
                                  ],
                                });
                                form.setValue("password", passwordValue, {
                                  shouldValidate: true,
                                });
                              }}
                            >
                              <img
                                src="/icons/blueSync.svg"
                                alt="sync icon"
                                className="size-5"
                              />
                              Generate
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  name="passwordHistoryCount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm text-gray-lighter ms-2.5">
                        Number of saved password in history
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter number of saved password in history"
                          className="bg-muted px-5 h-11 font-bold"
                          inputMode="numeric"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex items-center gap-2">
                  <WarningIcon className="text-orange size-8" />
                  <p className="text-orange text-sm">
                    The user has registered the last 4 passwords and must set a
                    new password.
                  </p>
                </div>

                <FormField
                  name="expirePasswordDays"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm text-gray-lighter ms-2.5">
                        Number of days since password change
                      </FormLabel>
                      <FormControl>
                        <ButtonGroup orientation="horizontal">
                          <ButtonGroup>
                            <Button
                              type="button"
                              variant="secondary"
                              size="icon"
                              className="disabled:text-gray-500 text-primary"
                              disabled={expirePasswordDays === 0}
                              onClick={() =>
                                field.onChange(
                                  Number(field.value) > 0
                                    ? Number(field.value) - 1
                                    : 0,
                                )
                              }
                            >
                              <MinusIcon className="size-5.5" />
                            </Button>
                          </ButtonGroup>
                          <ButtonGroup className="relative">
                            <InputGroup className="rounded-md!">
                              <InputGroupInput
                                placeholder="0"
                                className="w-30 bg-background-default rounded-md font-bold pe-10"
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
                              variant="secondary"
                              size="icon"
                              className="text-primary"
                              onClick={() =>
                                field.onChange(Number(field.value) + 1)
                              }
                            >
                              <PlusIcon className="size-5.5" />
                            </Button>
                          </ButtonGroup>
                        </ButtonGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  name="passwordAdvantageDays"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm text-gray-lighter ms-2.5">
                        Number of additional days after password expiration
                      </FormLabel>
                      <FormControl>
                        <ButtonGroup orientation="horizontal">
                          <ButtonGroup>
                            <Button
                              type="button"
                              variant="secondary"
                              size="icon"
                              className="disabled:text-gray-500 text-primary"
                              disabled={passwordAdvantageDays === 0}
                              onClick={() =>
                                field.onChange(
                                  Number(field.value) > 0
                                    ? Number(field.value) - 1
                                    : 0,
                                )
                              }
                            >
                              <MinusIcon className="size-5.5" />
                            </Button>
                          </ButtonGroup>
                          <ButtonGroup className="relative">
                            <InputGroup className="rounded-md!">
                              <InputGroupInput
                                placeholder="0"
                                className="w-30 bg-background-default rounded-md font-bold pe-10"
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
                              variant="secondary"
                              size="icon"
                              className="text-primary"
                              onClick={() =>
                                field.onChange(Number(field.value) + 1)
                              }
                            >
                              <PlusIcon className="size-5.5" />
                            </Button>
                          </ButtonGroup>
                        </ButtonGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  name="mustChangePassword"
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-2">
                      <FormControl>
                        <Toggle
                          className="relative bg-primary hover:bg-primary data-[state=off]:bg-muted data-[state=on]:bg-primary border border-default w-9 h-5 rounded-full after:content-[''] after:size-3.5 after:bg-foreground after:rounded-full after:absolute after:start-1 data-[state=on]:after:start-auto data-[state=on]:after:end-1"
                          pressed={field.value}
                          onPressedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="text-sm text-foreground font-bold">
                        Change password after first login
                      </FormLabel>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="px-7 py-6">
              {/* Activate or deactivate section */}
              <div className="grid grid-cols-3 gap-x-20 gap-y-6">
                <div className={cn("col-span-3", isEdit && "col-span-2")}>
                  <p className="text-sm font-bold">
                    Activate or deactivate a user account
                    <span className="font-normal">
                      {" "}
                      (within a specified period){" "}
                    </span>
                  </p>
                  <div className="bg-blue-darkest p-4 rounded-md mt-3">
                    <FormField
                      name="active"
                      render={({ field }) => (
                        <FormItem className="flex items-center gap-3">
                          <FormControl>
                            <Toggle
                              className="relative bg-primary hover:bg-primary data-[state=off]:bg-muted data-[state=on]:bg-primary border border-default w-9 h-5 rounded-full after:content-[''] after:size-3.5 after:bg-foreground after:rounded-full after:absolute after:start-1 data-[state=on]:after:start-auto data-[state=on]:after:end-1"
                              pressed={field.value}
                              onPressedChange={field.onChange}
                            />
                          </FormControl>
                          <FormLabel className="flex flex-col items-start gap-px">
                            <span className="text-base text-foreground font-bold">
                              User Account
                            </span>
                            <p>
                              Activating or deactivating a user account in the
                              system
                            </p>
                          </FormLabel>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {isEdit && (
                  <div className="col-span-1 relative flex flex-col gap-2">
                    <span className="font-bold">
                      User account creation date
                    </span>
                    <div className="bg-gray-items grow flex items-center ps-15 rounded-md">
                      <div className="space-x-4">
                        <span>2025-10-24</span>
                        <span>|</span>
                        <span>14:39</span>
                      </div>

                      <CalendarIcon className="absolute top-1/2 end-15 -translate-y-1/3 scale-130" />
                    </div>
                  </div>
                )}

                <FormField
                  name="deactivedAt"
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-4 col-span-2">
                      <FormLabel className="text-sm text-foreground font-bold">
                        Date the user account was deactivated after creation
                      </FormLabel>
                      <FormControl>
                        <ToggleGroup
                          type="single"
                          className="grow border border-primary bg-gray-items text-white *:rounded-md! *:w-1/3 *:hover:bg-gray-items *:hover:text-foreground *:data-[state=on]:bg-primary *:data-[state=on]:text-white p-1"
                          onValueChange={(value) => {
                            let target: Date;

                            if (value === "1y") {
                              target = getTargetDate(new Date(), {
                                year: 1,
                                month: 0,
                              });
                            } else {
                              target = getTargetDate(new Date(), {
                                year: 0,
                                month: Number(value),
                              });
                            }

                            field.onChange(target.toISOString());
                          }}
                        >
                          <ToggleGroupItem value="3">3 Month</ToggleGroupItem>
                          <ToggleGroupItem value="6">6 Month</ToggleGroupItem>
                          <ToggleGroupItem value="1y">1 Year</ToggleGroupItem>
                        </ToggleGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  name="deactivedAt"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Popover
                          open={openDeactivedCalendar}
                          onOpenChange={setOpenDeactivedCalendar}
                        >
                          <PopoverTrigger asChild>
                            <Button
                              id="deactivedAt"
                              className="w-full px-5! h-full font-bold bg-muted hover:bg-muted/75 border border-default flex justify-between"
                            >
                              Desired date
                              <div className="flex items-center gap-1">
                                <DatePickerIcon className="fill-primary size-5.5" />
                                <span>{getDate(field.value)}</span>
                              </div>
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent
                            className="w-auto overflow-hidden p-0"
                            align="start"
                          >
                            <Calendar
                              mode="single"
                              captionLayout="dropdown"
                              onSelect={(date) => {
                                if (date) {
                                  const formatedDate = formatLocalDate(date);
                                  field.onChange(formatedDate);
                                }
                                setOpenDeactivedCalendar(false);
                              }}
                              classNames={{
                                day_button: "hover:bg-primary hover:text-white",
                              }}
                            />
                          </PopoverContent>
                        </Popover>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Confirm section */}
              <div className="pt-6 my-6 border-t border-default">
                <div className="bg-muted p-9 rounded-md flex items-center justify-between">
                  <div>
                    <span className="text-lg text-primary font-bold">
                      New user verification and registration
                    </span>
                    <p>
                      If you confirm the above information, click on the
                      confirmation option opposite.
                    </p>
                  </div>
                  <Button type="submit">Confirmation</Button>
                </div>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </section>
  );
};
