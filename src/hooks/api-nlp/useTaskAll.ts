import { useQuery } from '@tanstack/react-query'

import { gpt_all_task_info } from '@/api/api-nlp/gpt_all_task_info'
import type { Res } from '@/api/api-nlp/gpt_all_task_info'

export function useTaskAll() {
  return useQuery<Res, Error>({
    queryKey: ['gpt_all_task_info'],
    queryFn({ signal }) {
      return gpt_all_task_info({ signal })
    }
  })
}
