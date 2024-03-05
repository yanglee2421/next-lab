import 'react-perfect-scrollbar/dist/css/styles.css'
import '@/app/globals.css'
import '@assets/iconify-icons/generated-icons.css'
import React from 'react'

import Providers from '@components/Providers'
import { getMode, getSettingsFromCookie, getSystemMode } from '@core/server/actions'
import themeConfig from '@/configs/themeConfig'

export default function RootLayout(props: Props) {
  return (
    <html id='__next' lang='en'>
      <body className='flex is-full min-bs-full flex-auto flex-col'>
        <Providers mode={getMode()} settingsCookie={getSettingsFromCookie()} systemMode={getSystemMode()}>
          {props.children}
        </Providers>
      </body>
    </html>
  )
}

export const metadata = {
  title: 'WarpDriven AI - from eCommerce AI Copilot to eCommerce AI Agent',
  description: `${themeConfig.templateName} – eCommerce Full Chain Recommendations`,
  keywords:
    'WarpDriven AI, eCommerce Copilot, eCommerce Agent, Integlligent Recommendations, Integlligent Merchant, Integlligent Supplychain'
}

type Props = {
  children: React.ReactNode
  params: {
    lang: string
  }
}
