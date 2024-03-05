import { useQuery } from '@tanstack/react-query'

import { get_invite_unaccepted } from '@/api/api-erp/get_invite_unaccepted'

export function useUnacceptedQuery() {
  return useQuery({
    queryKey: ['get_invite_unaccepted'],
    queryFn({ signal }) {
      return get_invite_unaccepted({ signal })
    }
  })
}
