import { Separator } from "@/components/ui/separator";
import { Link } from "react-router";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Empty,
  EmptyContent,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import DeviceIcon from "@/shared/icons/devices.svg?react";
import { useAssetTypesQuery } from "../hooks/useAssetTypesQuery";

export const AssetTypesPage = () => {
  const { assetTypes, assetTypesIsLoading } = useAssetTypesQuery();

  return (
    <section className="w-full pe-6 pb-6">
      <div className="bg-gray-darker rounded-2xl">
        {/* Header of section */}
        <span className="text-lg font-bold text-primary p-7 inline-block">
          Asset Types
        </span>

        <div className="px-7">
          <Separator className="bg-default" />
        </div>

        <div className="p-7 space-y-12">
          {assetTypesIsLoading ? (
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
          ) : assetTypes?.data.length === 0 ? (
            <>
              {/* Empty section */}
              <Empty className="pt-3! pb-7! gap-2">
                <EmptyHeader>
                  <EmptyMedia variant="icon">
                    <DeviceIcon className="size-5" />
                  </EmptyMedia>
                  <EmptyTitle>Assets List Empty!</EmptyTitle>
                </EmptyHeader>
                <EmptyContent className="text-sm text-muted-foreground">
                  Assets will appear here once they are added.
                </EmptyContent>
              </Empty>
            </>
          ) : (
            <>
              <ul className="grid grid-cols-3 gap-4">
                {assetTypes?.data.map(
                  ({ id, name }: { id: number; name: string }) => (
                    <li key={id} className="text-center bg-muted rounded-lg">
                      <Link
                        to={id.toString()}
                        className="p-4 inline-block size-full"
                      >
                        {name}
                      </Link>
                    </li>
                  )
                )}
              </ul>
            </>
          )}
        </div>
      </div>
    </section>
  );
};
