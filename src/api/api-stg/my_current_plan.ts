import type { AxiosRequestConfig } from 'axios'

import { request } from './request'

export function my_current_plan(req: Req) {
  return request<unknown, Res>({
    url: '/ai_credit/plan',
    method: 'GET',
    ...req
  })
}

export type Req = AxiosRequestConfig & {
  params: Params
}

export interface Params {
  plan_id: string
}

export interface Res {
  org_id: number
  plan: {
    plan_id: number
    product_id: number
    product_credit: number
    price_unit: number
    product_plan_credit: number
    product_name: string
    product_description_sale: string
    product_description: null
    plan_type: number
    plan_type_title: string
    recurrence_name: string
    quota_renewal_date_left: number
    quota_renewal_date: string
    plan_start_time: string
    plan_end_time: string
  }
}
