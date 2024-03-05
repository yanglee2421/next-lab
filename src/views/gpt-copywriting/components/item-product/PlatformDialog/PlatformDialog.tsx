import React from 'react'

import { useSearchParams } from 'next/navigation'

import { ShopifyDialog } from './ShopifyDialog'
import { ShoplineDialog } from './ShoplineDialog'
import { WooDialog } from './WooDialog'

export function PlatformDialog() {
  const searchParams = useSearchParams()

  switch (searchParams.get('site_type')) {
    case '1':
      return <ShopifyDialog />
    case '2':
      return <WooDialog />
    case '3':
      return <ShoplineDialog />
    default:
      return null
  }
}
