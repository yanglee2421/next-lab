// Third-party Imports
import 'react-perfect-scrollbar/dist/css/styles.css'

// Type Imports
import type { ChildrenType } from '@core/types'

// Style Imports
import '@/app/globals.css'
import '@assets/iconify-icons/generated-icons.css'

export default function RootLayout({ children }: ChildrenType) {
  // Vars
  const direction = 'ltr'

  return (
    <html id='__next' lang='en' dir={direction}>
      <body className='flex is-full min-bs-full flex-auto flex-col'>{children}</body>
    </html>
  )
}

export const metadata = {
  title: 'Master Next.js Framework Independent ',
  description: 'Master Next.js Framework Independent'
}
