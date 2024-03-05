import { useMutation } from '@tanstack/react-query'

import { invoice_pdf_get } from '@/api/api-erp/invoice_pdf_get'
import type { Req } from '@/api/api-erp/invoice_pdf_get'

export function useInvoicePdfPost() {
  return useMutation<File, Error, Req>({
    mutationFn(req) {
      return invoice_pdf_get(req)
    },
    onError(err) {
      console.error(err.message)
    },
    onSuccess(data) {
      const url = URL.createObjectURL(data)
      const a = document.createElement('a')

      a.href = url
      a.download = data.name
      a.click()
      a.remove()
    }
  })
}
