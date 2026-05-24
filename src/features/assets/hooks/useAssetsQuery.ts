import { useQuery } from '@tanstack/react-query'

import { getAssets } from '../api'

export const useAssetsQuery = (filters: Record<string, any> = {}) => {
	const {
		data: assets,
		isLoading: assetsIsLoading,
		isError: assetsIsError,
		error: assetsError
	} = useQuery({
		queryKey: ['assets', filters],
		queryFn: () => getAssets(filters)
	})

	return {
		assets,
		assetsIsLoading,
		assetsIsError,
		assetsError
	}
}
