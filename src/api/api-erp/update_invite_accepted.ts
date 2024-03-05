import type { AxiosRequestConfig } from 'axios'

import { axiosErp } from './axiosErp'

export function update_invite_accepted(req: Req) {
  return axiosErp<unknown, Res>({
    url: '/wd/update_invite_accepted',
    method: 'POST',
    ...req
  })
}

export type Req = AxiosRequestConfig<Data>
export interface Data {
  email: string
}
export interface Res {
  updated: string
}
