import { useQuery } from '@tanstack/react-query'

import type { Res } from '@/api/api-stg/shopify_blog_collection';
import { shopify_blog_collection  } from '@/api/api-stg/shopify_blog_collection'


export function useShopifyBlogCollection(connection_id: number) {
  return useQuery<Res, Error>({
    queryKey: ['shopify_blog_collection', connection_id],
    queryFn({ signal }) {
      return shopify_blog_collection({
        signal,
        headers: {
          'site-connection-id': connection_id
        }
      })
    },

    enabled: Boolean(connection_id)
  })
}
