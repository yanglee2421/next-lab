import type { AxiosRequestConfig } from 'axios'

import { axiosErp } from './axiosErp'

export function new_subscription_cancel(req: Req) {
  return axiosErp<unknown, Res, Data>({
    url: '/wd/cancel_subscription_plan',
    method: 'POST',
    ...req
  })
}

export type Req = AxiosRequestConfig<Data>

export interface Data {
  subscription_id: number
}

export interface Res {
  subscription_name: string
  subscription_id: number
  state: string
}
