import { keepPreviousData, useQuery } from '@tanstack/react-query'

import type { Params, Res } from '@/api/api-nuwa/supplier_1688_product_keyword';
import { supplier_1688_product_keyword  } from '@/api/api-nuwa/supplier_1688_product_keyword'


export function use1688Products(site_connection_id: string | number, params: Params) {
  return useQuery<Res>({
    queryKey: ['supplier_1688_product_keyword', site_connection_id, params],
    queryFn({ signal }) {
      return supplier_1688_product_keyword({
        signal,
        params,
        headers: {
          'site-connection-id': site_connection_id
        }
      })
    },

    enabled: Boolean(site_connection_id),

    placeholderData: keepPreviousData
  })
}
