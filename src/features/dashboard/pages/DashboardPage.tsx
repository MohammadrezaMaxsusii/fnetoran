import { Button } from "@/components/ui/button";
import {
  AccessStatistics,
  Activities,
  RolesAndDevicesStatistics,
  UsersStatistics,
  UserTable,
} from "../components";

export const DashboardPage = () => {
  return (
    <div className="grid grid-cols-3 gap-6 pe-6">
      {/* Banner section */}
      <div className="relative col-span-2 space-y-6">
        <div className="col-span-2">
          <img
            src="/images/dashboard.webp"
            alt="dashboard image"
            className="rounded-2xl"
          />
          {/* <div className="flex flex-col gap-3 absolute top-1/2 -translate-y-1/2 left-14">
          <h4 className="text-orange">Welcome to Netoran</h4>
          <span className="text-2xl font-bold">Hi! Mobin Kazemi</span>
          <Button className="w-fit">User Profile</Button>
        </div> */}
        </div>

        <div className="grid grid-cols-2 gap-6">
          {/* Access statistics section */}
          <AccessStatistics />

          {/* Users statistics section */}
          <UsersStatistics />

          {/* Users table */}
          <UserTable />
        </div>
      </div>

      {/* Activities section */}
      <Activities />
      
      {/* Roles and devices statistics section */}
      <RolesAndDevicesStatistics />
    </div>
  );
};
