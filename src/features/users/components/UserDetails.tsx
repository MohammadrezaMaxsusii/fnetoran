import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";
import { genderItems } from "../constants";
import { getDate, getEndTime, getTime } from "@/shared/utils";
import type { User } from "../types";

interface Props {
  user: User;
}

export const UserDetails = ({ user }: Props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="p-2.5!">
          <img src="/icons/view.svg" alt="edit icon" className="size-5" />
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-background-default text-white p-8 max-h-11/12 overflow-y-auto max-w-115! **:last:data-[slot=dialog-close]:top-9 **:last:data-[slot=dialog-close]:end-8">
        {/* Dialog header */}
        <DialogHeader>
          <DialogTitle className="text-lg font-bold">
            View User Details
          </DialogTitle>
          <DialogDescription className="hidden">
            User information overview
          </DialogDescription>
        </DialogHeader>

        {/* Dialog content */}
        <div>
          {/* Fullname, email and status of user */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="border-2 border-orange rounded-full size-8">
                {/* To do fetch user profile */}
                <img
                  src={false ? "" : "/icons/user.svg"}
                  alt="profile image"
                  className="size-full rounded-full"
                />
              </div>

              <div className="flex flex-col">
                <span className="text-sm font-bold capitalize">
                  {user.firstName + " " + user.lastName}
                </span>
                <span className="text-xs text-gray-lighter lowercase">
                  {user.email}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-1 font-bold text-sm">
              {user.active ? (
                <>
                  <div className="w-3 h-3 bg-green rounded-full" />
                  <span>Active</span>
                </>
              ) : (
                <>
                  <div className="w-3 h-3 bg-red rounded-full" />
                  <span>Inactive</span>
                </>
              )}
            </div>
          </div>

          {/* Role of user */}
          <div className="flex items-center justify-between my-3 py-2.5 px-5 border border-default rounded-lg text-sm">
            <span className="text-gray-lighter">Role name:</span>
            <p className="font-bold">{user.role.name}</p>
          </div>

          {/* Other user info */}
          <Item className="py-1 px-0">
            <ItemContent className="flex flex-row justify-between">
              <ItemTitle className="font-normal text-gray-lighter">
                User Name:
              </ItemTitle>
              <ItemDescription className="font-normal text-white capitalize">
                {user.username || "---"}
              </ItemDescription>
            </ItemContent>
          </Item>
          <Item className="py-1 px-0">
            <ItemContent className="flex flex-row justify-between">
              <ItemTitle className="font-normal text-gray-lighter">
                Gender:
              </ItemTitle>
              <ItemDescription className="font-normal text-white capitalize">
                {genderItems[user.gender] || "---"}
              </ItemDescription>
            </ItemContent>
          </Item>
          <Item className="py-1 px-0">
            <ItemContent className="flex flex-row justify-between">
              <ItemTitle className="font-normal text-gray-lighter">
                National code:
              </ItemTitle>
              <ItemDescription className="font-normal text-white capitalize">
                {user.nationalId || "---"}
              </ItemDescription>
            </ItemContent>
          </Item>
          <Item className="py-1 px-0">
            <ItemContent className="flex flex-row justify-between">
              <ItemTitle className="font-normal text-gray-lighter">
                Education:
              </ItemTitle>
              <ItemDescription className="font-normal text-white capitalize">
                {user.education || "---"}
              </ItemDescription>
            </ItemContent>
          </Item>
          <Item className="py-1 px-0">
            <ItemContent className="flex flex-row justify-between">
              <ItemTitle className="font-normal text-gray-lighter">
                Mobile Number:
              </ItemTitle>
              <ItemDescription className="font-normal text-white capitalize">
                {user.cellphone || "---"}
              </ItemDescription>
            </ItemContent>
          </Item>
          <Item className="py-1 px-0">
            <ItemContent className="flex flex-row justify-between">
              <ItemTitle className="font-normal text-gray-lighter">
                Date of birth:
              </ItemTitle>
              <ItemDescription className="font-normal text-white capitalize">
                {getEndTime(user.birthday) || "---"}
              </ItemDescription>
            </ItemContent>
          </Item>

          {/* Auth info of user */}
          <div className="py-4 border-y border-default my-2.5 space-y-3">
            <div className="flex items-center gap-1 font-bold text-sm">
              <img
                src={
                  user.twoFAEnabled ? "/icons/success.svg" : "/icons/fail.svg"
                }
                alt="success icon"
                className="size-5 rotate-20"
              />
              Activating Two-factor Authentication
              <span className="font-normal">(Email - SMS)</span>
            </div>

            <div className="flex items-center gap-1 font-bold text-sm">
              <img
                src={
                  user.mustChangePassword
                    ? "/icons/success.svg"
                    : "/icons/fail.svg"
                }
                alt="success icon"
                className="size-5 rotate-20"
              />
              Change Password After login
            </div>

            <div>
              <div className="flex items-center justify-between text-sm text-gray-lighter">
                Saved password history:
                <span className="font-bold text-foreground">
                  {user.passwordHistoryCount}
                </span>
              </div>
              <p className="text-orange text-[10px]">
                The user has registered the last {user.passwordHistoryCount}{" "}
                passwords and must set a new password.
              </p>
            </div>

            <div className="flex items-center justify-between text-sm text-gray-lighter">
              Days since password change:
              <span className="font-bold text-foreground">
                {user.expirePasswordDays
                  ? `${user.expirePasswordDays} Day`
                  : "---"}
              </span>
            </div>

            <div className="flex items-center justify-between text-sm text-gray-lighter">
              Additional days after password expiration:
              <span className="font-bold text-foreground">
                {user.passwordAdvantageDays
                  ? `${user.passwordAdvantageDays} Day`
                  : "---"}
              </span>
            </div>
          </div>

          {/* Account creation info */}
          <div className="pt-1.5 border-default space-y-3">
            <div className="flex items-center justify-between text-sm text-gray-lighter">
              User account creation date:
              <span className="text-foreground">
                {getDate(user.createdAt)} | {getTime(user.createdAt)}
              </span>
            </div>

            {user.deactivedAt && (
              <div className="py-3 px-6 border border-default rounded-lg text-sm text-center space-y-2">
                <p>Date the user account was deactivated after creation</p>
                <span className="text-orange">{getDate(user.deactivedAt)}</span>
              </div>
            )}
          </div>
        </div>

        {/* Dialog footer */}
        <DialogFooter className="grid grid-cols-2 gap-3">
          <Button className="bg-navy-blue hover:bg-navy-blue text-blue-darker border border-blue-darker">
            <img src="/icons/edit.svg" alt="edit icon" className="size-5" />
            Edit User
          </Button>
          <DialogClose asChild>
            <Button variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
