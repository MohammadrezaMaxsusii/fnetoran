import { useQuery } from '@tanstack/react-query'

import { getAssetFields } from '../api'

export const useAssetFieldsQuery = (id: string) => {
	const {
		data: assetFields,
		isLoading: assetFieldsIsLoading,
		isError: assetFieldsIsError,
		error: assetFieldsError
	} = useQuery({
		queryKey: ['asset-fields', id],
		queryFn: () => getAssetFields(id)
	})

	return {
		assetFields,
		assetFieldsIsLoading,
		assetFieldsIsError,
		assetFieldsError
	}
}
