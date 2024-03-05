import { useQuery } from '@tanstack/react-query'

import { all_subscribed_plans } from '@/api/api-stg/all_subscribed_plans'

export function useAllSubscribedPlans() {
  return useQuery({
    queryKey: ['all_subscribed_plans'],
    queryFn({ signal }) {
      return all_subscribed_plans({ signal })
    }
  })
}
