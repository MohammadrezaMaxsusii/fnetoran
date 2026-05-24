import { z } from 'zod'

import { api } from '@/shared/libs/axiosInstance'

import type { zoneCreateSchema } from '../schemas'

export const createZone = async (input: z.infer<typeof zoneCreateSchema>) => {
	const { data } = await api.post('/device/zone/create', input)
	return data
}

export const deleteZone = async (id: string) => {
	const { data } = await api.delete(`/device/zone/delete/${id}`)
	return data
}

export const updateZone = async ({
	id,
	input
}: {
	id: string
	input: z.infer<typeof zoneCreateSchema>
}) => {
	const { data } = await api.post(`/device/zone/update/${id}`, input)
	return data
}
