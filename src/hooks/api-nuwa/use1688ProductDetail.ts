import { useQuery } from '@tanstack/react-query'

import type { Params } from '@/api/api-nuwa/supplier_1688_product_details';
import { supplier_1688_product_details  } from '@/api/api-nuwa/supplier_1688_product_details'


export function use1688ProductDetail(site_connection_id: string | number, params: Params) {
  return useQuery({
    queryKey: ['supplier_1688_product_details', site_connection_id, params],
    queryFn({ signal }) {
      return supplier_1688_product_details({
        signal,
        params,
        headers: {
          'site-connection-id': site_connection_id
        }
      })
    },

    enabled: Boolean(site_connection_id),

    refetchOnWindowFocus: false
  })
}
