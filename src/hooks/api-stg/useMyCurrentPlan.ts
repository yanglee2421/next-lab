import { useQuery } from '@tanstack/react-query'

import type { Params } from '@/api/api-stg/my_current_plan';
import { my_current_plan } from '@/api/api-stg/my_current_plan'


export function useMyCurrentPlan(params: Params) {
  return useQuery({
    queryKey: ['my_current_plan', params],
    queryFn({ signal }) {
      return my_current_plan({ signal, params })
    }
  })
}
