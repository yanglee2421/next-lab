import type { AxiosRequestConfig } from 'axios'

import { request } from './request'

export function woo_product_update(req: Req) {
  return request<unknown, Res, Data>({
    url: '/connection/woocommerce/product_update',
    method: 'PUT',
    ...req
  })
}

export type Req = AxiosRequestConfig<Data>
export interface Data {
  title: string
  tags: Tag[]
  body_html: string
  images: Image[]
}

export interface Tag {
  id: number
  name: string
  slug: string
}

export interface Image {
  id: number
  src: string
}

export interface Res {
  [key: string]: never
}
