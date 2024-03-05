import { useMutation, useQueryClient } from '@tanstack/react-query'

import { toast } from 'react-toastify'

import { create_company } from '@/api/api-erp'
import type { Req, Res } from '@/api/api-erp/create_company'

export function useCreatePost() {
  const queryClient = useQueryClient()

  return useMutation<Res, Error, Req>({
    mutationFn(req) {
      return create_company(req)
    },
    onError(error) {
      toast.error(error.message)
    },
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['get_company']
      })
      toast.success('Create Company Successfully!')
    }
  })
}
