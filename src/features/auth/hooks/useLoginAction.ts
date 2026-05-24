import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router'

import { login } from '../api'
import type { Login } from '../types'

export const useLoginAction = () => {
	const navigate = useNavigate()

	const loginAction = useMutation({
		mutationFn: (input: Login) => login(input),
		onSuccess: () => {
			navigate('/dashboard', { replace: true })
		}
	})

	return {
		loginAction
	}
}
