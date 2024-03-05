import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import { usr_update } from '@/api/api-erp'
import type { Req, Res } from '@/api/api-erp/usr_update'

export function useSubmitPost() {
  const queryClient = useQueryClient()

  return useMutation<Res, Error, Req>({
    mutationFn(req) {
      return usr_update(req)
    },
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['usr_get_details']
      })
      toast.success('Save successlly!')
    },
    onError(error) {
      toast.error(error.message || 'System error')
    }
  })
}
