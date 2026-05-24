import { ErrorBoundary, getErrorMessage } from 'react-error-boundary'
import { Navigate, Route, Routes, useLocation } from 'react-router'

import { AppLayout } from './components/AppLayout'
import { Error } from './components/Error'
import { AssetsRoutes } from './features/assets/routes'
import { AuthRoutes } from './features/auth/routes'
import { AutoDiscoveryRoutes } from './features/autoDiscovery/routes'
import { BackupsRoutes } from './features/backup/routes'
import { DashboardRoutes } from './features/dashboard/routes'
import { DepartmentsRoutes } from './features/departments/routes'
import { DevicesRoutes } from './features/devices/routes'
import { DevicesScanRoutes } from './features/devicesScan/routes'
import { FirewallRoutes } from './features/firewall/routes'
import { IpManagementRoutes } from './features/ipManagement/routes'
import { LocationsRoutes } from './features/locations/routes'
import { NotFoundRoutes } from './features/notFound/routes'
import { OrganizationsRoutes } from './features/organization/routes'
import { PermissionRoutes } from './features/permission/routes'
import { RolesRoutes } from './features/roles/routes'
import { TerminalRoutes } from './features/terminal/routes'
import { UsersRoutes } from './features/users/routes'
import { ZonesRoutes } from './features/zones/routes'

// UI is not responsive and currently only designed for large screen sizes; adjustments for smaller screens depend on future enhancements.

export const App = () => {
	const location = useLocation()

	return (
		<main className='h-full bg-background-default text-white'>
			<ErrorBoundary
				resetKeys={[location.key]}
				fallbackRender={({ error }) => (
					<Error error={getErrorMessage(error)} />
				)}
			>
				<Routes>
					<Route index element={<Navigate to='/login' />} />

					{AuthRoutes}
					{NotFoundRoutes}

					<Route element={<AppLayout />}>
						{DashboardRoutes}
						{UsersRoutes}
						{RolesRoutes}
						{PermissionRoutes}
						{DevicesRoutes}
						{FirewallRoutes}
						{ZonesRoutes}
						{IpManagementRoutes}
						{DevicesScanRoutes}
						{TerminalRoutes}
						{BackupsRoutes}
						{AutoDiscoveryRoutes}
						{OrganizationsRoutes}
						{AssetsRoutes}
						{LocationsRoutes}
						{DepartmentsRoutes}
					</Route>
				</Routes>
			</ErrorBoundary>
		</main>
	)
}
