import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import BuildingIcon from '@/shared/icons/building.svg?react'

import { useLocationActions } from '../hooks'
import type { LocationTree } from '../types'

import { LocationCreate } from './LocationCreate'
import { LocationDetails } from './LocationDetails'
import { LocationUpdate } from './LocationUpdate'

interface Props {
	location: LocationTree
}

export const LocationNode = ({ location }: Props) => {
	const { deleteLocationAction } = useLocationActions()

	const handleDelete = () => {
		deleteLocationAction.mutate(location.id!, {
			onSuccess: data => {
				toast.success(data.message)
			},
			onError: (error: any) => {
				toast.error(error?.message)
			}
		})
	}

	return (
		<div className="relative size-40 mx-auto rounded-2xl bg-linear-to-b from-[#1C1C1C] via-[#CDCDCD] to-[#202020] overflow-hidden grid place-content-center after:content-[''] after:size-10 after:bg-white after:rounded-full after:absolute after:-top-10 after:inset-s-1/2 after:-translate-x-1/2 after:blur-[22px]">
			<div className='size-39 rounded-2xl bg-gray-darker p-3 grid place-content-center'>
				{/* Icon section */}
				<div className='rounded-full bg-linear-to-b p-8 from-[#171717] to-gray-items relative z-10'>
					<BuildingIcon className='size-14' />
				</div>

				{/* Footer section */}
				<div className='flex items-center w-11/12 rounded-full px-1.5 py-2 bg-background-default absolute bottom-1 inset-s-1/2 -translate-x-1/2 z-20'>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button
								className='rounded-full size-6 absolute inset-s-1 p-0'
								size='icon'
								variant='secondary'
							>
								⋮
							</Button>
						</DropdownMenuTrigger>

						<DropdownMenuContent align='end' className='max-w-50'>
							<DropdownMenuItem asChild>
								<LocationCreate parentId={location.id} />
							</DropdownMenuItem>

							<DropdownMenuItem asChild>
								<LocationUpdate location={location} />
							</DropdownMenuItem>

							<DropdownMenuItem
								className='inline-block size-full p-2 cursor-pointer text-base text-red-500 hover:text-white! hover:bg-red-500!'
								onClick={handleDelete}
							>
								Delete location
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>

					<span className='inline-block grow text-xs text-gray-lighter text-center pe-1.5 truncate'>
						{location.name}
					</span>

					{/* Details section */}
					<LocationDetails location={location} />
				</div>
			</div>
		</div>
	)
}
