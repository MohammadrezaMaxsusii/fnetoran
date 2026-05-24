import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router'

export const useAssetsFilters = () => {
	const [searchParams, setSearchParams] = useSearchParams()
	const [filters, setFilters] = useState({
		createdAt: searchParams.get('createdAt') || '',
		search: searchParams.get('search') || '',
		is_active: searchParams.get('is_active') || '',
		list_sort: searchParams.get('list_sort') || '',
		asset_type_id: searchParams.get('asset_type_id') || '',
		list_page: Number(searchParams.get('list_page')) || 1
	})

	const {
		createdAt,
		search,
		is_active,
		list_sort,
		asset_type_id,
		list_page
	} = filters

	useEffect(() => {
		const params: Record<string, any> = {}

		if (createdAt) params.createdAt = createdAt
		if (search) params.search = search
		if (is_active) params.is_active = is_active
		if (list_sort) params.list_sort = list_sort
		if (asset_type_id) params.asset_type_id = asset_type_id
		if (list_page) params.list_page = list_page

		setSearchParams(params, { replace: true })
	}, [createdAt, search, is_active, list_sort, asset_type_id, list_page])

	const updateFilters = (next: Partial<typeof filters>) => {
		setFilters(prev => ({
			...prev,
			...next
		}))
	}

	return {
		filters,
		updateFilters
	}
}
