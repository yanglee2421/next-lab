import type { AxiosRequestConfig } from 'axios'

import { axiosNlp } from './axios-nlp'

export function gpt_task(req: Req) {
  return axiosNlp<unknown, Res>({
    url: '/gpt/task',
    ...req
  })
}

export interface Req extends AxiosRequestConfig {
  params: Params
}

export interface Res {
  input: {
    site_info_id: number
    client_task_id: null
    site_connection_id: null
    description: string
    title: string
    short_description: string
    keywords: string[]
    product_id: null
    role_no: number
    start_time: string
    description_words_num: number
    title_words_num: number
    short_description_num: number
    keywords_num: number
    language: string
  }
  output: {
    description: string
    title: string
    short_description: string
    keywords: string[]
    product_id: null
    role_no: number
    total_words: number
    start_time: string
    end_time: string
    exception: null
  }
}

export interface Params {
  task_id: string
}
