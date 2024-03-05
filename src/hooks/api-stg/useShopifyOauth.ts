import { useParams } from 'next/navigation'

import { useQuery } from '@tanstack/react-query'

import { shopify_oauth_authorize } from '@/api/api-stg/shopify_oauth_authorize'
import type { Res } from '@/api/api-stg/shopify_oauth_authorize'


export function useShopifyOauth() {
  const params = useParams()

  const data = (() => {
    if (typeof window === 'undefined') {
      return {
        auth_url: '',
        app_type: Number(params.app_type)
      }
    }

    return {
      auth_url: window.location.href || '',
      app_type: Number(params.app_type)
    }
  })()

  return useQuery<Res, Error>({
    queryKey: ['shopify_oauth_authorize', data],
    queryFn({ signal }) {
      return shopify_oauth_authorize({
        signal,
        data,
        timeout: 1000 * 20
      })
    },

    enabled: (() => {
      if (typeof window === 'undefined') {
        return false
      }

      return [window.location.search, params.app_type].every(Boolean)
    })(),

    retry: 2
  })
}
