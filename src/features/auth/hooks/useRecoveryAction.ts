import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router'

import { recovery } from '../api'
import type { Recovery } from '../types'

export const useRecoveryAction = () => {
	const navigate = useNavigate()

	const recoveryAction = useMutation({
		mutationFn: (input: Recovery) => recovery(input),
		onSuccess: () => {
			navigate('/success-login', { replace: true })
		}
	})

	return {
		recoveryAction
	}
}
