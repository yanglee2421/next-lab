import { useQuery } from '@tanstack/react-query'

import { collection_list } from '@/api/api-nuwa/collection_list'
import type { Res } from '@/api/api-nuwa/collection_list'

export function useCollectionList(siteConnectionId: string | number) {
  return useQuery<Res>({
    queryKey: ['collection_list', siteConnectionId],
    queryFn({ signal }) {
      return collection_list({
        signal,
        headers: {
          'site-connection-id': siteConnectionId
        }
      })
    },

    enabled: Boolean(siteConnectionId)
  })
}
