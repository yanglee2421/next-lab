import type { AxiosRequestConfig } from 'axios'

import { axiosErp } from './axiosErp'

export interface Params {
  invoice_id: number
}

export type Req = AxiosRequestConfig<Params>

export function invoice_pdf_get(req: Req = {}) {
  return axiosErp<unknown, File, Params>({
    url: '/wd/invoice_pdf_get',
    method: 'POST',
    responseType: 'blob',
    ...req
  })
}
