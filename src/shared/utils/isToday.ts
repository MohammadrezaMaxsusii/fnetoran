import { dayItems } from "@/features/dashboard/constants";
import type { WeekDay } from "../types/weekDayType";

const today = new Date().getDay() as WeekDay;

export const isToday = (day: string) => dayItems[today] === day;
