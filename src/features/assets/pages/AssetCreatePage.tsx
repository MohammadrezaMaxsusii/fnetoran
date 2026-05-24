import { Link, Outlet, useLocation, useNavigate } from 'react-router'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import BackIcon from '@/shared/icons/back.svg?react'

import { useAssetTypesQuery } from '../hooks'

export const AssetCreatePage = () => {
	const navigate = useNavigate()
	const location = useLocation()
	const pathname = location.pathname
	const { assetTypes } = useAssetTypesQuery()

	return (
		<div className='pe-5 pb-5'>
			<section className='w-full bg-gray-darker rounded-2xl'>
				{/* Header of section */}
				<div className='flex items-center justify-between p-7'>
					<span className='text-lg font-bold text-primary'>
						New Asset
					</span>
					<Button
						variant='secondary'
						className='border border-default'
						onClick={() => navigate('/adminstration/assets')}
					>
						<BackIcon className='size-5' />
						Back to List
					</Button>
				</div>

				<div className='px-7'>
					<Separator className='bg-default' />
				</div>

				{/* content */}
				<div className='p-7 flex gap-12'>
					<div className='bg-background-default rounded-xl p-4.5 w-1/4 space-y-3'>
						{/* Sidebar of content */}
						{assetTypes?.data.map(
							({ id, name }: { id: number; name: string }) => {
								const isActive =
									`/adminstration/assets/create/${id}` ===
									pathname

								return (
									<Link
										key={id}
										to={`/adminstration/assets/create/${id}`}
										className={cn(
											'block px-4 py-2 border border-default rounded-lg',
											isActive && 'bg-orange text-black'
										)}
									>
										{name}
									</Link>
								)
							}
						)}
					</div>

					{/* Main content */}
					<Outlet />
				</div>
			</section>
		</div>
	)
}
