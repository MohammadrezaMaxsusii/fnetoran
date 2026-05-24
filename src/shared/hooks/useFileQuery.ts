import { useQuery } from '@tanstack/react-query'

import { getFile } from '../api/fileApi'

export const useFileQuery = (id?: string | null) => {
	const {
		data: file,
		isLoading: fileIsLoading,
		isError: fileIsError
	} = useQuery({
		queryKey: ['file', id],
		queryFn: () => getFile(id!),
		enabled: !!id,
		retry: false
	})

	return {
		file,
		fileIsLoading,
		fileIsError
	}
}
