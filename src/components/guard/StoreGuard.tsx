import type React from 'react'

import { useMyConnections } from '@/hooks/api-stg/useMyConnections'

export function StoreGuard(props: React.PropsWithChildren) {
  const query = useMyConnections({
    site_type: 1,
    is_list_all: false
  })

  if (query.isPending) {
    return null
  }

  if (query.isError) {
    return null
  }

  if (!query.data.length) {
    return null
  }

  return props.children
}
