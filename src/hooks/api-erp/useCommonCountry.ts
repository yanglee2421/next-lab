import { useQuery } from '@tanstack/react-query'

import { common_base_country } from '@/api/api-erp'
import type { Res } from '@/api/api-erp/common_base_country'

export function useCommonCountry() {
  return useQuery<Res>({
    queryKey: ['common_base_country'],
    queryFn({ signal }) {
      return common_base_country({ signal })
    }
  })
}
