// Axios Imports
import type { AxiosRequestConfig } from 'axios'

import { axiosErp } from './axiosErp'

export interface Res {
  country_state_list: State[]
}

export function common_base_country_state(args?: AxiosRequestConfig) {
  const restArgs = args || {}

  return axiosErp<unknown, Res>({
    ...restArgs,
    url: '/wd/common_base_country_state',
    method: 'POST'
  })
}

export interface State {
  id: number
  code: string
  name: string
  country_id: number
}
