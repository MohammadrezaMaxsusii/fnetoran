import { useQuery } from '@tanstack/react-query'

import { getAssetTypes } from '../api'

export const useAssetTypesQuery = (filters: Record<string, any> = {}) => {
	const {
		data: assetTypes,
		isLoading: assetTypesIsLoading,
		isError: assetTypesIsError,
		error: assetTypesError
	} = useQuery({
		queryKey: ['asset-types', filters],
		queryFn: () => getAssetTypes(filters)
	})

	return {
		assetTypes,
		assetTypesIsLoading,
		assetTypesIsError,
		assetTypesError
	}
}
