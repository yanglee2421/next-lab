import type { AxiosRequestConfig } from 'axios'

import { request } from './request'

export function get_all_plans(req: Req) {
  return request<unknown, Res>({
    url: '/ai_credit/all_plans',
    method: 'GET',
    ...req
  })
}

export type Req = AxiosRequestConfig & {
  params: Params
}

export interface Params {
  plan_id: string
  lan: string
}

export interface Res {
  data: {
    plans: Record<string, Plan>[]
  }
}

export interface Plan {
  product_id: number
  product_name: string
  category_name: string
  product_description_sale: null | string
  price_unit: number
  plan_credit: number
  interval_number: number
  interval_type: string
  interval_type_title: string
  currency_name: string
  currency_symbol: string
}
