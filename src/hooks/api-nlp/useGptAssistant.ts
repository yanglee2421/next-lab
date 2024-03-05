import { useMutation, useQueryClient } from '@tanstack/react-query'

import { toast } from 'react-toastify'

import { gpt_assistant } from '@/api/api-nlp/gpt_assistant'
import type { Req, Res } from '@/api/api-nlp/gpt_assistant'
import { useCopywritingStore } from '@/hooks/store/useCopywritingStore'

export function useGptAssistant() {
  const queryClient = useQueryClient()
  const setIsPolling = useCopywritingStore(s => s.setIsPolling)
  const setShow = useCopywritingStore(s => s.setShowBack)
  const setError = useCopywritingStore(s => s.setError)

  return useMutation<Res, Error, Req>({
    mutationFn(req) {
      return gpt_assistant(req)
    },
    onError(err) {
      console.error(err)

      switch (err.cause) {
        case 'No Plan':
        case 'Credit not enough':
        case 'Reached Parallel Task Limitation':
          setError(err)
          break

        default:
          toast.error(err.message)
      }
    },
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['gpt_all_task_info']
      })

      setIsPolling(true)
      setShow(false)
    }
  })
}
