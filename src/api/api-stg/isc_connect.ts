import type { AxiosRequestConfig } from 'axios'

import { request } from './request'

export function isc_connect(req: Req) {
  return request<unknown, Res, Data>({
    url: '/connection/isc/connect',
    method: 'POST',
    ...req
  })
}

export type Req = AxiosRequestConfig<Data>

export interface Data {
  shop_alias?: string
  user_type: number
  email: string
  password: string
}

export interface Res {}
