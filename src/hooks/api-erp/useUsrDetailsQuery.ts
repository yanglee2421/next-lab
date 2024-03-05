import { useQuery } from '@tanstack/react-query'

import { usr_get_details } from '@/api/api-erp'
import type { Res } from '@/api/api-erp/usr_get_details'

export function useUsrDetailsQuery() {
  return useQuery<Res>({
    queryKey: ['usr_get_details'],
    queryFn({ signal }) {
      return usr_get_details({ signal })
    }
  })
}
