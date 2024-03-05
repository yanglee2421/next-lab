import React from 'react'

import { useRefreshToken } from '@/hooks/api-erp/useRefreshToken'
import { useAuthLocalStore } from '@/hooks/store/useAuthLocalStore'

export function useAuth() {
  const accessToken = useAuthLocalStore(s => s.accessToken)
  const updateAccessToken = useAuthLocalStore(s => s.updateAccessToken)
  const clearAccessToken = useAuthLocalStore(s => s.clearAccessToken)

  const query = useRefreshToken(accessToken)

  React.useEffect(() => {
    if (query.isError) {
      clearAccessToken()
    }

    if (query.isSuccess) {
      updateAccessToken(query.data.access_token)
    }
  }, [query.isError, query.isSuccess, query.data, clearAccessToken, updateAccessToken])

  if (query.isPending) {
    return null
  }

  if (query.isError) {
    return null
  }

  return query.data
}
