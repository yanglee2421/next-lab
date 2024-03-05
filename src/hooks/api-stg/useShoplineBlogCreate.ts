import { useMutation, useQueryClient } from '@tanstack/react-query'

import { shopline_blog_create } from '@/api/api-stg/shopline_blog_create'
import type { Req, Res } from '@/api/api-stg/shopline_blog_create'

export function useShoplineBlogCreate() {
  const queryClient = useQueryClient()

  return useMutation<Res, Error, Req>({
    mutationFn(req) {
      return shopline_blog_create(req)
    },
    onError(error) {
      console.error(error)
    },
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: []
      })
    }
  })
}
