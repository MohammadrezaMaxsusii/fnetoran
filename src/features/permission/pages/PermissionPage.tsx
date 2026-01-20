import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useNavigate, useParams } from "react-router";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Empty,
  EmptyContent,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import PermissionIcon from "@/shared/icons/permission.svg?react";
import { usePermissionsOfPermissionCategoryQuery } from "../hooks/usePermissionsOfPermissionCategoryQuery";
import type { Permission } from "../types";

export const PermissionPage = () => {
  const navigate = useNavigate();
  const id = useParams().id as string;
  const {
    permissionsOfPermissionCateogory,
    permissionsOfPermissionCateogoryIsPending,
  } = usePermissionsOfPermissionCategoryQuery(id);

  return (
    <section className="w-full pe-6 pb-6">
      <div className="bg-gray-darker rounded-2xl">
        {/* Header of section */}
        <div className="flex items-center justify-between p-7">
          <span className="text-lg font-bold text-primary">Premissions</span>
          <Button
            variant="secondary"
            onClick={() => navigate("/permissions")}
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
          {permissionsOfPermissionCateogoryIsPending ? (
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
          ) : permissionsOfPermissionCateogory?.data.length === 0 ? (
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
              {permissionsOfPermissionCateogory?.data.map(
                (premission: Permission) => (
                  <ul key={premission.id} className="grid grid-cols-3 gap-4">
                    {premission.permissions.map(({ id, text }) => (
                      <li
                        key={id}
                        className="text-center bg-muted p-4 rounded-lg"
                      >
                        {text}
                      </li>
                    ))}
                  </ul>
                )
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
};
