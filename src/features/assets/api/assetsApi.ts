import { api } from '@/shared/libs/axiosInstance'

export const getAssets = async (params: Record<string, any>) => {
	const { data } = await api.get('/assets/list', { params })
	return data
}
