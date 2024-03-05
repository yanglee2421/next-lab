import type { AxiosRequestConfig } from 'axios'

import { axiosErp } from './axiosErp'

export function get_payment_token(req: AxiosRequestConfig = {}) {
  return axiosErp<unknown, Res>({
    url: '/wd/get_payment_token',
    method: 'POST',
    ...req
  })
}

export interface Res {
  payment_tokens: Payment_tokens[]
}

export interface Payment_tokens {
  payment_token_id: number
  payment_details: string
}
