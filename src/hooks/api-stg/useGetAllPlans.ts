import { useQuery } from '@tanstack/react-query'

import type { Params } from '@/api/api-stg/get_all_plans';
import { get_all_plans } from '@/api/api-stg/get_all_plans'


export function useGetAllPlans(params: Params) {
  return useQuery({
    queryKey: ['get_all_plans', params],
    queryFn({ signal }) {
      return get_all_plans({ signal, params })
    },

    enabled: Object.values(params).every(Boolean)
  })
}
