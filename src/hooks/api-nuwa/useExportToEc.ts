import { useMutation } from '@tanstack/react-query'

import { export_to_ec } from '@/api/api-nuwa/export_to_ec'
import type { Req, Res } from '@/api/api-nuwa/export_to_ec'

export function useExportToEc() {
  return useMutation<Res, Error, Req>({
    mutationFn(req) {
      return export_to_ec(req)
    }
  })
}
