import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
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
import { userDetailsItems } from "../constants";
import { getDate, getTime } from "@/shared/utils";

// To do dynamic

export const UserDetails = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Open Dialog</Button>
      </DialogTrigger>

      <DialogContent className="bg-background-default text-white p-8 h-11/12 overflow-y-auto max-w-115! **:last:data-[slot=dialog-close]:top-9 **:last:data-[slot=dialog-close]:end-8">
        {/* Dialog header */}
        <DialogHeader>
          <DialogTitle className="text-lg font-bold">
            View User Details
          </DialogTitle>
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
                  {"Hamid" + " " + "Mohamadi"}
                </span>
                <span className="text-xs text-gray-lighter lowercase">
                  Mohammadrezaesfandiari@gmail.com
                </span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-1 font-bold text-sm">
              {true ? (
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
            <p className="font-bold">Security and Firewall Expert</p>
          </div>

          {/* Other user info */}
          {userDetailsItems.map((userDetail) => (
            <Item key={userDetail.key} className="py-1 px-0">
              <ItemContent className="flex flex-row justify-between">
                <ItemTitle className="font-normal text-gray-lighter">
                  {userDetail.key}:
                </ItemTitle>
                <ItemDescription className="font-normal text-white capitalize">
                  {userDetail.value}
                </ItemDescription>
              </ItemContent>
            </Item>
          ))}

          {/* Auth info of user */}
          <div className="py-4 border-y border-default my-2.5 space-y-3">
            <div className="flex items-center gap-1 font-bold text-sm">
              <img
                src="/icons/success.svg"
                alt="success icon"
                className="size-5 rotate-20"
              />
              Activating Two-factor Authentication
              <span className="font-normal">(Email - SMS)</span>
            </div>

            <div className="flex items-center gap-1 font-bold text-sm">
              <img
                src="/icons/fail.svg"
                alt="success icon"
                className="size-5 rotate-20"
              />
              Change Password After login
            </div>

            <div>
              <div className="flex items-center justify-between text-sm text-gray-lighter">
                Saved password history:
                <span className="font-bold text-foreground">4</span>
              </div>
              <p className="text-orange text-[10px]">
                The user has registered the last 4 passwords and must set a new
                password.
              </p>
            </div>

            <div className="flex items-center justify-between text-sm text-gray-lighter">
              Days since password change:
              <span className="font-bold text-foreground">30 Day</span>
            </div>

            <div className="flex items-center justify-between text-sm text-gray-lighter">
              Additional days after password expiration:
              <span className="font-bold text-foreground">3 Day</span>
            </div>
          </div>

          {/* Account creation info */}
          <div className="pt-1.5 pb-5 border-b border-default space-y-3">
            <div className="flex items-center justify-between text-sm text-gray-lighter">
              User account creation date:
              <span className="text-foreground">
                {getDate(new Date().toISOString())} | {getTime(new Date().toISOString())}
              </span>
            </div>

            <div className="py-3 px-6 border border-default rounded-lg text-sm text-center space-y-2">
              <p>Date the user account was deactivated after creation</p>
              <span className="text-orange">1 Year</span>
            </div>
          </div>
        </div>

        {/* Dialog footer */}
        <DialogFooter className="grid grid-cols-2 gap-3 py-2">
          <Button className="bg-navy-blue hover:bg-navy-blue text-blue-darker border border-blue-darker py-4">
            <img src="/icons/edit.svg" alt="edit icon" className="size-5" />
            Edit User
          </Button>
          <DialogClose asChild>
            <Button variant="secondary" className="py-4">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
