import { useQuery } from '@tanstack/react-query'

import { shopline_blog_collection } from '@/api/api-stg/shopline_blog_collection'
import type { Res } from '@/api/api-stg/shopline_blog_collection'

export function useShoplineBlogCollection(connection_id: number) {
  return useQuery<Res, Error>({
    queryKey: ['shopline_blog_collection', connection_id],
    queryFn() {
      return shopline_blog_collection({
        headers: {
          'site-connection-id': connection_id
        }
      })
    },

    enabled: Boolean(connection_id)
  })
}
