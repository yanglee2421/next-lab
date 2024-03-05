import { useMutation } from '@tanstack/react-query'

import type { Req, Res} from '@/api/api-erp/create_help_ticket';
import { create_help_ticket } from '@/api/api-erp/create_help_ticket'

export function useTicketCreate() {
  return useMutation<Res, Error, Req>({
    mutationFn(req) {
      return create_help_ticket(req)
    },
    onError(err) {
      console.error(err)
    }
  })
}
