import { useQuery } from '@tanstack/react-query'

import { getVendor } from '../api'

export const useVendorQuery = (id: number) => {
	const {
		data: vendor,
		isLoading: vendorIsLoading,
		isError: vendorIsError,
		error: vendorError
	} = useQuery({
		queryKey: ['vendor', id],
		queryFn: () => getVendor(id)
	})

	return {
		vendor,
		vendorIsLoading,
		vendorIsError,
		vendorError
	}
}
