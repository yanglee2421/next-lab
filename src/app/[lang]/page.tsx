'use client'

import React from 'react'

import { useParams, useRouter } from 'next/navigation'

import { ScreenLoading } from '@components/ui/ScreenLoading'

export default function Page() {
  const params = useParams()
  const router = useRouter()

  React.useEffect(() => {
    router.replace(`/${params.lang}/account-setting/account`)
  }, [router, params.lang])

  return <ScreenLoading></ScreenLoading>
}
