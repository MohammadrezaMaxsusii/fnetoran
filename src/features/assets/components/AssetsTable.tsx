import { startOfDay } from 'date-fns'
import { ChevronDownIcon, FunnelX } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router'
import { toast } from 'sonner'

import { DeleteModal } from '@/components/DeleteModal'
// import AssetsIcon from "@/shared/icons/assets.svg?react";
// import ViewIcon from "@/shared/icons/view.svg?react";
import { TablePagination } from '@/components/TablePagination'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
	Empty,
	EmptyContent,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle
} from '@/components/ui/empty'
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/components/ui/form'
// import { DeleteModal } from "@/components/DeleteModal";
import { Input } from '@/components/ui/input'
import {
	Popover,
	PopoverContent,
	PopoverTrigger
} from '@/components/ui/popover'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from '@/components/ui/table'
import AddIcon from '@/shared/icons/plus.svg?react'
import { formatLocalDate } from '@/shared/utils/fromatLocalDate'

import { assetTableItems } from '../constants'
// import { AssetCreate } from "./AssetCreate";
// import { AssetUpdate } from "./AssetUpdate";
// import { toast } from "sonner";
import {
	useAssetActions,
	useAssetsFilters,
	useAssetsQuery,
	useAssetTypesQuery
} from '../hooks'
import type { Asset, AssetType } from '../types'

import { AssetDetails } from './AssetDetails'

type FilterFormValues = {
	createdAt?: string
	search?: string
	is_active?: string
	list_sort?: string
	list_page?: number
	asset_type_id?: string
}

export const AssetsTable = () => {
	const { id } = useParams()
	const { filters, updateFilters } = useAssetsFilters()
	const navigate = useNavigate()
	const { assetTypes } = useAssetTypesQuery()
	const { assets, assetsIsLoading } = useAssetsQuery(filters)
	const { deleteAssetAction } = useAssetActions()
	const [open, setOpen] = useState(false)
	const form = useForm<FilterFormValues>({
		defaultValues: {
			createdAt: filters.createdAt,
			search: filters.search,
			is_active: filters.is_active,
			list_sort: filters.list_sort,
			list_page: filters.list_page
		}
	})

	form.watch(values => {
		updateFilters(values)
	})

	console.log(assets)

	return (
		<section className='w-full bg-gray-darker rounded-2xl'>
			{/* Header of table */}
			<div className='flex items-center justify-between p-7'>
				<span className='text-lg font-bold text-primary'>
					Assets List
				</span>
				<Button
					onClick={() => navigate(`/adminstration/assets/create/10`)}
				>
					<AddIcon className='text-foreground' />
					Add asset
				</Button>
			</div>

			<div className='px-7'>
				<Separator className='bg-default' />
			</div>

			{/* Filter section */}
			<div className='p-7 flex items-center justify-between'>
				<Form {...form}>
					<form className='flex justify-between items-center w-full'>
						<FormField
							control={form.control}
							name='search'
							render={({ field }) => (
								<FormItem className='flex items-center'>
									<FormLabel
										htmlFor='search'
										className='text-gray-lighter font-normal'
									>
										Search:
									</FormLabel>
									<FormControl>
										<Input
											className='bg-muted'
											placeholder='Search...'
											value={field.value}
											onChange={field.onChange}
										/>
									</FormControl>
									<FormDescription />
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name='asset_type_id'
							render={({ field }) => (
								<FormItem className='flex items-center'>
									<FormLabel
										htmlFor='asset_type_id'
										className='text-gray-lighter font-normal'
									>
										Asset type:
									</FormLabel>
									<FormControl>
										<Select
											value={field.value}
											onValueChange={field.onChange}
										>
											<SelectTrigger
												id='asset_type_id'
												className="w-45 bg-muted border-default opacity-100! [&_svg:not([class*='text-'])]:text-foreground [&_svg:not([class*='text-'])]:opacity-100"
											>
												<SelectValue placeholder='Select asset type' />
											</SelectTrigger>
											<SelectContent>
												{assetTypes?.data.map(
													(assetType: AssetType) => (
														<SelectItem
															key={assetType.id}
															value={String(
																assetType.id
															)}
															className="hover:bg-primary! hover:text-foreground! [&_svg:not([class*='text-'])]:text-forground"
														>
															{assetType.name}
														</SelectItem>
													)
												)}
											</SelectContent>
										</Select>
									</FormControl>
									<FormDescription />
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name='createdAt'
							render={({ field }) => (
								<FormItem className='flex items-center'>
									<FormLabel
										htmlFor='createdAt'
										className='text-gray-lighter font-normal'
									>
										Date:
									</FormLabel>
									<FormControl>
										<Popover
											open={open}
											onOpenChange={setOpen}
										>
											<PopoverTrigger asChild>
												<Button
													id='date'
													className='bg-muted hover:bg-muted/75 border border-default w-48 justify-between font-normal'
												>
													{field.value ? (
														<span>
															{field.value}
														</span>
													) : (
														<span className='text-muted-foreground'>
															Select date
														</span>
													)}
													<ChevronDownIcon />
												</Button>
											</PopoverTrigger>
											<PopoverContent
												className='w-auto overflow-hidden p-0'
												align='start'
											>
												<Calendar
													mode='single'
													captionLayout='dropdown'
													disabled={date =>
														date >
														startOfDay(new Date())
													}
													onSelect={date => {
														if (date) {
															const formatedDate =
																formatLocalDate(
																	date
																)
															field.onChange(
																formatedDate
															)
														}
														setOpen(false)
													}}
													classNames={{
														day_button:
															'hover:bg-primary hover:text-white'
													}}
												/>
											</PopoverContent>
										</Popover>
									</FormControl>
									<FormDescription />
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name='list_sort'
							render={({ field }) => (
								<FormItem className='flex items-center'>
									<FormLabel
										htmlFor='list_sort'
										className='text-gray-lighter font-normal'
									>
										Sort By:
									</FormLabel>
									<FormControl>
										<Select
											value={field.value}
											onValueChange={field.onChange}
										>
											<SelectTrigger
												id='sort'
												className="w-45 bg-muted border-default opacity-100! [&_svg:not([class*='text-'])]:text-foreground [&_svg:not([class*='text-'])]:opacity-100"
											>
												<SelectValue placeholder='Select sort' />
											</SelectTrigger>
											<SelectContent>
												<SelectItem
													value='asc'
													className="hover:bg-primary! hover:text-foreground! [&_svg:not([class*='text-'])]:text-forground"
												>
													Asecending
												</SelectItem>
												<SelectItem
													value='desc'
													className="hover:bg-primary! hover:text-foreground! [&_svg:not([class*='text-'])]:text-forground"
												>
													Descending
												</SelectItem>
											</SelectContent>
										</Select>
									</FormControl>
									<FormDescription />
									<FormMessage />
								</FormItem>
							)}
						/>

						<Button
							type='button'
							variant='secondary'
							size='icon'
							className='border border-red bg-red-darker hover:bg-red-darker'
							onClick={() => form.reset()}
						>
							<FunnelX className='text-red' />
						</Button>
					</form>
				</Form>
			</div>

			{/* Asset table */}
			{assetsIsLoading ? (
				<section className='w-full bg-gray-darker rounded-2xl'>
					<Table>
						<TableBody className='flex flex-col gap-1 px-7 pb-7'>
							{Array.from({ length: 8 }).map((_, index) => (
								<TableRow
									key={index}
									className='bg-gray-darker hover:bg-gray-darker odd:bg-gray-items odd:hover:bg-gray-items rounded-lg border border-default last:border!'
								>
									<TableCell className='block rounded-lg overflow-hidden px-8'>
										<div className='flex justify-between items-center space-x-4'>
											<Skeleton className='size-8 rounded-full' />
											<div className='space-y-2'>
												<Skeleton className='h-4 w-62.5' />
												<Skeleton className='h-3 w-50' />
											</div>
											<Skeleton className='h-4 w-25' />
											<Skeleton className='h-4 w-11' />
											<Skeleton className='h-4 w-14' />
											<div className='flex items-center gap-2'>
												<Skeleton className='w-32.5 h-8' />
												<Skeleton className='size-8' />
												<Skeleton className='size-8' />
											</div>
										</div>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</section>
			) : assets?.data.length === 0 ? (
				<section className='w-full bg-gray-darker rounded-2xl space-y-2'>
					{/* Empty section */}
					<Empty className='pt-3! pb-7! gap-2'>
						<EmptyHeader>
							<EmptyMedia variant='icon'>
								{/* <AssetsIcon className="size-5" /> */}
							</EmptyMedia>
							<EmptyTitle>Assets List Empty!</EmptyTitle>
						</EmptyHeader>
						<EmptyContent className='text-sm text-muted-foreground'>
							Assets will appear here once they are added.
						</EmptyContent>
					</Empty>
				</section>
			) : (
				<div className='px-7 pb-7'>
					<Table className='border-separate border-spacing-y-1'>
						{/* Table header */}
						<TableHeader>
							<TableRow className='hover:bg-secondary'>
								{assetTableItems.map(
									(assetTableItem: string) => (
										<TableHead
											key={assetTableItem}
											className='text-center text-sm text-gray-lighter'
										>
											{assetTableItem}
										</TableHead>
									)
								)}
							</TableRow>
						</TableHeader>

						{/* Table body */}
						<TableBody>
							{assets?.data.map((asset: Asset) => (
								<TableRow
									key={asset.id}
									className='bg-gray-darker hover:bg-gray-darker odd:bg-gray-items odd:hover:bg-gray-items'
								>
									{/* Asset id */}
									<TableCell className='px-5 py-2 rounded-l-lg text-center font-bold border-y border-s border-default'>
										{asset.id}
									</TableCell>

									{/* Asset name */}
									<TableCell className='px-4 py-2 text-center border-y border-default'>
										{asset.name}
									</TableCell>

									{/* Asset model */}
									<TableCell className='px-4 py-2 text-center border-y border-default'>
										{asset.model || '---'}
									</TableCell>

									{/* Asset series */}
									<TableCell className='px-4 py-2 text-center border-y border-default'>
										{asset.series || '---'}
									</TableCell>

									{/* Asset serial number */}
									<TableCell className='px-4 py-2 text-center border-y border-default'>
										{asset.serial_number || '---'}
									</TableCell>

									{/* Asset purchase date */}
									<TableCell className='px-4 py-2 text-center border-y border-default'>
										{asset.purchase_date ? (
											<span>{asset.purchase_date}</span>
										) : (
											<span>---</span>
										)}
									</TableCell>

									{/* Asset ip address */}
									<TableCell className='px-4 py-2 text-center border-y border-default'>
										{asset.ip_address || '---'}
									</TableCell>

									{/* Asset status */}
									<TableCell className='px-4 py-2 text-start border-y border-default'>
										{asset.is_active ? (
											<div className='flex items-center justify-center gap-1'>
												<div className='w-3 h-3 bg-green rounded-full' />
												<span>Active</span>
											</div>
										) : (
											<div className='flex items-center justify-center gap-1'>
												<div className='w-3 h-3 bg-red rounded-full' />
												<span>Inactive</span>
											</div>
										)}
									</TableCell>

									{/* Operation section */}
									<TableCell className='w-1/11 px-4 py-2 text-center rounded-r-lg space-x-1.5 border-y border-e border-default'>
										{/* Edit asset */}
										{/* <AssetUpdate asset={asset} /> */}

										{/* Delete asset */}
										<DeleteModal
											title='Asset'
											isLoading={
												deleteAssetAction.isPending
											}
											onClick={() =>
												deleteAssetAction.mutate(
													asset.id,
													{
														onSuccess: data => {
															toast.success(
																data.message
															)
														},
														onError: error => {
															if (
																error instanceof
																Array
															)
																toast.error(
																	error[0]
																		.message
																)
														}
													}
												)
											}
										/>

										{/* View asset */}
										<AssetDetails asset={asset} />
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>
			)}

			{/* Pagination section */}
			<TablePagination
				count={assets?.count}
				currentPage={filters.list_page}
				updateFilters={updateFilters}
			/>
		</section>
	)
}
