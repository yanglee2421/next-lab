import type { AxiosRequestConfig } from 'axios'

import { axiosErp } from './axiosErp'

export function set_passwd_by_email_token(req: Req) {
  return axiosErp<unknown, Res, Data>({
    url: '/wd/set_passwd_by_email_token',
    method: 'POST',
    ...req
  })
}

export type Req = AxiosRequestConfig<Data>

export interface Data {
  token: string
  password: string
}

export interface Res {
  login: string
  name: string
}
