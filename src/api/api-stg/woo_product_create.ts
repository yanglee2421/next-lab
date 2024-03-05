import type { AxiosRequestConfig } from 'axios'

import { request } from './request'

export function woo_product_create(req: Req) {
  return request<unknown, Res>({
    url: '/connection/woocommerce/product_create',
    method: 'POST',
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
