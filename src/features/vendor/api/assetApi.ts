import { api } from '@/shared/libs/axiosInstance'

export const getVendor = async (id: number) => {
    const { data } = await api.get(`/asset-vendors/info/${id}`)
    return data
}