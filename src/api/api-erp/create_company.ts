import { axiosErp } from './axiosErp'

export interface Req {
  email: string | null
  name: string | null
  street: string | null
  street2: string | null
  city: string | null
  state_id: number | null
  country_id: number | null
  zip: string | null
  vat: string | null
  website: string | null
  phone: string | null
  mobile: string | null
  lang: string | null
  image_1920: null | string
}

export interface Res {
  company_partner_id: number
}

export function create_company(data: Req) {
  return axiosErp<unknown, Res, Req>({
    url: '/wd/create_company',
    method: 'POST',
    data
  })
}
