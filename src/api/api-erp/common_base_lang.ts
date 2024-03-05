// Axios Imports
import type { AxiosRequestConfig } from 'axios'

import { axiosErp } from './axiosErp'

export interface lang {
  id: number
  code: string
  name: string
}

export interface Res {
  lang_list: lang[]
}

export function common_base_lang(args?: AxiosRequestConfig) {
  const restArgs = args || {}

  return axiosErp<unknown, Res>({
    ...restArgs,
    url: '/wd/common_base_lang',
    method: 'POST'
  })
}
