// API Imports
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { toast } from 'react-toastify'

import { update_invoice_address } from '@/api/api-erp'
import type { Req, Res } from '@/api/api-erp/update_invoice_address'

// Toast Imports

export function useAddressPost() {
  const queryClient = useQueryClient()

  return useMutation<Res, Error, Req>({
    mutationFn(data) {
      return update_invoice_address(data)
    },
    onError(error) {
      toast.error(error.message || 'System Error')
    },
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['usr_get_invoice_address']
      })

      toast.success('Save Successlly!')
    }
  })
}
