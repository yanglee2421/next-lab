import { axiosErp } from './axiosErp'

export interface Req {
  email: string
  name: string
  lang: string
  company_name: string
  company_email: string
}

export interface Res {
  user_id: number
  login: string
}

export function signup_email_activate(data: Req) {
  return axiosErp<unknown, Res, Req>({
    url: '/wd/signup_email_activate',
    method: 'POST',
    data
  })
}
