import type { AxiosRequestConfig } from 'axios'

import { axiosErp } from './axiosErp'

export interface Res {
  id: number
  name: null
  full_name: null
  email: null
  country_id: null
  state_id: null
  city: null
  street: null
  street2: null
  zip: null
  lang: string
  phone: null
  mobile: null
}

export function usr_get_invoice_address(args: AxiosRequestConfig = {}) {
  return axiosErp<unknown, Res>({
    url: '/wd/user/get_invoice_address',
    method: 'POST',
    ...args
  })
}
