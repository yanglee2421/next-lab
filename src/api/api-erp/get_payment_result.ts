import type { AxiosRequestConfig } from 'axios'

import { axiosErp } from './axiosErp'

export function get_payment_result(req: Req) {
  return axiosErp<unknown, Res, Data>({
    url: '/wd/get_payment_result',
    method: 'POST',
    ...req
  })
}

export type Req = AxiosRequestConfig<Data>

export interface Data {
  reference: string
}

export interface Res {
  display_message: string
  payment_transaction_id: number
  reference: string
  state: string
}
