import type { AxiosRequestConfig } from 'axios'

import { request } from './request'

export function ali1688_connect(req: Req) {
  return request<unknown, Res, Data>({
    url: '/alibaba/connect',
    method: 'POST',
    ...req
  })
}

export type Req = AxiosRequestConfig<Data>
export interface Data {
  app_key: string
  app_secret: string
}
export interface Res {
  auth_url: string
}
