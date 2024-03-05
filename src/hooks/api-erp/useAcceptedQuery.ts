import { useQuery } from '@tanstack/react-query'

import type { Res } from '@/api/api-erp/get_invite_accepted';
import { get_invite_accepted  } from '@/api/api-erp/get_invite_accepted'


export function useAcceptedQuery() {
  return useQuery<Res, Error>({
    queryKey: ['get_invite_accepted'],
    queryFn({ signal }) {
      return get_invite_accepted({ signal })
    }
  })
}
