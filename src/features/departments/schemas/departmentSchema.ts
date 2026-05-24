import { z } from 'zod'

export const departmentFormSchema = z.object({
	id: z.number().optional(),
	organization_id: z.number(),
	name: z.string().trim().nonempty('Name is required.'),
	parent_id: z.number().optional(),
	slug: z.string().optional(),
	code: z.string().optional(),
	description: z.string().nullish(),
	manager_user_id: z.number().optional(),
	is_active: z.stringbool().optional(),
	createdAt: z.string().optional()
})
