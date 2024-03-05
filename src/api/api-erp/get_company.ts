// Axios Imports
import type { AxiosRequestConfig } from 'axios'

import { axiosErp } from './axiosErp'

export function get_company(req: AxiosRequestConfig) {
  return axiosErp<unknown, Res>({
    method: 'POST',
    url: '/wd/get_company',
    ...req
  })
}

export interface Res {
  city: string
  country_id: number | null
  email: string
  id: number
  image_1920: string | null
  lang: string
  mobile: string
  name: string
  phone: string
  state_id: number | null
  street: string
  street2: string
  vat: string
  website: string
  zip: string
}
