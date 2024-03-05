'use client'

import React from 'react'

import type { ChildrenType } from '@core/types'
import type { getMode, getSettingsFromCookie, getSystemMode } from '@core/server/actions'
import { VerticalNavProvider } from '@menu/contexts/verticalNavContext'
import { SettingsProvider } from '@core/contexts/settingsContext'
import ThemeProvider from '@components/theme'
import { QueryProvider } from '@components/providers/QueryProvider'
import AppReactToastify from '@/libs/styles/AppReactToastify'
import { AclProvider } from '@components/providers/AclProvider'
import { useThemeStore } from '@/hooks/store/useThemeStore'
import { PosthogProvider } from '@components/providers/PosthogProvider'

export default function Providers(props: Props) {
  const { children, settingsCookie, mode, systemMode } = props
  const direction = useThemeStore(store => store.direction)

  React.useEffect(() => {
    const prevDir = document.documentElement.dir

    document.documentElement.setAttribute('dir', direction)

    return () => {
      document.documentElement.setAttribute('dir', prevDir)
    }
  }, [direction])

  return (
    <VerticalNavProvider>
      <SettingsProvider settingsCookie={settingsCookie} mode={mode}>
        <ThemeProvider direction={direction} systemMode={systemMode}>
          <AppReactToastify></AppReactToastify>
          <QueryProvider>
            <AclProvider>
              <PosthogProvider>{children}</PosthogProvider>
            </AclProvider>
          </QueryProvider>
        </ThemeProvider>
      </SettingsProvider>
    </VerticalNavProvider>
  )
}

type Props = ChildrenType & {
  mode: ReturnType<typeof getMode>
  settingsCookie: ReturnType<typeof getSettingsFromCookie>
  systemMode: ReturnType<typeof getSystemMode>
}
