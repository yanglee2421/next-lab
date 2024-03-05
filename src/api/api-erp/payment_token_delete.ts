import type { AxiosRequestConfig } from 'axios'

import { axiosErp } from './axiosErp'

export function payment_token_delete(req: Req) {
  return axiosErp<unknown, Res, Data>({
    url: '/wd/delete_payment_token',
    method: 'POST',
    ...req
  })
}

export type Req = AxiosRequestConfig<Data>
export interface Data {
  payment_token_id: number
}
export interface Res {
  [key: string]: unknown
}
