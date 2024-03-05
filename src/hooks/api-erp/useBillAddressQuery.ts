import { useQuery } from '@tanstack/react-query'

import { usr_get_invoice_address } from '@/api/api-erp/usr_get_invoice_address'

export function useBillAddressQuery() {
  return useQuery({
    queryKey: ['usr_get_invoice_address'],
    queryFn() {
      return usr_get_invoice_address()
    }
  })
}
