import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { useUsersQuery } from "@/features/users/hooks";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import type { User } from "@/features/users/types";
import { getDate, getTime } from "@/shared/utils";
import {
  Empty,
  EmptyContent,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

export const UserTable = () => {
  const { users, usersIsLoading } = useUsersQuery({ list_limit: "3" });
  const navigate = useNavigate();

  if (usersIsLoading) {
    return (
      <section className="col-span-2 bg-gray-darker p-6 rounded-2xl space-y-2">
        <div className="flex items-center justify-between">
          {/* Header of table */}
          <span className="text-gray-lighter text-sm font-semibold">
            Last User list
          </span>
          <Button
            variant="secondary"
            className="border border-default"
            onClick={() => navigate("/users")}
          >
            View All
          </Button>
        </div>

        {/* User table */}
        <Table className="border-separate border-spacing-y-1">
          <TableBody className="flex flex-col gap-1">
            {Array.from({ length: 3 }).map((_, index) => (
              <TableRow
                key={index}
                className="bg-gray-darker hover:bg-gray-darker odd:bg-gray-items odd:hover:bg-gray-items rounded-lg"
              >
                <TableCell className="block rounded-lg overflow-hidden px-8 border border-default">
                  <div className="flex justify-between items-center space-x-4">
                    <Skeleton className="size-8 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-62.5" />
                      <Skeleton className="h-3 w-50" />
                    </div>
                    <Skeleton className="h-4 w-25" />
                    <Skeleton className="h-4 w-10" />
                    <Skeleton className="h-4 w-14" />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
    );
  }

  if (users.data.length === 0) {
    return (
      <section className="col-span-2 bg-gray-darker p-6 rounded-2xl space-y-2">
        {/* Header */}
        <span className="text-gray-lighter text-sm font-semibold">
          Last User list
        </span>

        {/* Empty section */}
        <Empty className="py-3! gap-2">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <img src="/icons/user.svg" alt="user icon" className="size-5" />
            </EmptyMedia>
            <EmptyTitle>Users List Empty!</EmptyTitle>
          </EmptyHeader>
          <EmptyContent className="text-sm text-muted-foreground">
            Users will appear here once they are added.
          </EmptyContent>
        </Empty>
      </section>
    );
  }

  return (
    <section className="col-span-2 bg-gray-darker p-6 rounded-2xl space-y-2">
      {/* Header of table */}
      <div className="flex items-center justify-between">
        <span className="text-gray-lighter text-sm font-semibold">
          Last User list
        </span>
        <Button
          variant="secondary"
          className="border border-default"
          onClick={() => navigate("/users")}
        >
          View All
        </Button>
      </div>

      {/* User table */}
      <Table className="border-separate border-spacing-y-1">
        <TableBody>
          {users.data.map((user: User) => (
            <TableRow
              key={user.id}
              className="bg-gray-darker hover:bg-gray-darker odd:bg-gray-items odd:hover:bg-gray-items"
            >
              {/* User info */}
              <TableCell className="px-4 py-2 rounded-l-lg border-y border-s border-default">
                <div className="flex items-center gap-4">
                  <div className="border-2 border-orange rounded-full size-8">
                    {/* To do fetch user profile */}
                    <img
                      src={user.profileId ? "" : "/icons/user.svg"}
                      alt="profile image"
                      className="size-full rounded-full"
                    />
                  </div>

                  <div className="flex flex-col">
                    <span className="text-sm font-bold">
                      {user.firstName + " " + user.lastName}
                    </span>
                    <span className="text-xs text-gray-lighter">
                      {user.email}
                    </span>
                  </div>
                </div>
              </TableCell>

              {/* User role */}
              <TableCell className="px-4 py-2 text-center border-y border-default">
                {user.role.name}
              </TableCell>

              {/* User register time */}
              <TableCell className="px-4 py-2 text-center border-y border-default">
                {getDate(user.createdAt)} | {getTime(user.createdAt)}
              </TableCell>

              {/* User status */}
              <TableCell className="px-4 py-2 text-center rounded-r-lg border-y border-e border-default">
                {user.active ? (
                  <div className="flex items-center justify-center gap-1">
                    <div className="w-3 h-3 bg-green rounded-full" />
                    <span>Active</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-1">
                    <div className="w-3 h-3 bg-red rounded-full" />
                    <span>Inactive</span>
                  </div>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
};
