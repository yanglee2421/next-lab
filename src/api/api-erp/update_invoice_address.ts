// Axios Imports
import type { AxiosRequestConfig } from 'axios'

import { axiosErp } from './axiosErp'

export function update_invoice_address(req: Req) {
  return axiosErp<unknown, Res, AddressData>({
    ...req,
    url: '/wd/user/update_invoice_address',
    method: 'POST'
  })
}

export type Req = AxiosRequestConfig<AddressData>

export interface AddressData {
  name: string
  email: string
  phone: string
  mobile: string
  country_id: number
  state_id: number
  city: string
  street: string
  street2: string
}

export interface Res {
  [key: string]: unknown
}
