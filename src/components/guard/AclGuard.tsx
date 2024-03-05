'use client'

import React from 'react'

import { useAcl } from '@/hooks/useAcl'
import { NotAuthorized } from '@views/NotAuthorized'
import { useSettings } from '@core/hooks/useSettings'

export function AclGuard(props: Props) {
  const acl = useAcl()
  const { settings } = useSettings()

  if (acl.can(props.action, props.subject)) {
    return props.children
  }

  return <NotAuthorized mode={settings.mode || 'system'}></NotAuthorized>
}

type Props = {
  action: string
  subject: string
  children: React.ReactNode
}
