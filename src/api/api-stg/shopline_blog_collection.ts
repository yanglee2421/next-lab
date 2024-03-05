import type { AxiosRequestConfig } from 'axios'

import { request } from './request'

export function shopline_blog_collection(req: Req) {
  return request<unknown, Res>({
    url: '/connection/shopline/blog_collection',
    ...req
  })
}

export type Req = AxiosRequestConfig
export interface Res {
  blogs: Blog[]
}
export interface Blog {
  commentable: string
  created_at: string
  handle: string
  id: string
  template_suffix: null
  title: string
  updated_at: string
}
