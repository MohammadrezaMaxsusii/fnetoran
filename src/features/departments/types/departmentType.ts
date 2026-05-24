import { z } from 'zod'

import type { departmentFormSchema } from '../schemas'

export type Department = z.infer<typeof departmentFormSchema>

export type DepartmentTree = Department & {
	children: DepartmentTree[]
}
