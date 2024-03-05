// Axios Imports
import type { AxiosRequestConfig } from 'axios'

import { axiosErp } from './axiosErp'

export function usr_get_details(req: AxiosRequestConfig) {
  return axiosErp<unknown, Res>({
    url: '/wd/user/get_details',
    method: 'POST',
    ...req
  })
}

export interface Res {
  city: string | null
  country_id: number | null
  create_date: string | null
  email: string | null
  full_name: string | null
  image_1920: string | null
  lang: string | null
  mobile: string | null
  name: string | null
  phone: string | null
  platform_type_id: number | null
  shop_code: string | null
  shop_name: string | null
  state_id: number | null
  street: string | null
  street2: string | null
  vat: string | null
  website: string | null
  zip: string | null
}
