import { zodResolver } from '@hookform/resolvers/zod'
import { startOfDay } from 'date-fns'
import { ChevronDownIcon } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
	Popover,
	PopoverContent,
	PopoverTrigger
} from '@/components/ui/popover'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select'
import { useDepartmentsQuery } from '@/features/departments/hooks'
import type { Department } from '@/features/departments/types'
import { useLocationsQuery } from '@/features/locations/hooks'
import type { Location } from '@/features/locations/types'
import { useUsersQuery } from '@/features/users/hooks'
import type { User } from '@/features/users/types'
import type { DynamicField } from '@/shared/types'
import { formatLocalDate } from '@/shared/utils/fromatLocalDate'

import { useAssetActions, useAssetFieldsQuery } from '../hooks'
import { generateSchema } from '../schemas'

export const AssetCreateForm = () => {
	const { id } = useParams()
	const { locations } = useLocationsQuery()
	const { departments } = useDepartmentsQuery()
	const navigate = useNavigate()
	const { users } = useUsersQuery()
	const { assetFields, assetFieldsIsLoading } = useAssetFieldsQuery(
		id as string
	)
	const { createAssetAction } = useAssetActions()
	const [open, setOpen] = useState('')
	const fields: DynamicField[] = assetFields?.data || []

	const schema = useMemo(() => {
		return generateSchema(fields)
	}, [fields])

	type FormValues = z.infer<typeof schema>

	const form = useForm<FormValues>({
		resolver: zodResolver(schema),

		defaultValues: {
			name: ''
		}
	})

	const onSubmit = async (values: FormValues) => {
		const payload = {
			...values,
			asset_type_id: Number(id)
		}

		createAssetAction.mutate(payload, {
			onError: data => {
				toast.error(data[0].message)
			},
			onSuccess: () => {
				form.reset()
				navigate('/adminstration/assets')
			}
		})
	}

	const renderField = (field: DynamicField) => {
		switch (field.field_type) {
			case 'text':
			case 'number':
				return (
					<FormField
						key={field.id}
						name={`specifications.${field.name}` as const}
						render={({ field: formField }) => (
							<FormItem>
								<FormLabel className='text-gray-lighter font-normal'>
									{field.label}
								</FormLabel>

								<FormControl>
									<Input
										type={field.field_type}
										className='bg-muted'
										placeholder={`Enter ${field.label}`}
										value={formField.value ?? ''}
										onChange={e => {
											if (field.field_type === 'number') {
												formField.onChange(
													e.target.value === ''
														? undefined
														: Number(e.target.value)
												)
											} else {
												formField.onChange(
													e.target.value
												)
											}
										}}
									/>
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>
				)

			case 'boolean':
				return (
					<FormField
						key={field.id}
						name={`specifications.${field.name}` as const}
						render={({ field: formField }) => (
							<FormItem>
								<FormLabel className='text-gray-lighter font-normal'>
									{field.label}
								</FormLabel>

								<FormControl>
									<RadioGroup
										value={
											formField.value === undefined
												? ''
												: String(formField.value)
										}
										onValueChange={value =>
											formField.onChange(value === 'true')
										}
										className='flex items-center gap-6'
									>
										<div className='flex items-center space-x-2'>
											<RadioGroupItem
												value='true'
												id={`${field.name}-true`}
											/>

											<Label
												htmlFor={`${field.name}-true`}
											>
												True
											</Label>
										</div>

										<div className='flex items-center space-x-2'>
											<RadioGroupItem
												value='false'
												id={`${field.name}-false`}
											/>

											<Label
												htmlFor={`${field.name}-false`}
											>
												False
											</Label>
										</div>
									</RadioGroup>
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>
				)

			default:
				return null
		}
	}

	if (assetFieldsIsLoading) {
		return (
			<div className='flex items-center justify-center py-10'>
				Loading fields...
			</div>
		)
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='w-full space-y-8'
			>
				<div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5'>
					<FormField
						name='name'
						render={({ field }) => (
							<FormItem>
								<FormLabel className='text-gray-lighter font-normal'>
									Name
								</FormLabel>

								<FormControl>
									<Input
										className='bg-muted'
										placeholder='Enter name'
										{...field}
									/>
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						name='serial_number'
						render={({ field }) => (
							<FormItem>
								<FormLabel className='text-gray-lighter font-normal'>
									Serial Number
								</FormLabel>

								<FormControl>
									<Input
										className='bg-muted'
										placeholder='Enter serial number'
										{...field}
									/>
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						name='model'
						render={({ field }) => (
							<FormItem>
								<FormLabel className='text-gray-lighter font-normal'>
									Model
								</FormLabel>

								<FormControl>
									<Input
										className='bg-muted'
										placeholder='Enter model'
										{...field}
									/>
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						name='series'
						render={({ field }) => (
							<FormItem>
								<FormLabel className='text-gray-lighter font-normal'>
									Series
								</FormLabel>

								<FormControl>
									<Input
										className='bg-muted'
										placeholder='Enter series'
										{...field}
									/>
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						name='hostname'
						render={({ field }) => (
							<FormItem>
								<FormLabel className='text-gray-lighter font-normal'>
									Hostname
								</FormLabel>

								<FormControl>
									<Input
										className='bg-muted'
										placeholder='Enter hostname'
										{...field}
									/>
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						name='ip_address'
						render={({ field }) => (
							<FormItem>
								<FormLabel className='text-gray-lighter font-normal'>
									IP Address
								</FormLabel>

								<FormControl>
									<Input
										className='bg-muted'
										placeholder='Enter ip address'
										{...field}
									/>
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						name='mac_address'
						render={({ field }) => (
							<FormItem>
								<FormLabel className='text-gray-lighter font-normal'>
									Mac Address
								</FormLabel>

								<FormControl>
									<Input
										className='bg-muted'
										placeholder='Enter mac address'
										{...field}
									/>
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						name='is_managable'
						render={({ field }) => (
							<FormItem>
								<FormLabel className='text-gray-lighter font-normal'>
									Managable
								</FormLabel>

								<FormControl>
									<Select
										value={field.value}
										onValueChange={field.onChange}
									>
										<SelectTrigger className='w-full bg-muted'>
											<SelectValue placeholder='Select status' />
										</SelectTrigger>

										<SelectContent>
											<SelectItem value='true'>
												True
											</SelectItem>

											<SelectItem value='false'>
												False
											</SelectItem>
										</SelectContent>
									</Select>
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						name='status'
						render={({ field }) => (
							<FormItem>
								<FormLabel className='text-gray-lighter font-normal'>
									Status
								</FormLabel>

								<FormControl>
									<Select
										value={field.value}
										onValueChange={field.onChange}
									>
										<SelectTrigger className='w-full bg-muted'>
											<SelectValue placeholder='Select status' />
										</SelectTrigger>

										<SelectContent>
											<SelectItem value='active'>
												Active
											</SelectItem>

											<SelectItem value='inactive'>
												Inactive
											</SelectItem>
										</SelectContent>
									</Select>
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						name='location_id'
						render={({ field }) => (
							<FormItem>
								<FormLabel className='text-gray-lighter font-normal'>
									Location
								</FormLabel>

								<FormControl>
									<Select
										value={
											field.value
												? String(field.value)
												: undefined
										}
										onValueChange={value =>
											field.onChange(Number(value))
										}
									>
										<SelectTrigger className='w-full bg-muted'>
											<SelectValue placeholder='Select location' />
										</SelectTrigger>

										<SelectContent>
											{locations?.data.map(
												(location: Location) => (
													<SelectItem
														key={location.id}
														value={String(
															location.id
														)}
													>
														{location.name}
													</SelectItem>
												)
											)}
										</SelectContent>
									</Select>
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						name='department_id'
						render={({ field }) => (
							<FormItem>
								<FormLabel className='text-gray-lighter font-normal'>
									Department
								</FormLabel>

								<FormControl>
									<Select
										value={
											field.value
												? String(field.value)
												: undefined
										}
										onValueChange={value =>
											field.onChange(Number(value))
										}
									>
										<SelectTrigger className='w-full bg-muted'>
											<SelectValue placeholder='Select department' />
										</SelectTrigger>

										<SelectContent>
											{departments?.data.map(
												(department: Department) => (
													<SelectItem
														key={department.id}
														value={String(
															department.id
														)}
													>
														{department.name}
													</SelectItem>
												)
											)}
										</SelectContent>
									</Select>
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						name='assigned_to_user_id'
						render={({ field }) => (
							<FormItem>
								<FormLabel className='text-gray-lighter font-normal'>
									User
								</FormLabel>

								<FormControl>
									<Select
										value={
											field.value
												? String(field.value)
												: undefined
										}
										onValueChange={value =>
											field.onChange(Number(value))
										}
									>
										<SelectTrigger className='w-full bg-muted'>
											<SelectValue placeholder='Select user' />
										</SelectTrigger>

										<SelectContent>
											{users?.data.map((user: User) => (
												<SelectItem
													key={user.id}
													value={String(user.id)}
												>
													{user.username}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						name='purchase_date'
						render={({ field }) => (
							<FormItem>
								<FormLabel className='text-gray-lighter font-normal'>
									Purchase Date
								</FormLabel>

								<FormControl>
									<Popover
										open={open === 'purchase_date'}
										onOpenChange={isOpen =>
											setOpen(
												isOpen ? 'purchase_date' : ''
											)
										}
									>
										<PopoverTrigger asChild>
											<Button
												type='button'
												variant='outline'
												className='justify-between bg-muted'
											>
												{field.value ? (
													field.value
												) : (
													<span className='text-muted-foreground'>
														Select date
													</span>
												)}

												<ChevronDownIcon />
											</Button>
										</PopoverTrigger>

										<PopoverContent
											className='w-auto p-0'
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
														field.onChange(
															formatLocalDate(
																date
															)
														)
													}

													setOpen('')
												}}
											/>
										</PopoverContent>
									</Popover>
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						name='purchase_price'
						render={({ field }) => (
							<FormItem>
								<FormLabel className='text-gray-lighter font-normal'>
									Purchase Price
								</FormLabel>

								<FormControl>
									<Input
										type='number'
										className='bg-muted'
										placeholder='Enter purchase price'
										value={field.value ?? ''}
										onChange={e =>
											field.onChange(
												e.target.value === ''
													? undefined
													: Number(e.target.value)
											)
										}
									/>
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						name='warranty_expiry'
						render={({ field }) => (
							<FormItem>
								<FormLabel className='text-gray-lighter font-normal'>
									Warranty Expiry
								</FormLabel>

								<FormControl>
									<Popover
										open={open === 'warranty_expiry'}
										onOpenChange={isOpen =>
											setOpen(
												isOpen ? 'warranty_expiry' : ''
											)
										}
									>
										<PopoverTrigger asChild>
											<Button
												type='button'
												variant='outline'
												className='justify-between bg-muted'
											>
												{field.value ? (
													field.value
												) : (
													<span className='text-muted-foreground'>
														Select date
													</span>
												)}

												<ChevronDownIcon />
											</Button>
										</PopoverTrigger>

										<PopoverContent
											className='w-auto p-0'
											align='start'
										>
											<Calendar
												mode='single'
												captionLayout='dropdown'
												onSelect={date => {
													if (date) {
														field.onChange(
															formatLocalDate(
																date
															)
														)
													}

													setOpen('')
												}}
											/>
										</PopoverContent>
									</Popover>
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						name='description'
						render={({ field }) => (
							<FormItem>
								<FormLabel className='text-gray-lighter font-normal'>
									Description
								</FormLabel>

								<FormControl>
									<Input
										className='bg-muted'
										placeholder='Enter description'
										{...field}
									/>
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						name='notes'
						render={({ field }) => (
							<FormItem>
								<FormLabel className='text-gray-lighter font-normal'>
									Notes
								</FormLabel>

								<FormControl>
									<Input
										className='bg-muted'
										placeholder='Enter notes'
										{...field}
									/>
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						name='asset_tag'
						render={({ field }) => (
							<FormItem>
								<FormLabel className='text-gray-lighter font-normal'>
									Asset Tag
								</FormLabel>

								<FormControl>
									<Input
										className='bg-muted'
										placeholder='Enter asset tag'
										{...field}
									/>
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>

					{/* Dynamic Fields */}
					{fields.map(renderField)}
				</div>

				<Button
					type='submit'
					disabled={assetFieldsIsLoading}
					className='w-full bg-navy-blue hover:bg-navy-blue text-blue-darker border border-blue-darker'
				>
					{assetFieldsIsLoading ? 'Creating...' : 'Create'}
				</Button>
			</form>
		</Form>
	)
}
