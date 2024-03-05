import type { AxiosRequestConfig } from 'axios'

import { request } from './request'

export function shopify_oauth_authorize(req: Req) {
  return request<unknown, Res, Data>({
    url: '/connection/shopify/oauth/authorize',
    method: 'POST',
    ...req
  })
}

export type Req = AxiosRequestConfig<Data>

export interface Data {
  auth_url: string
  app_type: number
}

export interface Res {
  access_token: string | null
  conn_info: Connection | null
}

export interface Connection {
  auth_url: string
}
