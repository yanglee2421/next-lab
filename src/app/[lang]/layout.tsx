// Third-party Imports
import 'react-perfect-scrollbar/dist/css/styles.css'

// Style Imports
import '@/app/globals.css'

// Generated Icon CSS Imports
import '@assets/iconify-icons/generated-icons.css'

// React Imports
import React from 'react'

// Components Imports
import Providers from '@components/Providers'

// Util Imports
import { getMode, getSettingsFromCookie, getSystemMode } from '@core/server/actions'

export default function RootLayout(props: Props) {
  // ** Props
  const { children } = props

  const direction = 'ltr'

  return (
    <html id='__next' lang='en' dir={direction}>
      <body className='flex is-full min-bs-full flex-auto flex-col'>
        <Providers
          direction={direction}
          mode={getMode()}
          settingsCookie={getSettingsFromCookie()}
          systemMode={getSystemMode()}
        >
          {children}
        </Providers>
      </body>
    </html>
  )
}

export const metadata = {
  title: 'Master Next.js Framework Independent ',
  description: 'Master Next.js Framework Independent'
}

type Props = {
  children: React.ReactNode
  params: {
    lang: string
  }
}
