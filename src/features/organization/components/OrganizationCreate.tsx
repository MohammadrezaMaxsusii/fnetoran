import { zodResolver } from '@hookform/resolvers/zod'
import { AlertCircleIcon } from 'lucide-react'
import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '@/components/ui/dialog'
import { FieldError } from '@/components/ui/field'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import { useFileActions } from '@/shared/hooks/useFileActions'
import OrganizationsIcon from '@/shared/icons/organizations.svg?react'
import AddIcon from '@/shared/icons/plus.svg?react'

import { useOrganizationActions } from '../hooks/useOrganizationActions'
import { organizationFormSchema } from '../schemas'

export const OrganizationCreate = () => {
	const [openModal, setOpenModal] = useState(false)
	const [errors, setErros] = useState<{ message: string }[]>()
	const [errorUpload, setErrorUpload] = useState(false)
	const [file, setFile] = useState('')
	const { uploadFileAction } = useFileActions()
	const { createOrganizationAction } = useOrganizationActions()
	const form = useForm({
		resolver: zodResolver(organizationFormSchema),
		defaultValues: {
			name: ''
		}
	})

	const onDrop = useCallback(
		(acceptedFiles: File[], fileRejection: any[]) => {
			if (fileRejection.length > 0) {
				setErrorUpload(true)
				setFile('')
				return
			}
			const file = acceptedFiles[0]

			if (file) {
				setFile(URL.createObjectURL(file))
				setErrorUpload(false)

				const formData = new FormData()
				formData.append('file', acceptedFiles[0])

				uploadFileAction.mutate(formData, {
					onSuccess: data => {
						toast.success('File upload successfully.')
						form.setValue('logo', String(data?.data.id))
					},
					onError: () => {
						toast.error('File upload faild.')
					}
				})
			}
		},
		[]
	)

	const { getRootProps, getInputProps } = useDropzone({
		accept: {
			'image/jpeg': [],
			'image/png': [],
			'image/jpg': []
		},
		maxSize: 200 * 1024,
		multiple: false,
		onDrop
	})

	const submitHandler = async (
		input: z.infer<typeof organizationFormSchema>
	) => {
		try {
			const result = await createOrganizationAction.mutateAsync(input)
			toast.success(result.message)
			form.reset()
			setOpenModal(false)
			setErros(undefined)
		} catch (error) {
			if (error instanceof Array) setErros(error)
		}
	}

	return (
		<Dialog open={openModal} onOpenChange={setOpenModal}>
			<DialogTrigger asChild>
				<Button>
					<AddIcon className='text-foreground' />
					Add Organization
				</Button>
			</DialogTrigger>

			<DialogContent className='bg-background-default text-white p-8 max-h-11/12 overflow-y-auto max-w-115! **:last:data-[slot=dialog-close]:top-9 **:last:data-[slot=dialog-close]:end-8'>
				{/* Dialog header */}
				<DialogHeader className='gap-4'>
					<DialogTitle className='text-lg font-bold'>
						Add organization
					</DialogTitle>
					<DialogDescription className='hidden'>
						Add another organization
					</DialogDescription>
					{errors && (
						<Alert variant='destructive'>
							<AlertCircleIcon />
							<AlertTitle>Something went wrong!</AlertTitle>
							<AlertDescription>
								<FieldError errors={errors} />
							</AlertDescription>
						</Alert>
					)}
				</DialogHeader>

				<Form {...form}>
					<form
						className='flex flex-col gap-8 py-4 w-full'
						onSubmit={form.handleSubmit(submitHandler)}
					>
						<div className='flex items-center gap-4'>
							<div
								{...getRootProps()}
								className='relative shrink-0 size-22 rounded-full border-2 border-dashed border-blue-lighter cursor-pointer'
							>
								<FormField
									name='logo_url'
									render={() => (
										<FormItem>
											<FormControl autoFocus>
												<Input {...getInputProps()} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								{file ? (
									<img
										src={file}
										alt='logo image'
										className='size-full rounded-full p-1 absolute inset-0'
									/>
								) : (
									<OrganizationsIcon className='size-1/2 absolute top-1/2 start-1/2 -translate-x-1/2 -translate-y-1/2' />
								)}

								<img
									src='/icons/bluePlus.svg'
									alt='plus icon'
									className='size-6 absolute bottom-2.5 end-1 translate-y-1/2'
								/>
							</div>
							<div>
								<span className='font-bold text-sm'>
									Add Organization Logo
								</span>
								<p
									className={cn(
										'text-xs text-gray-light',
										errorUpload && 'text-red'
									)}
								>
									Use a square aspect ratio and JPEG, PNG, or
									JPG format. The minimum image dimensions are
									100 x 100 pixels and the maximum image
									dimensions are 500 x 500 pixels. The image
									size should not exceed 200 KB.
								</p>
							</div>
						</div>

						<FormField
							name='name'
							render={({ field }) => (
								<FormItem>
									<FormLabel
										htmlFor='name'
										className='text-gray-lighter font-normal ps-0.5'
									>
										Name:
									</FormLabel>
									<FormControl>
										<Input
											className='bg-muted'
											placeholder='Enter your name'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							name='code'
							render={({ field }) => (
								<FormItem>
									<FormLabel
										htmlFor='code'
										className='text-gray-lighter font-normal ps-0.5'
									>
										Code:
									</FormLabel>
									<FormControl>
										<Input
											className='bg-muted'
											placeholder='Enter your code'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							name='national_id'
							render={({ field }) => (
								<FormItem>
									<FormLabel
										htmlFor='national_id'
										className='text-gray-lighter font-normal ps-0.5'
									>
										National Id:
									</FormLabel>
									<FormControl>
										<Input
											className='bg-muted'
											placeholder='Enter your national id'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							name='phone'
							render={({ field }) => (
								<FormItem>
									<FormLabel
										htmlFor='phone'
										className='text-gray-lighter font-normal ps-0.5'
									>
										Phone:
									</FormLabel>
									<FormControl>
										<Input
											className='bg-muted'
											placeholder='Enter your phone'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							name='email'
							render={({ field }) => (
								<FormItem>
									<FormLabel
										htmlFor='email'
										className='text-gray-lighter font-normal ps-0.5'
									>
										Email:
									</FormLabel>
									<FormControl>
										<Input
											className='bg-muted'
											placeholder='Enter your email'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							name='address'
							render={({ field }) => (
								<FormItem>
									<FormLabel
										htmlFor='address'
										className='text-gray-lighter font-normal ps-0.5'
									>
										Address:
									</FormLabel>
									<FormControl>
										<Textarea
											placeholder='Enter your address'
											className='bg-muted'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							name='website'
							render={({ field }) => (
								<FormItem>
									<FormLabel
										htmlFor='website'
										className='text-gray-lighter font-normal ps-0.5'
									>
										Website:
									</FormLabel>
									<FormControl>
										<Input
											className='bg-muted'
											placeholder='Enter your website'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						{/* Dialog footer */}
						<DialogFooter className='grid grid-cols-2 gap-3'>
							<Button
								type='submit'
								className='bg-navy-blue hover:bg-navy-blue text-blue-darker border border-blue-darker'
							>
								Create
							</Button>
							<DialogClose asChild>
								<Button variant='secondary'>Close</Button>
							</DialogClose>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	)
}
