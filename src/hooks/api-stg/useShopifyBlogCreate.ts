import { useMutation, useQueryClient } from '@tanstack/react-query'

import type { Req, Res } from '@/api/api-stg/shopify_blog_create';
import { shopify_blog_create  } from '@/api/api-stg/shopify_blog_create'


export function useShopifyBlogCreate() {
  const queryClient = useQueryClient()

  return useMutation<Res, Error, Req>({
    mutationFn(req) {
      return shopify_blog_create(req)
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
