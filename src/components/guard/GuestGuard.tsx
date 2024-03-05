'use client'

import React from 'react'

import { useRouter } from 'next/navigation'

import { useAuth } from '@/hooks/useAuth'
import { ScreenLoading } from '@components/ui/ScreenLoading'

export function GuestGuard(props: React.PropsWithChildren) {
  const auth = useAuth()
  const router = useRouter()

  React.useEffect(() => {
    if (auth) {
      router.replace(
        (() => {
          const url = new URL(window.location.href)

          url.pathname = url.searchParams.get('redirect_url') || '/'
          url.searchParams.delete('redirect_url')

          return url.href
        })()
      )
    }
  }, [auth, router])

  if (auth) {
    return <ScreenLoading></ScreenLoading>
  }

  return props.children
}
