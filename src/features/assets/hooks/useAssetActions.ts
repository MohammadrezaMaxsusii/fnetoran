import { useMutation, useQueryClient } from '@tanstack/react-query'

import { createAsset, updateAsset, deleteAsset } from '../api'

export const useAssetActions = () => {
	const queryClient = useQueryClient()

	const onSuccess = () => {
		queryClient.invalidateQueries({
			queryKey: ['assets']
		})
	}

	const createAssetAction = useMutation({
		mutationFn: createAsset,
		onSuccess
	})

	const updateAssetAction = useMutation({
		mutationFn: updateAsset,
		onSuccess
	})

	const deleteAssetAction = useMutation({
		mutationFn: deleteAsset,
		onSuccess
	})

	return {
		createAssetAction,
		updateAssetAction,
		deleteAssetAction
	}
}
