import { useEffect, useState } from "react";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
// import {
//   ChevronDownIcon,
//   ChevronRightIcon,
//   ChevronUpIcon,
// } from "@heroicons/react/16/solid";
import { Link, useNavigate, useParams } from "react-router";
import { api } from "@/shared/libs/axiosInstance";
import { useDeviceQuery } from "../hooks";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

// import axiosInstance from "@/utils/axios";

// import { useDeviceQuery } from "@/actions/device";

// ----------------------------------------------------------------------

export function DeviceHardeningCheckPage() {
  const [loading, setLoading] = useState([]);
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const { deviceId, cisId } = useParams();

  const { device, deviceLoading } = useDeviceQuery();

  useEffect(() => {
    const query = async () => {
      setLoading(true);

      try {
        const response = await api.get(
          `/hardening/hardening_check_list/${cisId}`,
        );

        setData(response.data.data.cis.categories);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    query();
  }, [cisId]);

  useEffect(() => {
    const eventSource = new EventSource(
      `${import.meta.env.VITE_BACKEND_URL}/hardening/stream/check/${deviceId}_${cisId}`,
    );

    eventSource.onmessage = (event) => {
      const update = JSON.parse(event.data);
      setData((prevData) => {
        const newData = {};
        for (const plane in prevData) {
          newData[plane] = {};
          for (const category in prevData[plane]) {
            newData[plane][category] = prevData[plane][category].map((rule) =>
              rule.id === update.data?.hardeningId
                ? { ...rule, finalResult: update.data?.finalResult }
                : rule,
            );
          }
        }
        return newData;
      });
    };

    return () => {
      eventSource.close();
    };
  }, []);

  if (loading || deviceLoading) return "Loading...";

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
              onClick={() => navigate(`/device/${deviceId}`)}
              className="border border-default p-3"
            >
              <img src="/icons/back.svg" alt="back icon" className="size-5.5" />
              Back to List
            </Button>
          </div>

          <div className="px-7">
            <Separator className="bg-default" />
          </div>

          <div className="space-y-4 p-6">
            {Object.entries(data).map(([plane, categories]) => (
              <div key={plane}>
                <div className="rounded-2xl bg-gray-500 py-3 pr-6 font-bold text-white">
                  {plane}
                </div>

                <div className="flex px-6 py-3 text-sm font-bold">
                  <div className="grow">بررسی CIS</div>

                  <div className="w-20 text-center">سطح</div>

                  <div className="w-44 text-left">نتیجه</div>
                </div>

                <div className="space-y-2">
                  {Object.entries(categories).map(([category, rules]) => (
                    <Disclosure key={category} as="div" className="space-y-2">
                      <DisclosureButton className="group flex w-full items-center rounded-2xl bg-gray-200 px-6 py-3">
                        <span className="font-bold text-gray-800">
                          {category}
                        </span>

                        {/* <ChevronDownIcon
                      aria-hidden="true"
                      className="mr-auto size-4 text-gray-500 group-data-open:hidden"
                    /> */}

                        {/* <ChevronUpIcon
                      aria-hidden="true"
                      className="mr-auto size-4 text-gray-500 group-not-data-open:hidden"
                    /> */}
                      </DisclosureButton>

                      <DisclosurePanel className="space-y-2 pr-6">
                        {rules.map((rule) => (
                          <div
                            key={rule.id}
                            className="flex rounded-2xl bg-gray-100 px-6 py-3"
                          >
                            <div className="grow text-sm font-bold">
                              {rule.title}
                            </div>

                            <div className="w-20 text-center text-sm font-bold">
                              {rule.level}
                            </div>

                            <div className="w-44">
                              {!Object.keys(rule).includes("finalResult") && (
                                <svg
                                  className="mr-auto size-5 animate-spin text-orange-500"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                >
                                  <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    stroke-width="4"
                                  ></circle>
                                  <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                  ></path>
                                </svg>
                              )}

                              {rule.finalResult === null && (
                                <div className="flex items-center justify-end gap-x-2 text-gray-500">
                                  <span className="text-sm">
                                    قابل انجام نمی باشد
                                  </span>

                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                  >
                                    <path
                                      fill-rule="evenodd"
                                      clip-rule="evenodd"
                                      d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM15.75 12C15.75 12.4142 15.4142 12.75 15 12.75H9C8.58579 12.75 8.25 12.4142 8.25 12C8.25 11.5858 8.58579 11.25 9 11.25H15C15.4142 11.25 15.75 11.5858 15.75 12Z"
                                      fill="#808080"
                                    />
                                  </svg>
                                </div>
                              )}

                              {rule.finalResult === true && (
                                <div className="flex items-center justify-end gap-x-2 text-green-500">
                                  <span className="text-sm">انجام شده</span>

                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                  >
                                    <path
                                      fill-rule="evenodd"
                                      clip-rule="evenodd"
                                      d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM16.0303 8.96967C16.3232 9.26256 16.3232 9.73744 16.0303 10.0303L11.0303 15.0303C10.7374 15.3232 10.2626 15.3232 9.96967 15.0303L7.96967 13.0303C7.67678 12.7374 7.67678 12.2626 7.96967 11.9697C8.26256 11.6768 8.73744 11.6768 9.03033 11.9697L10.5 13.4393L12.7348 11.2045L14.9697 8.96967C15.2626 8.67678 15.7374 8.67678 16.0303 8.96967Z"
                                      fill="#2CAE76"
                                    />
                                  </svg>
                                </div>
                              )}

                              {rule.finalResult === false && (
                                <div className="flex items-center justify-end gap-x-2 text-red-500">
                                  <span className="text-sm">انجام نشده</span>

                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                  >
                                    <path
                                      fill-rule="evenodd"
                                      clip-rule="evenodd"
                                      d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM8.96963 8.96965C9.26252 8.67676 9.73739 8.67676 10.0303 8.96965L12 10.9393L13.9696 8.96967C14.2625 8.67678 14.7374 8.67678 15.0303 8.96967C15.3232 9.26256 15.3232 9.73744 15.0303 10.0303L13.0606 12L15.0303 13.9696C15.3232 14.2625 15.3232 14.7374 15.0303 15.0303C14.7374 15.3232 14.2625 15.3232 13.9696 15.0303L12 13.0607L10.0303 15.0303C9.73742 15.3232 9.26254 15.3232 8.96965 15.0303C8.67676 14.7374 8.67676 14.2625 8.96965 13.9697L10.9393 12L8.96963 10.0303C8.67673 9.73742 8.67673 9.26254 8.96963 8.96965Z"
                                      fill="#DE2C43"
                                    />
                                  </svg>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </DisclosurePanel>
                    </Disclosure>
                  ))}
                </div>
              </div>
            ))}
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

            {/* <div className="mt-4 rounded-2xl bg-gray-items p-6">
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
            </div> */}
          </div>
        </section>
      </div>

      <div className="divide-y divide-gray-200 overflow-hidden rounded-2xl bg-white shadow-sm">
        <div className="px-6 py-5">
          <div className="-mt-2 -mr-4 flex items-center justify-between">
            <div className="mt-2 mr-4">
              <div className="flex gap-x-1.5">
                <h3 className="text-base font-semibold text-orange-500">
                  مقاوم سازی دستگاه
                </h3>
                <span className="font-semibold text-gray-800">{`${device.type} ${device.subtype}`}</span>
              </div>
            </div>

            <div className="mt-2 mr-4 shrink-0">
              <Link
                to={`/dashboard/device/${deviceId}`}
                className="inline-flex items-center gap-x-2 rounded-xl bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50"
              >
                {/* <ChevronRightIcon aria-hidden="true" className="-mr-0.5 size-4" /> */}
                بازگشت به دستگاه
              </Link>
            </div>
          </div>
        </div>

        <div className="space-y-4 p-6">
          {Object.entries(data).map(([plane, categories]) => (
            <div key={plane}>
              <div className="rounded-2xl bg-gray-500 py-3 pr-6 font-bold text-white">
                {plane}
              </div>

              <div className="flex px-6 py-3 text-sm font-bold">
                <div className="grow">بررسی CIS</div>

                <div className="w-20 text-center">سطح</div>

                <div className="w-44 text-left">نتیجه</div>
              </div>

              <div className="space-y-2">
                {Object.entries(categories).map(([category, rules]) => (
                  <Disclosure key={category} as="div" className="space-y-2">
                    <DisclosureButton className="group flex w-full items-center rounded-2xl bg-gray-200 px-6 py-3">
                      <span className="font-bold text-gray-800">
                        {category}
                      </span>

                      {/* <ChevronDownIcon
                      aria-hidden="true"
                      className="mr-auto size-4 text-gray-500 group-data-open:hidden"
                    /> */}

                      {/* <ChevronUpIcon
                      aria-hidden="true"
                      className="mr-auto size-4 text-gray-500 group-not-data-open:hidden"
                    /> */}
                    </DisclosureButton>

                    <DisclosurePanel className="space-y-2 pr-6">
                      {rules.map((rule) => (
                        <div
                          key={rule.id}
                          className="flex rounded-2xl bg-gray-100 px-6 py-3"
                        >
                          <div className="grow text-sm font-bold">
                            {rule.title}
                          </div>

                          <div className="w-20 text-center text-sm font-bold">
                            {rule.level}
                          </div>

                          <div className="w-44">
                            {!Object.keys(rule).includes("finalResult") && (
                              <svg
                                className="mr-auto size-5 animate-spin text-orange-500"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <circle
                                  className="opacity-25"
                                  cx="12"
                                  cy="12"
                                  r="10"
                                  stroke="currentColor"
                                  stroke-width="4"
                                ></circle>
                                <path
                                  className="opacity-75"
                                  fill="currentColor"
                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                              </svg>
                            )}

                            {rule.finalResult === null && (
                              <div className="flex items-center justify-end gap-x-2 text-gray-500">
                                <span className="text-sm">
                                  قابل انجام نمی باشد
                                </span>

                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                >
                                  <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM15.75 12C15.75 12.4142 15.4142 12.75 15 12.75H9C8.58579 12.75 8.25 12.4142 8.25 12C8.25 11.5858 8.58579 11.25 9 11.25H15C15.4142 11.25 15.75 11.5858 15.75 12Z"
                                    fill="#808080"
                                  />
                                </svg>
                              </div>
                            )}

                            {rule.finalResult === true && (
                              <div className="flex items-center justify-end gap-x-2 text-green-500">
                                <span className="text-sm">انجام شده</span>

                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                >
                                  <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM16.0303 8.96967C16.3232 9.26256 16.3232 9.73744 16.0303 10.0303L11.0303 15.0303C10.7374 15.3232 10.2626 15.3232 9.96967 15.0303L7.96967 13.0303C7.67678 12.7374 7.67678 12.2626 7.96967 11.9697C8.26256 11.6768 8.73744 11.6768 9.03033 11.9697L10.5 13.4393L12.7348 11.2045L14.9697 8.96967C15.2626 8.67678 15.7374 8.67678 16.0303 8.96967Z"
                                    fill="#2CAE76"
                                  />
                                </svg>
                              </div>
                            )}

                            {rule.finalResult === false && (
                              <div className="flex items-center justify-end gap-x-2 text-red-500">
                                <span className="text-sm">انجام نشده</span>

                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                >
                                  <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM8.96963 8.96965C9.26252 8.67676 9.73739 8.67676 10.0303 8.96965L12 10.9393L13.9696 8.96967C14.2625 8.67678 14.7374 8.67678 15.0303 8.96967C15.3232 9.26256 15.3232 9.73744 15.0303 10.0303L13.0606 12L15.0303 13.9696C15.3232 14.2625 15.3232 14.7374 15.0303 15.0303C14.7374 15.3232 14.2625 15.3232 13.9696 15.0303L12 13.0607L10.0303 15.0303C9.73742 15.3232 9.26254 15.3232 8.96965 15.0303C8.67676 14.7374 8.67676 14.2625 8.96965 13.9697L10.9393 12L8.96963 10.0303C8.67673 9.73742 8.67673 9.26254 8.96963 8.96965Z"
                                    fill="#DE2C43"
                                  />
                                </svg>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </DisclosurePanel>
                  </Disclosure>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
