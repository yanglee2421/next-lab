import type { AxiosRequestConfig } from 'axios'

import { axiosErp } from './axiosErp'

export function validate_jwt_token(req: Req) {
  return axiosErp<unknown, Res>({
    url: '/wd/validate_jwt_token',
    method: 'GET',
    ...req
  })
}

export type Req = AxiosRequestConfig

export interface Res {
  user_data: {
    name: string
    full_name: string
    email: string
    country: string
    city: string
    lang: string
    phone: null | number
    mobile: null | number
    avatar: string
    join_date: string
    tz: string
    wd_company_id: number
    wd_role: number
  }
}
