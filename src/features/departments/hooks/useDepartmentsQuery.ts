import { useQuery } from '@tanstack/react-query'

import { getDepartments } from '../api'

export const useDepartmentsQuery = (filters: Record<string, any> = {}) => {
	const {
		data: departments,
		isLoading: departmentsIsLoading,
		isError: departmentsIsError,
		error: departmentsError
	} = useQuery({
		queryKey: ['departments', filters],
		queryFn: () => getDepartments(filters)
	})

	return {
		departments,
		departmentsIsLoading,
		departmentsIsError,
		departmentsError
	}
}
