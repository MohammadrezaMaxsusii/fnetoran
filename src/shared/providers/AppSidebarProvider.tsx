import type { ReactNode } from 'react'

import { AppSidebar } from '@/components/AppSidebar'
import { SidebarProvider } from '@/components/ui/sidebar'

export const AppSidebarProvider = ({ children }: { children: ReactNode }) => {
	return (
		<SidebarProvider className='h-full'>
			<AppSidebar />

			{children}
		</SidebarProvider>
	)
}
