import { Route } from 'react-router'

import { AuthLayout, SuccessLogin, UserInfoForm } from './components'
import { LoginPage, RecoveryPage } from './pages'

export const AuthRoutes = (
	<>
		<Route path='login' element={<LoginPage />} />

		<Route element={<AuthLayout />}>
			<Route path='forgot-password' element={<UserInfoForm />} />
			<Route path='change-password' element={<RecoveryPage />} />
			<Route path='success-login' element={<SuccessLogin />} />
		</Route>
	</>
)
