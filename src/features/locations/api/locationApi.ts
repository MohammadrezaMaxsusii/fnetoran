import { z } from 'zod'

import { api } from '@/shared/libs/axiosInstance'

import type { locationFormSchema } from '../schemas'

export const getLocation = async (id: number) => {
	const { data } = await api.get(`/locations/info/${id}`)
	return data
}

export const createLocation = async (
	input: z.infer<typeof locationFormSchema>
) => {
	const { data } = await api.post('/locations/create', input)
	return data
}

export const updateLocation = async (
	input: z.infer<typeof locationFormSchema>
) => {
	const { data } = await api.post('/locations/update', input)
	return data
}

export const deleteLocation = async (id: number) => {
	const { data } = await api.delete(`/locations/delete/${id}`)
	return data
}
