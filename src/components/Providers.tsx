// Type Imports
import type { ChildrenType, Direction } from '@core/types'

// Context Imports
import { VerticalNavProvider } from '@menu/contexts/verticalNavContext'
import { SettingsProvider } from '@core/contexts/settingsContext'
import ThemeProvider from '@components/theme'
import { NextAuthProvider } from '@/contexts/nextAuthProvider'

// Util Imports
import { getMode, getSettingsFromCookie, getSystemMode } from '@core/server/actions'

type Props = ChildrenType & {
  direction: Direction
}

export default function Providers(props: Props) {
  // Props
  const { children, direction } = props

  // Vars
  const mode = getMode()
  const settingsCookie = getSettingsFromCookie()
  const systemMode = getSystemMode()

  return (
    <VerticalNavProvider>
      <NextAuthProvider>
        <SettingsProvider settingsCookie={settingsCookie} mode={mode}>
          <ThemeProvider direction={direction} systemMode={systemMode}>
            {children}
          </ThemeProvider>
        </SettingsProvider>
      </NextAuthProvider>
    </VerticalNavProvider>
  )
}
