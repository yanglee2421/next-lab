// Axios Imports
import type { AxiosRequestConfig } from 'axios'

import { axiosErp } from './axiosErp'

export interface Country {
  id: number
  code: string
  name: string
}

export interface Res {
  country_list: Country[]
}

export function common_base_country(args?: AxiosRequestConfig) {
  const restArgs = args || {}

  return axiosErp<unknown, Res>({
    ...restArgs,
    url: '/wd/common_base_country',
    method: 'POST'
  })
}
