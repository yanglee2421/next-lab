import { useQuery } from '@tanstack/react-query'

import { common_base_lang } from '@/api/api-erp'
import type { Res } from '@/api/api-erp/common_base_lang'

export function useCommonLang() {
  return useQuery<Res>({
    queryKey: ['common_base_lang'],
    queryFn({ signal }) {
      return common_base_lang({ signal })
    }
  })
}
