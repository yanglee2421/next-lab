'use client'

// React Imports
import React from 'react'

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
  const { children, direction, settingsCookie, mode, systemMode, lang } = props

  const { i18n } = useTranslation()

  React.useEffect(() => {
    i18n.changeLanguage(lang)
  }, [i18n, lang])

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
  lang: string
}
