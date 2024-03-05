import { axiosErp } from './axiosErp'

export interface Req {
  name: string | null
  street: string | null
  street2: string | null
  city: string | null
  state_id: number | null
  country_id: number | null
  zip: string | null
  vat: string | null
  email: string | null
  website: string | null
  phone: string | null
  mobile: string | null
  lang: string | null
  customer_rank: number | null
  image_1920: string | null
  platform_type_id: number | null
  shop_code: string | null
  shop_name: string | null
}

export interface Res {
  [key: string]: unknown
}

export function usr_update(data: Req) {
  return axiosErp<unknown, Res, Req>({
    url: '/wd/user/update',
    method: 'POST',
    data
  })
}
