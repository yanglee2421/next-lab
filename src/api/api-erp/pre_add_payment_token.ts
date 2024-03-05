import type { AxiosRequestConfig } from 'axios'

import { axiosErp } from './axiosErp'

export function pre_add_payment_token(req: Req) {
  return axiosErp<unknown, Res>({
    url: '/wd/pre_add_payment_token',
    method: 'POST',
    ...req
  })
}

export type Req = AxiosRequestConfig<Data>
export interface Data {
  return_url: string
}
export interface Res {
  rendering_context: {
    provider_id: number
    provider_code: string
    reference: string
    amount: number
    currency_id: number
    partner_id: number
    publishable_key: string
    session_id: string
    session_url: string
    web_hook_url: string
  }
}
