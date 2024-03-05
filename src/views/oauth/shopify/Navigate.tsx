import React from 'react'

import { useParams, useRouter } from 'next/navigation'

export function Navitate() {
  const router = useRouter()
  const params = useParams()

  React.useEffect(() => {
    router.replace(`/${params.lang}`)
  }, [router, params.lang])

  return null
}
