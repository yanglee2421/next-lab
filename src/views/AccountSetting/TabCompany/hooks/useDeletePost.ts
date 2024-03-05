import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import { delete_company } from '@/api/api-erp'

export function useDeletePost() {
  const queryClient = useQueryClient()

  return useMutation<unknown, Error>({
    mutationFn() {
      return delete_company()
    },
    onError(error) {
      toast.error(error.message)
    },
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['get_company']
      })

      // toast.success("Delete Company Successfully!");
    }
  })
}
