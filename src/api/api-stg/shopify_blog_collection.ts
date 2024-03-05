import type { AxiosRequestConfig } from 'axios'

import { request } from './request'

export function shopify_blog_collection(req: Req) {
  return request<unknown, Res>({
    url: '/connection/shopify/blog_collection',
    ...req
  })
}

export type Req = AxiosRequestConfig
export type Res = BlogCollectioin[]

export interface BlogCollectioin {
  id: number
  title: string
}
