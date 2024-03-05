'use client'

import React from 'react'

import { useParams, usePathname, useRouter } from 'next/navigation'

import { useAuth } from '@/hooks/useAuth'
import { ScreenLoading } from '@components/ui/ScreenLoading'

export function AuthGuard(props: React.PropsWithChildren) {
  const auth = useAuth()
  const router = useRouter()
  const params = useParams()
  const pathname = usePathname()

  React.useEffect(() => {
    if (auth) {
      return
    }

    router.replace(
      (() => {
        const url = new URL(window.location.href)

        url.pathname = `/${params.lang}/login`
        url.searchParams.set('redirect_url', pathname)

        return url.href
      })()
    )
  }, [auth, router, params.lang, pathname])

  if (auth) {
    return props.children
  }

  return <ScreenLoading></ScreenLoading>
}
