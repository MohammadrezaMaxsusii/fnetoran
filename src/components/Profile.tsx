import { Link } from "react-router";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Item, ItemContent, ItemMedia, ItemTitle } from "./ui/item";
import { Button } from "./ui/button";
import { useLogoutAction } from "@/features/auth/hooks/useLogoutAction";
import { useUserQuery } from "@/features/users/hooks/useUserQuery";
import { Separator } from "./ui/separator";

// To do dynamic

export const Profile = () => {
  const { logoutAction } = useLogoutAction();
  const { user } = useUserQuery();

  return (
    <>
      {/* User popover */}
      <Popover>
        <PopoverTrigger className="text-start flex items-center gap-3">
          {/* User profile */}
          <div className="relative">
            <Avatar className="border-2 border-primary size-11">
              <AvatarImage
                src="https://github.com/shadcn"
                className="rounded-full"
              />
              <AvatarFallback>
                <img
                  src="/icons/user.svg"
                  alt="user image"
                  className="size-9 rounded-full"
                />
              </AvatarFallback>
            </Avatar>
            <Badge className="size-2.5 p-0 bg-green rounded-full absolute bottom-1 end-0" />
          </div>

          {/* User info */}
          <div>
            <h6 className="text-sm font-bold capitalize">{user?.data.firstName + " " + user?.data.lastName}</h6>
            <span className="text-xs lowercase text-gray-lighter">
              {user?.data.email}
            </span>
          </div>

          <img
            src="/icons/arrow.svg"
            alt="arrow icon"
            className="size-6 ms-4"
          />
        </PopoverTrigger>

        <PopoverContent className="border-default p-7">
          {/* To do change to menu */}
          <Item
            className="group p-0 hover:bg-transparent! text-gray-lighter hover:text-white"
            size="sm"
            asChild
          >
            <Link to="#">
              <ItemMedia>
                <img
                  src="/icons/setting.svg"
                  alt="setting icon"
                  className="size-5 group-hover:brightness-0 group-hover:invert"
                />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>System Setting</ItemTitle>
              </ItemContent>
            </Link>
          </Item>

          <Separator className="bg-default my-4" />

          {/* Logout button */}
          <Button
            className="bg-navy-blue hover:bg-navy-blue text-blue-darker font-bold border border-blue-darker w-full"
            onClick={() => logoutAction.mutate()}
          >
            <img src="/icons/logout.svg" alt="logout icon" className="size-5" />
            Logout
          </Button>
        </PopoverContent>
      </Popover>
    </>
  );
};
