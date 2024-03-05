import { axiosErp } from './axiosErp'

export interface Req {
  new_passwd: string
}

export interface Res {
  [key: string]: unknown
}

export function reset_new_password(data: Req) {
  return axiosErp<unknown, Res, Req>({
    url: '/wd/reset_new_password',
    method: 'POST',
    data
  })
}
