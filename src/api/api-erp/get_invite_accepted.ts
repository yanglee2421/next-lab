import type { AxiosRequestConfig } from 'axios'

import { axiosErp } from './axiosErp'

export function get_invite_accepted(req: AxiosRequestConfig) {
  return axiosErp<unknown, Res>({
    url: '/wd/get_invite_accepted',
    method: 'GET',
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
}
