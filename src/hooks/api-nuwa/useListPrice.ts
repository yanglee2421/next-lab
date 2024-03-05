import { useQuery } from '@tanstack/react-query'

import { list_price } from '@/api/api-nuwa/list_price'
import type { Params } from '@/api/api-nuwa/list_price'

export function useListPrice(params: Params) {
  return useQuery({
    queryKey: ['list_price', params],
    queryFn({ signal }) {
      return list_price({ signal, params })
    },

    enabled: Boolean(params)
  })
}
