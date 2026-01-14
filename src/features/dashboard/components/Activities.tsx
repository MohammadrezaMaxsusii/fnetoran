import { dayItems } from "../constants";
import { cn } from "@/lib/utils";
import { useUserQuery } from "@/features/users/hooks/useUserQuery";
import {
  getDate,
  getEndTime,
  getStartTime,
  getTime,
  isToday,
} from "@/shared/utils";
import dayjs from "dayjs";

export const Activities = () => {
  const { user } = useUserQuery();
  const date = dayjs();
  const monthYear = date.format("MMMM, YYYY");

  return (
    <div className="row-span-2 bg-gray-darker p-6 rounded-2xl space-y-6 flex flex-col justify-between">
      {/* Header section */}
      <div className="flex items-center justify-between">
        <span className="text-lg font-bold">Weekday activities</span>
        <span className="text-orange text-sm font-medium">{monthYear}</span>
      </div>

      {/* Activities section */}
      <ul className="grow flex flex-col justify-between">
        {dayItems.map((day) => (
          <li
            key={day.value}
            className="grid grid-cols-7 items-center px-1 py-2 rounded-lg even:bg-gray-items"
          >
            {/* Day section  */}
            <div className="col-span-2">
              <span
                className={cn(
                  "px-3 py-2 inline-block",
                  isToday(day.value) && "bg-primary px-3 py-2 rounded-lg font-bold"
                )}
              >
                {day.value}
              </span>
            </div>

            {/* Time section */}
            <div className="col-span-3 text-xs pt-0.5">
              {user?.data.workingTimeLimit ? (
                <p className="text-gray-lighter text-center">
                  From
                  <span className="font-bold text-white">
                    {" "}
                    {getStartTime(user.data.workingTimeLimit)}{" "}
                  </span>
                  to
                  <span className="font-bold text-white">
                    {" "}
                    {getEndTime(user.data.workingTimeLimit)}{" "}
                  </span>
                </p>
              ) : (
                <p className="text-center text-sm">Always</p>
              )}
            </div>

            {/* Status section */}
            <div className="col-span-2 text-sm pe-1">
              {user?.data?.workingDayLimit?.includes(day.item) ? (
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
            </div>
          </li>
        ))}
      </ul>

      {/* Login date section */}
      <div className="bg-linear-to-b from-[#344EFE] to-[#18299E] px-6 py-4 rounded-xl relative">
        <span className="text-sm text-gray-lighter font-bold">Login Date</span>
        <div className="flex items-center gap-3 text-sm my-4">
          <span>{getDate(user?.data.lastSessionDate)}</span>
          <span className="text-gray-lighter">|</span>
          <span>{getTime(user?.data.lastSessionDate)}</span>
        </div>
        <div className="flex items-end justify-between">
          <p className="text-gray-lighter text-sm font-bold pb-1.5">
            Duration of Presence
          </p>
          <span className="text-orange text-4xl font-bold">∞</span>
        </div>
        <img
          src="/icons/calendar.svg"
          alt="calendar icon"
          className="size-20 absolute -top-4 end-7"
        />
      </div>
    </div>
  );
};
