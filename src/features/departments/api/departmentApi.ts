import { z } from 'zod'

import { api } from '@/shared/libs/axiosInstance'

import type { departmentFormSchema } from '../schemas'

export const getDepartment = async (id: number) => {
	const { data } = await api.get(`/departments/info/${id}`)
	return data
}

export const createDepartment = async (
	input: z.infer<typeof departmentFormSchema>
) => {
	const { data } = await api.post('/departments/create', input)
	return data
}

export const updateDepartment = async (
	input: z.infer<typeof departmentFormSchema>
) => {
	const { data } = await api.post('/departments/update', input)
	return data
}

export const deleteDepartment = async (id: number) => {
	const { data } = await api.delete(`/departments/delete/${id}`)
	return data
}
