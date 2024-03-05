import type { AxiosRequestConfig } from 'axios'

import { axiosErp } from './axiosErp'

export function get_invite_unaccepted(req: AxiosRequestConfig) {
  return axiosErp<unknown, Res>({
    method: 'GET',
    url: '/wd/get_invite_unaccepted',
    ...req
  })
}

export interface Res {
  invited_list: ListItem[]
}
export interface ListItem {
  name: string
  email: string
  lang: string
  wd_role: number
  signup_url: string
}
