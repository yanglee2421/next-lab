import { useQuery } from '@tanstack/react-query'

import type { Res} from '@/api/api-erp/get_payment_token';
import { get_payment_token } from '@/api/api-erp/get_payment_token'

export function useGetPayment() {
  return useQuery<Res, Error>({
    queryKey: ['get_payment_token'],
    queryFn({ signal }) {
      return get_payment_token({ signal })
    }
  })
}
