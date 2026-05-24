import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import BuildingIcon from '@/shared/icons/building.svg?react'

import { useDepartmentActions } from '../hooks'
import type { DepartmentTree } from '../types'

import { DepartmentCreate } from './DepartmentCreate'
import { DepartmentDetails } from './DepartmentDetails'
import { DepartmentUpdate } from './DepartmentUpdate'

interface Props {
	department: DepartmentTree
}

export const DepartmentNode = ({ department }: Props) => {
	const { deleteDepartmentAction } = useDepartmentActions()

	const handleDelete = () => {
		deleteDepartmentAction.mutate(department.id!, {
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
								<DepartmentCreate
									organizationId={department.organization_id}
									parentId={department.id}
								/>
							</DropdownMenuItem>

							<DropdownMenuItem asChild>
								<DepartmentUpdate department={department} />
							</DropdownMenuItem>

							<DropdownMenuItem
								className='inline-block size-full p-2 cursor-pointer text-base text-red-500 hover:text-white! hover:bg-red-500!'
								onClick={handleDelete}
							>
								Delete department
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>

					<span className='inline-block grow text-xs text-gray-lighter text-center pe-1.5 truncate'>
						{department.name}
					</span>

					{/* Details section */}
					<DepartmentDetails department={department} />
				</div>
			</div>
		</div>
	)
}
