import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router'

export const useLocationsFilters = () => {
	const [searchParams, setSearchParams] = useSearchParams()
	const [filters, setFilters] = useState({
		location_type: searchParams.get('location_type') || '',
		search: searchParams.get('search') || '',
		is_active: searchParams.get('is_active') || '',
		list_sort: searchParams.get('list_sort') || '',
		list_page: Number(searchParams.get('list_page')) || 1
	})

	const { location_type, search, is_active, list_sort, list_page } = filters

	useEffect(() => {
		const params: Record<string, any> = {}

		if (location_type) params.location_type = location_type
		if (search) params.search = search
		if (is_active) params.is_active = is_active
		if (list_sort) params.list_sort = list_sort
		if (list_page) params.list_page = list_page

		setSearchParams(params, { replace: true })
	}, [location_type, search, is_active, list_sort, list_page])

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
