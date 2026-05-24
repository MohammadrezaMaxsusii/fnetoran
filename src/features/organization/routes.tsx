import { Route } from 'react-router'

import { OrganizationsPage } from './pages'

export const OrganizationsRoutes = (
	<Route path='adminstration/organization'>
		<Route index element={<OrganizationsPage />} />
	</Route>
)
