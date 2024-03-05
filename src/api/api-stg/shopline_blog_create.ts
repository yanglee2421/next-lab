import type { AxiosRequestConfig } from 'axios'

import { request } from './request'

export function shopline_blog_create(req: Req) {
  return request<unknown, Res>({
    url: '/connection/shopline/blog_create',
    method: 'POST',
    ...req
  })
}

export type Req = AxiosRequestConfig<Data>
export interface Data {
  blog_collection_id: string
  title: string
  author: string
  tags: string[]
  content_html: string
  image_link: string
  published: boolean
}
export interface Res {
  [key: string]: never
}
