import { useQuery } from '@tanstack/react-query'

import { getOrganization } from '../api'

export const useOrganizationQuery = (id: number) => {
	const {
		data: organization,
		isLoading: organizationIsLoading,
		isError: organizationIsError,
		error: organizationError
	} = useQuery({
		queryKey: ['organization', id],
		queryFn: () => getOrganization(id)
	})

	return {
		organization,
		organizationIsLoading,
		organizationIsError,
		organizationError
	}
}
