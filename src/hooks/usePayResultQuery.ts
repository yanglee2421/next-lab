import React from 'react'

import { useRouter, useSearchParams } from 'next/navigation'

import { useQueryClient, useQuery } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import { get_payment_result } from '@/api/api-erp/get_payment_result'

export function usePayResultQuery() {
  const toastIdRef = React.useRef(Math.random().toString())
  const router = useRouter()
  const searchParams = useSearchParams()
  const queryClient = useQueryClient()

  const reference = searchParams.get('reference')
  const checkout_session_id = searchParams.get('checkout_session_id')

  const query = useQuery({
    queryKey: ['get_payment_result', reference],
    queryFn({ signal }) {
      return get_payment_result({ signal, data: { reference: reference || '' } })
    },

    enabled: Boolean(reference),
    refetchInterval: 1000 * 2
  })

  React.useEffect(() => {
    if (!reference) {
      toast.dismiss(toastIdRef.current)

      return
    }

    toast.loading('Checking payment...', { toastId: toastIdRef.current })

    if (!checkout_session_id) {
      return
    }

    if (!query.data?.display_message) {
      return
    }

    queryClient.invalidateQueries({
      queryKey: ['get_my_invoice_list']
    })
    queryClient.invalidateQueries({
      queryKey: ['get_all_plans']
    })
    queryClient.invalidateQueries({
      queryKey: ['my_current_plan']
    })
    queryClient.invalidateQueries({
      queryKey: ['all_subscribed_plans']
    })
    queryClient.invalidateQueries({
      queryKey: ['get_payment_token']
    })

    router.replace(
      (() => {
        const url = new URL(window.location.href)

        url.searchParams.delete('reference')
        url.searchParams.delete('checkout_session_id')

        return url.href
      })()
    )
  }, [reference, checkout_session_id, queryClient, router, query.data?.display_message, query.isSuccess])
}
