// Axios Imports
import type { AxiosRequestConfig } from 'axios'

import { axiosErp } from './axiosErp'

export function auth_login(req: Req) {
  return axiosErp<unknown, Res, Data>({
    url: '/wd/login',
    method: 'POST',
    ...req
  })
}

export type Req = AxiosRequestConfig<Data>
export interface Data {
  email: string
  password: string
}
export interface Res {
  access_token: string
  user_data: {
    avatar: string
    name: string
    email: string
  }
}
