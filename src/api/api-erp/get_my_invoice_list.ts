import type { AxiosRequestConfig } from 'axios'

import { axiosErp } from './axiosErp'

export interface Req {
  sale_order_id: 110
  payment_method_id: 10
}

export interface Res {
  invoice_list: Invoice[]
}

export function get_my_invoice_list(req: AxiosRequestConfig) {
  return axiosErp<unknown, Res, Req>({
    url: '/wd/get_my_invoice_list',
    method: 'POST',
    ...req
  })
}

export interface Invoice {
  id: number
  name: string
  payment_reference: string
  invoice_date: string
  invoice_date_due: string
  amount_untaxed_signed: number
  amount_tax_signed: number
  currency_id: number
  currency_symbol: string
  currency_name: string
  state: string
  state_tile: string
  payment_state: string
  payment_state_title: string
}
