import { useMutation, useQueryClient } from '@tanstack/react-query'

import { toast } from 'react-toastify'

import { gpt_write } from '@/api/api-nlp/gpt_write'
import type { Res, Req } from '@/api/api-nlp/gpt_write'
import { useCopywritingStore } from '@/hooks/store/useCopywritingStore'

export function useGptWrite() {
  const queryClient = useQueryClient()
  const setError = useCopywritingStore(s => s.setError)
  const setIsPolling = useCopywritingStore(s => s.setIsPolling)
  const setShowBack = useCopywritingStore(s => s.setShowBack)

  return useMutation<Res, Error, Req>({
    mutationFn(req) {
      return gpt_write(req)
    },
    onError(err) {
      const { cause } = err

      switch (cause) {
        case 'No Plan':
        case 'Credit not enough':

        case 'Reached Parallel Task Limitation': {
          setError(err)

          return
        }

        default:
          toast.error(err.message)
      }
    },
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['gpt_all_task_info']
      })

      setIsPolling(true)
      setShowBack(false)
    }
  })
}
