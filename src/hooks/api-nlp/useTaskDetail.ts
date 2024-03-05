import { useQuery } from '@tanstack/react-query'

import { gpt_task } from '@/api/api-nlp/gpt_task'
import type { Res } from '@/api/api-nlp/gpt_task'
import { useCopywritingStore } from '@/hooks/store/useCopywritingStore'

export function useTaskDetail() {
  const task_id = useCopywritingStore(s => s.task)

  return useQuery<Res, Error>({
    enabled: Boolean(task_id),
    queryKey: ['gpt_task', task_id],
    queryFn({ signal }) {
      if (!task_id) {
        throw new Error('Felid task_id is falsy')
      }

      return gpt_task({ signal, params: { task_id } })
    }
  })
}
