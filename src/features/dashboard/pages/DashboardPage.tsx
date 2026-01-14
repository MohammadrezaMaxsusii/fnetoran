import { Button } from "@/components/ui/button";
import {
  AccessStatistics,
  Activities,
  RolesAndDevicesStatistics,
  UsersStatistics,
  UserTable,
} from "../components";
import { useUserQuery } from "@/features/users/hooks";

export const DashboardPage = () => {
  const { user, userError, userIsError } = useUserQuery();

  return (
    <div className="grid grid-cols-3 grid-rows-[repeat(3,auto)] gap-5 pe-5 pb-6">
      {/* Banner section */}
      <div className="relative col-span-2 row-span-1 space-y-6 h-75">
        <img
          src="/images/dashboard.webp"
          alt="dashboard image"
          className="rounded-2xl size-full object-cover"
        />

        {/* Overlay text */}
        <div className="flex flex-col gap-3 absolute top-1/2 -translate-y-1/2 left-14">
          <h4 className="text-orange">Welcome to Netoran</h4>
          <span className="text-2xl font-bold capitalize">
            Hi! {user?.data.firstName + " " + user?.data.lastName}
          </span>
          <Button disabled className="w-fit">
            User Profile
          </Button>
        </div>
      </div>

      {/* Activities section */}
      <Activities />

      {/* Access statistics section */}
      <AccessStatistics />

      {/* Users statistics section */}
      <UsersStatistics />

      {/* Users table */}
      {userIsError ? (
        <div>{userError?.message}</div>
      ) : (
        <UserTable />
      )}

      {/* Roles and devices statistics section */}
      <RolesAndDevicesStatistics />
    </div>
  );
};
