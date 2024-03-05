import React from 'react'

import { useQuery, useQueryClient } from '@tanstack/react-query'

import { gpt_active_task_info } from '@/api/api-nlp/gpt_active_task_info'
import type { Res } from '@/api/api-nlp/gpt_active_task_info'
import type { Res as AllRes } from '@/api/api-nlp/gpt_all_task_info'
import { useCopywritingStore } from '@/hooks/store/useCopywritingStore'
import { toDeduplicate } from '@/utils/toDeduplicate'

export function useTaskActive() {
  const isPolling = useCopywritingStore(s => s.isPolling)
  const setIsPolling = useCopywritingStore(s => s.setIsPolling)

  const queryClient = useQueryClient()

  const query = useQuery<Res, Error>({
    enabled: isPolling,
    queryKey: ['gpt_active_task_info'],
    queryFn({ signal }) {
      return gpt_active_task_info({ signal })
    },
    refetchInterval: 1000 * 2
  })

  React.useEffect(() => {
    if (!query.isSuccess) {
      return
    }

    if (!query.data.length) {
      setIsPolling(false)

      queryClient.invalidateQueries({
        queryKey: ['my_current_plan']
      })

      return
    }

    queryClient.setQueryData<AllRes>(['gpt_all_task_info'], prev => {
      if (!prev) {
        return query.data
      }

      return toDeduplicate(prev.concat(query.data), {
        keyProp: 'task_id',
        isCover: true
      })
    })
  }, [query.isSuccess, query.data, queryClient, setIsPolling])
}
