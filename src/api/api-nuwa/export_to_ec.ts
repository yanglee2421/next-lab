import type { AxiosRequestConfig } from 'axios'

import { axiosNuwa } from './axiosNuwa'

export function export_to_ec(req: Req) {
  return axiosNuwa<unknown, Res, Data>({
    url: '/product_sync/export_to_ec',
    method: 'POST',
    ...req
  })
}

export type Req = AxiosRequestConfig<Data> & {
  headers: {
    'site-connection-id': string | number
  }
}
export interface Data {
  product_ids: number[]
  is_published: boolean
  price_method: 1 | 2 // price_method: percent or amount
  price_value: number
  collection_id?: number

  // exchange_rate: number;
  target_currency: string
}

export interface Res {}
