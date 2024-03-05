import type { AxiosRequestConfig } from 'axios'

import { request } from './request'

export function shopify_product_update(req: Req) {
  return request<unknown, Res, Data>({
    url: '/connection/shopify/product_update',
    method: 'PUT',
    ...req
  })
}

export type Req = AxiosRequestConfig<Data>

export interface Data {
  title: string
  tags: string[]
  body_html: string
}
export interface Res {
  [key: string]: unknown
}
