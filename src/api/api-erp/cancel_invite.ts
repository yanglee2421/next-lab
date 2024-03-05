import type { AxiosRequestConfig } from 'axios'

import { axiosErp } from './axiosErp'

export function cancel_invite(req: Req) {
  return axiosErp<unknown, Res, Data>({
    url: '/wd/cancel_invite',
    method: 'POST',
    ...req
  })
}

export type Req = AxiosRequestConfig<Data>

export interface Data {
  email: string
}

export interface Res {
  email: string
}
