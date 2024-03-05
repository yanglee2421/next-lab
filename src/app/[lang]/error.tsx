'use client'

import { UnderMaintenance } from '@views/UnderMaintenance'
import BlankLayout from '@layouts/BlankLayout'
import { useSettings } from '@/@core/hooks/useSettings'

export default function Error() {
  const { settings } = useSettings()

  return (
    <BlankLayout
      systemMode={(() => {
        switch (settings.mode) {
          case 'dark':
          case 'light':
            return settings.mode
          default:
            return 'light'
        }
      })()}
    >
      <UnderMaintenance mode={settings.mode || 'system'} />
    </BlankLayout>
  )
}
