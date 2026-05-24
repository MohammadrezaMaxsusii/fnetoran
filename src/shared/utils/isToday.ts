import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'

import { dayItems } from '@/features/dashboard/constants'

dayjs.extend(utc)
dayjs.extend(timezone)

const jsDay = dayjs().tz('Asia/Tehran').day()
const today = (jsDay + 1) % 7

export const isToday = (day: string) => dayItems[today].value === day
