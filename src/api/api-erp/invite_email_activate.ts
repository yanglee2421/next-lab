import type { AxiosRequestConfig } from 'axios'

import { axiosErp } from './axiosErp'

export function invite_email_activate(req: Req) {
  return axiosErp<unknown, Res, Data>({
    url: '/wd/invite_email_activate',
    method: 'POST',
    ...req
  })
}

export type Req = AxiosRequestConfig<Data>

export interface Data {
  email: string
  name: string
  wd_role: number
}

export interface Res {
  login: string
}
