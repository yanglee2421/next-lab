import type { AxiosRequestConfig } from 'axios'

import { request } from './request'

export function recs_init(req: Req) {
  return request<unknown, Res, Data>({
    url: '/recs/init',
    method: 'POST',
    ...req
  })
}

interface Data {
  collection_ids: string[]

  /**
   * @field
   * 2: cv
   * 3: cf
   */
  recs_type: number
}

export type Req = AxiosRequestConfig<Data> & {
  headers: {
    'site-connection-id': number | string
  }
}

export interface Res {}
