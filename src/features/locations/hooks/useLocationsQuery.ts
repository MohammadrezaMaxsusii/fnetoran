import { useQuery } from '@tanstack/react-query'

import { getLocations } from '../api'

export const useLocationsQuery = (filters: Record<string, any> = {}) => {
	const {
		data: locations,
		isLoading: locationsIsLoading,
		isError: locationsIsError,
		error: locationsError
	} = useQuery({
		queryKey: ['locations', filters],
		queryFn: () => getLocations(filters)
	})

	return {
		locations,
		locationsIsLoading,
		locationsIsError,
		locationsError
	}
}
