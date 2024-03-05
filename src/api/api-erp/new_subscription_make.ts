import type { AxiosRequestConfig } from 'axios'

import { axiosErp } from './axiosErp'

export function new_subscription_make(req: Req) {
  return axiosErp<unknown, Res, Data>({
    url: '/wd/make_subscription_plan',
    method: 'POST',
    ...req
  })
}

export type Req = AxiosRequestConfig<Data>
export interface Data {
  product_id: number
  payment_token_id: number
  force_cancel_old_subscription: boolean
}
export interface Res {
  [key: string]: unknown
}
