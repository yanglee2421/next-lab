import { useMutation } from '@tanstack/react-query'

import type { Req, Res } from '@/api/api-stg/recs_init';
import { recs_init } from '@/api/api-stg/recs_init'

export function useRecsInit() {
  return useMutation<Res, Error, Req>({
    mutationFn(req) {
      return recs_init(req)
    }
  })
}
