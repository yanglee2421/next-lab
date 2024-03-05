import type { AxiosRequestConfig } from 'axios'

import { axiosNuwa } from './axiosNuwa'

export function collection_list(req: Req) {
  return axiosNuwa<unknown, Res>({
    url: '/product/collection/list',
    ...req
  })
}

export type Req = AxiosRequestConfig & {
  headers: {
    'site-connection-id': string | number
  }
}

export interface Res {
  collections: Collection[]
}

export interface Collection {
  collection_id: number
  collection_title: string
}
