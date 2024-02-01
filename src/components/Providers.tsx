'use client'

// React Imports
import React from 'react'

// NextJs Imports
import { useParams } from 'next/navigation'

// I18n Imports
import '@/locales/i18n'
import { useTranslation } from 'react-i18next'

// Type Imports
import type { ChildrenType, Direction } from '@core/types'
import type { getMode, getSettingsFromCookie, getSystemMode } from '@core/server/actions'

// Context Imports
import { VerticalNavProvider } from '@menu/contexts/verticalNavContext'
import { SettingsProvider } from '@core/contexts/settingsContext'
import ThemeProvider from '@components/theme'

export default function Providers(props: Props) {
  // Props
  const { children, direction, settingsCookie, mode, systemMode } = props

  const { i18n } = useTranslation()
  const params = useParams()

  React.useEffect(() => {
    if (typeof params.lang === 'string') {
      i18n.changeLanguage(params.lang)
    }
  }, [i18n, params.lang])

  return (
    <VerticalNavProvider>
      <SettingsProvider settingsCookie={settingsCookie} mode={mode}>
        <ThemeProvider direction={direction} systemMode={systemMode}>
          {children}
        </ThemeProvider>
      </SettingsProvider>
    </VerticalNavProvider>
  )
}

type Props = ChildrenType & {
  direction: Direction
  mode: ReturnType<typeof getMode>
  settingsCookie: ReturnType<typeof getSettingsFromCookie>
  systemMode: ReturnType<typeof getSystemMode>
}
