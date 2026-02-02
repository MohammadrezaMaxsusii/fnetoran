import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Link, useNavigate } from "react-router";
import ReactJsonView from "@microlink/react-json-view";
import { useAssetsQuery } from "../hooks";
import { Skeleton } from "@/components/ui/skeleton";
// import { ChevronRightIcon } from "@heroicons/react/16/solid";

import { useBoolean } from "@/hooks/use-boolean";

// import { useDeviceQuery, useAssetsQuery } from "@/actions/device";

import { DeviceHardeningDialog } from "../components/device-hardening-dialog";

// ----------------------------------------------------------------------

export function DeviceDetailsPage() {
  const navigate = useNavigate();
  const hardening = useBoolean();

  //   const { device, deviceLoading } = useDeviceQuery();
  const { assets, assetsLoading } = useAssetsQuery();

  return (
    <>
      <div className="w-full pe-5">
        <section className="w-full bg-gray-darker rounded-2xl">
          {/* Header of table */}
          <div className="flex items-center justify-between p-7">
            <span className="text-lg font-bold text-primary">
              Device Hardening
            </span>

            <Button
              variant="secondary"
              onClick={() => navigate("/devices/list")}
              className="border border-default p-3"
            >
              <img src="/icons/back.svg" alt="back icon" className="size-5.5" />
              Back to List
            </Button>
          </div>

          <div className="px-7">
            <Separator className="bg-default" />
          </div>

          <div className="p-6">
            <div className="flex items-center justify-between rounded-2xl bg-gray-items p-6">
              <span className="font-bold text-white">
                Device Hardening Management
              </span>

              <button
                type="button"
                className="rounded-xl bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-blue-500"
                onClick={hardening.onTrue}
              >
                Device Hardening
              </button>
            </div>

            <div className="mt-4 rounded-2xl bg-gray-items p-6">
              {assetsLoading ? (
                <Skeleton className="h-96 w-full" />
              ) : (
                <ReactJsonView
                  theme="brewer"
                  src={assets.data[0]}
                  iconStyle="circle"
                  collapsed={1}
                  name={false}
                  displayDataTypes={false}
                  showComma={false}
                  enableClipboard={false}
                />
              )}
            </div>
          </div>
        </section>
      </div>

      <DeviceHardeningDialog
        open={hardening.value}
        onClose={hardening.onFalse}
      />
    </>
  );
}
