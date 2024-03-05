import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import { update_company } from '@/api/api-erp'
import type { Req, Res } from '@/api/api-erp/update_company'

export function useUpdatePost() {
  const queryClient = useQueryClient()

  return useMutation<Res, Error, Req>({
    mutationFn(req) {
      return update_company(req)
    },
    onError(err) {
      toast.error(err.message)
    },
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['get_company']
      })
      toast.success('Save Company Successfully!')
    }
  })
}
