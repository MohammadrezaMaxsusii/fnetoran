import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useNavigate, useParams } from "react-router";
import { usePermissionsOfRole } from "../hooks";
import type { CategoryOfRole } from "../types";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Empty,
  EmptyContent,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import PermissionIcon from "@/shared/icons/permission.svg?react";

export const RolePage = () => {
  const navigate = useNavigate();
  const id = useParams().id as string;
  const { premissionsOfRole, premissionsOfRoleIsPending } =
    usePermissionsOfRole(id);

  return (
    <section className="w-full pe-6 pb-6">
      <div className="bg-gray-darker rounded-2xl">
        {/* Header of section */}
        <div className="flex items-center justify-between p-7">
          <span className="text-lg font-bold text-primary">Premissions</span>
          <Button
            variant="secondary"
            onClick={() => navigate("/roles")}
            className="border border-default p-3"
          >
            <img src="/icons/back.svg" alt="back icon" className="size-5.5" />
            Back to List
          </Button>
        </div>

        <div className="px-7">
          <Separator className="bg-default" />
        </div>

        <div className="p-7 space-y-12">
          {premissionsOfRoleIsPending ? (
            <>
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index}>
                  <div className="flex items-center gap-1 pb-4">
                    <Skeleton className="size-5 rounded-full" />
                    <Skeleton className="h-8 w-40" />
                  </div>
                  <div className="grid grid-cols-3 gap-4 *:h-14">
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                  </div>
                </div>
              ))}
            </>
          ) : premissionsOfRole?.data.length === 0 ? (
            <>
              {/* Empty section */}
              <Empty className="pt-3! pb-7! gap-2">
                <EmptyHeader>
                  <EmptyMedia variant="icon">
                    <PermissionIcon className="size-5" />
                  </EmptyMedia>
                  <EmptyTitle>Permissions List Empty!</EmptyTitle>
                </EmptyHeader>
                <EmptyContent className="text-sm text-muted-foreground">
                  Permissions will appear here once they are added.
                </EmptyContent>
              </Empty>
            </>
          ) : (
            <>
              {premissionsOfRole?.data.map((premission: CategoryOfRole) => (
                <div key={premission.id}>
                  <div className="flex items-center gap-2 pb-5">
                    <span className="inline-block size-4 bg-transparent rounded-full border-4 border-primary" />
                    <h6 className="text-primary">{premission.name}</h6>
                  </div>
                  <ul className="grid grid-cols-3 gap-4">
                    {premission.permissions.map((item) => (
                      <li
                        key={item.id}
                        className="text-center bg-muted p-4 rounded-lg"
                      >
                        {item.text}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </section>
  );
};
