import { isToday } from "@/shared/utils/isToday";
import { activityItems } from "../constants";
import { cn } from "@/lib/utils";

export const Activities = () => {
  return (
    <div className="bg-gray-darker p-6 rounded-2xl space-y-6">
      {/* Header section */}
      <div className="flex items-center justify-between">
        <span className="text-lg font-bold">Weekday activities</span>
        <span className="text-orange text-sm font-medium">October, 2025</span>
      </div>

      {/* Activities section */}
      <ul>
        {activityItems.map(({ day, startTime, endTime, allowed }) => (
          <li
            key={day}
            className="grid grid-cols-7 items-center p-1 rounded-xl even:bg-gray-items"
          >
            {/* Day section  */}
            <div className="col-span-2">
              <span
                className={cn(
                  "px-3 py-2 inline-block",
                  isToday(day) && "bg-primary px-3 py-2 rounded-xl font-bold"
                )}
              >
                {day}
              </span>
            </div>

            {/* Time section */}
            <div className="col-span-3 text-xs pt-1">
              {startTime && endTime && (
                <p className="text-gray-lighter text-center">
                  From
                  <span className="font-bold text-white"> {startTime} </span>
                  to
                  <span className="font-bold text-white"> {endTime} </span>
                </p>
              )}
            </div>

            {/* Status section */}
            <div className="col-span-2 text-sm pe-1">
              {allowed ? (
                <div className="flex items-center justify-end gap-1">
                  <div className="size-3 bg-green rounded-full" />
                  <span>Activity</span>
                </div>
              ) : (
                <span className="text-gray-lighter block text-end">
                  No activity
                </span>
              )}
            </div>
          </li>
        ))}
      </ul>

      {/* Login date section */}
      <div className="bg-linear-to-b from-[#344EFE] to-[#18299E] px-6 py-4 rounded-xl relative">
        <span className="text-sm text-gray-lighter font-bold">Login Date</span>
        <div className="flex items-center gap-3 text-sm my-4">
          <span>2025-10-24</span>
          <span className="text-gray-lighter">|</span>
          <span>14:39</span>
        </div>
        <div className="flex items-end justify-between">
          <p className="text-gray-lighter text-sm font-bold pb-1.5">
            Duration of Presence
          </p>
          <span className="text-orange text-3xl font-bold">00:20:59</span>
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
