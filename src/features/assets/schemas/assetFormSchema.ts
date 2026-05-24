import { z } from 'zod'

import type { DynamicField } from '@/shared/types'

export const generateSchema = (fields: DynamicField[]) => {
	const specificationsShape: Record<string, z.ZodTypeAny> = {}

	fields.forEach(field => {
		let schema: z.ZodTypeAny

		switch (field.field_type) {
			case 'text':
				schema = z.coerce.string().min(1, `${field.label} is required`)
				break

			case 'number':
				schema = z.coerce.number({
					error: `${field.label} is required`
				})
				break

			case 'boolean':
				schema = z.coerce.boolean()
				break

			default:
				schema = z.any()
		}

		specificationsShape[field.name] = field.is_required
			? schema
			: schema.optional()
	})

	return z.object({
		name: z.string().min(1, 'Name is required'),
		asset_tag: z.string().optional(),
		serial_number: z.string().optional(),
		vendor_id: z.coerce.number().optional(),
		model: z.string().optional(),
		series: z.string().optional(),
		hostname: z.string().optional(),
		is_managable: z.stringbool().optional(),
		ip_address: z.string().optional(),
		mac_address: z.string().optional(),
		status: z.string().optional(),
		condition: z.string().optional(),
		location_id: z.coerce.number().optional(),
		department_id: z.coerce.number().optional(),
		assigned_to_user_id: z.coerce.number().optional(),
		purchase_date: z.string().optional(),
		purchase_price: z.coerce.number().optional(),
		warranty_expiry: z.string().optional(),
		description: z.string().optional(),
		notes: z.string().optional(),
		specifications: z.object(specificationsShape)
	})
}
