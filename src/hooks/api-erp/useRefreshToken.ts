import { useQuery } from '@tanstack/react-query'

import type { Res } from '@/api/api-erp/refresh_token';
import { refresh_token } from '@/api/api-erp/refresh_token'

export function useRefreshToken(accessToken: string) {
  return useQuery<Res, Error>({
    queryKey: ['refresh_token'],
    queryFn({ signal }) {
      return refresh_token({
        signal,
        timeout: 1000 * 2
      })
    },

    enabled: Boolean(accessToken),

    retry: 1,
    retryDelay: 1000,

    refetchInterval: 1000 * 60 * 30,
    refetchIntervalInBackground: true,
    refetchOnMount: true,
    refetchOnReconnect: true,
    refetchOnWindowFocus: true,

    staleTime: 1000 * 60 * 30
  })
}
