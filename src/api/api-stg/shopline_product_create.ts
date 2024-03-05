import type { AxiosRequestConfig } from 'axios'

import { request } from './request'

export function shopline_product_create(req: Req) {
  return request<unknown, Res, Data>({
    url: '/connection/shopline/product_create',
    method: 'POST',
    ...req
  })
}

export interface Res {
  [key: string]: never
}
export type Req = AxiosRequestConfig<Data>
export interface Data {
  title: string
  tags: string[]
  body_html: string
  images?: Image[]
}
interface Image {
  id: string
  alt: string
  src: string
}
