// Axios Imports
import type { AxiosRequestConfig } from 'axios'

import { axiosErp } from './axiosErp'

export function refresh_token(req: AxiosRequestConfig = {}) {
  return axiosErp<unknown, Res>({
    url: '/wd/refresh_token',
    method: 'POST',
    ...req
  })
}

export interface Res {
  access_token: string
  token_exp: number
  user_data: {
    name: string
    full_name: string
    email: string
    country: string
    city: string
    lang: string
    phone: string
    mobile: string
    avatar: string
    join_date: string
    wd_role: number
  }
}
