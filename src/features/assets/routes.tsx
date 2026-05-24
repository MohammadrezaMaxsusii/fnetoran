import { Route } from 'react-router'

import { AssetCreateForm } from './components'
import { AssetCreatePage, AssetsPage } from './pages'

export const AssetsRoutes = (
	<Route path='adminstration/assets'>
		<Route index element={<AssetsPage />} />
		<Route path='create/:id' element={<AssetCreatePage />}>
			<Route index element={<AssetCreateForm />} />
		</Route>
	</Route>
)
