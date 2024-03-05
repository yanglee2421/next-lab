import { useMutation, useQueryClient } from '@tanstack/react-query'

import type { Res, Req } from '@/api/api-erp/new_subscription_cancel'
import { new_subscription_cancel } from '@/api/api-erp/new_subscription_cancel'

export function useNewSubscriptionCancel() {
  const queryClient = useQueryClient()

  return useMutation<Res, Error, Req>({
    mutationFn(req) {
      return new_subscription_cancel(req)
    },
    onError(err) {
      console.error(err)
    },
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['my_current_plan']
      })
      queryClient.invalidateQueries({
        queryKey: ['get_all_plans']
      })
    }
  })
}
