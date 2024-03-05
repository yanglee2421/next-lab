import type { AxiosRequestConfig } from 'axios'

import { axiosErp } from './axiosErp'

export function create_help_ticket(req: Req) {
  return axiosErp<unknown, Res>({
    url: '/wd/create_help_ticket',
    method: 'POST',
    ...req
  })
}

export type Req = AxiosRequestConfig<Data>
export interface Data {
  subject: string
  description: string
  email: string
  name: string
}
export interface Res {
  stage_name: string
  ticket_id: number
}
