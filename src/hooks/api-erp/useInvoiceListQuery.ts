import { useQuery } from '@tanstack/react-query'

import { get_my_invoice_list } from '@/api/api-erp/get_my_invoice_list'
import type { Res } from '@/api/api-erp/get_my_invoice_list'

export function useInvoiceListQuery() {
  return useQuery<Res, Error>({
    queryKey: ['get_my_invoice_list'],
    queryFn({ signal }) {
      return get_my_invoice_list({ signal })
    },
    initialData() {
      return {
        invoice_list: []
      }
    },
    initialDataUpdatedAt: 0
  })
}
