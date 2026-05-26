import { useQueryClient } from '@tanstack/react-query'
import { EllipsisIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuPortal,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { TableCell, TableRow } from '@/components/ui/table'

import { useBackupActions } from '@/features/backup/hooks'
import { useFileQuery } from '@/shared/hooks/useFileQuery'

import {
	useDeviceActions,
	useLoadAssetsQuery
} from '../hooks'

import { SelectZoneDialog } from './SelectZoneDialog'
import { useVendorQuery } from '@/features/vendor/hooks/useVendorQuery'

type DeviceRowProps = {
	device: any
}

export const DeviceRow = ({ device }: DeviceRowProps) => {
	const navigate = useNavigate()
	const queryClient = useQueryClient()

	const [deviceId, setDeviceId] = useState('')
	const [vendorImage, setVendorImage] = useState('')
	const [open, setOpen] = useState(false)

	const { deleteDeviceAction, registerForFirewallAction } =
		useDeviceActions()

	const { createBackupAction } = useBackupActions()

	const { assetsSuccess, assetsFetching } =
		useLoadAssetsQuery(deviceId)

	const { vendor } = useVendorQuery(device.id)

	console.log(vendor)

	const { file } = useFileQuery(vendor?.data?.logo_id)

	useEffect(() => {
		if (assetsSuccess) {
			queryClient.invalidateQueries({
				queryKey: ['devices']
			})
		}
	}, [assetsSuccess, queryClient])

	useEffect(() => {
		if (file) {
			const imgSrc = URL.createObjectURL(file)
			setVendorImage(imgSrc)

			return () => URL.revokeObjectURL(imgSrc)
		}
	}, [file])

	const handleRegisterForFirewall = async (id: number) => {
		try {
			await registerForFirewallAction.mutateAsync(id)

			toast.success('Device registered for firewall')
		} catch (error: any) {
			toast.error(error?.detail || 'Something went wrong')
		}
	}

	const handleBackup = (
		type: 'running' | 'startup'
	) => {
		createBackupAction.mutate(
			{
				device_id: device.id,
				backup_type: type
			},
			{
				onSuccess: () => {
					toast.success('Backup successfully')
				},
				onError: () => {
					toast.error('Backup failed.')
				}
			}
		)
	}

	return (
		<>
			<TableRow className='bg-gray-darker hover:bg-gray-darker odd:bg-gray-items odd:hover:bg-gray-items'>
				<TableCell className='px-5 py-2 rounded-l-lg text-center font-bold border-y border-s border-default'>
					{device.id}
				</TableCell>

				<TableCell className='px-4 py-2 border-y border-default'>
					<div className='flex items-center gap-4'>
						<div className='border-2 border-orange rounded-full size-8 bg-white overflow-hidden'>
							<img
								src={vendorImage}
								alt={
									vendor?.data?.name ||
									'vendor logo'
								}
								className='size-full rounded-full object-cover'
							/>
						</div>

						<div className='flex flex-col'>
							<span className='text-sm font-bold capitalize'>
								{vendor?.data?.name || '---'}
							</span>
						</div>
					</div>
				</TableCell>

				<TableCell className='px-4 py-2 text-center border-y border-default'>
					{device.model || '---'}
				</TableCell>

				<TableCell className='px-4 py-2 text-center border-y border-default'>
					{device.ip || '---'}
				</TableCell>

				<TableCell className='px-4 py-2 text-center border-y border-default'>
					{device.portCount ?? '---'}
				</TableCell>

				<TableCell className='px-4 py-2 text-center border-y border-default'>
					{device.hostname ?? '---'}
				</TableCell>

				<TableCell className='px-4 py-2 text-center border-y border-default'>
					{device.series ?? '---'}
				</TableCell>

				<TableCell className='px-4 py-2 text-center rounded-r-lg border-y border-e border-default'>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button
								variant='secondary'
								className='border border-foreground/25'
								size='icon'
							>
								<EllipsisIcon />
							</Button>
						</DropdownMenuTrigger>

						<DropdownMenuContent>
							<DropdownMenuItem
								onClick={() =>
									handleRegisterForFirewall(
										device.id
									)
								}
							>
								Register for firewall
							</DropdownMenuItem>

							<DropdownMenuItem
								onClick={() => setOpen(true)}
							>
								Add to zone
							</DropdownMenuItem>

							<DropdownMenuItem
								onClick={() =>
									navigate(
										`/devices/terminal/${device.id}`
									)
								}
							>
								Terminal
							</DropdownMenuItem>

							<DropdownMenuSub>
								<DropdownMenuSubTrigger>
									Backup
								</DropdownMenuSubTrigger>

								<DropdownMenuPortal>
									<DropdownMenuSubContent>
										<DropdownMenuItem
											onClick={() =>
												handleBackup(
													'running'
												)
											}
										>
											Running backup
										</DropdownMenuItem>

										<DropdownMenuItem
											onClick={() =>
												handleBackup(
													'startup'
												)
											}
										>
											Startup backup
										</DropdownMenuItem>
									</DropdownMenuSubContent>
								</DropdownMenuPortal>
							</DropdownMenuSub>

							<DropdownMenuItem
								onClick={() =>
									setDeviceId(device.id)
								}
								disabled={assetsFetching}
							>
								Automate sync
							</DropdownMenuItem>

							<DropdownMenuItem
								onClick={() =>
									deleteDeviceAction.mutate(
										device.id
									)
								}
								className='text-red-500 focus:text-red-500'
							>
								Delete
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</TableCell>
			</TableRow>

			<SelectZoneDialog
				open={open}
				setOpen={setOpen}
				deviceId={device.id}
			/>
		</>
	)
}
