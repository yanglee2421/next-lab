import { useQuery } from '@tanstack/react-query'

import { validate_jwt_token } from '@/api/api-erp'
import type { Res } from '@/api/api-erp/validate_jwt_token'

export function useValidateJwtToken() {
  return useQuery<Res>({
    queryKey: ['validate_jwt_token'],
    queryFn({ signal }) {
      return validate_jwt_token({ signal })
    }
  })
}
