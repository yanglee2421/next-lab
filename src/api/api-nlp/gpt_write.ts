import type { AxiosRequestConfig } from 'axios'

import { axiosNlp } from './axios-nlp'

export function gpt_write(req: Req) {
  return axiosNlp<unknown, Res, Data>({
    url: '/gpt/write',
    method: 'POST',
    ...req
  })
}

export type Req = AxiosRequestConfig<Data>

export type Res = Task[]

export interface Task {
  client_task_id: null
  task_id: string
  task_status: string
  task_progress: number
  task_label: string
  role_no: number
  start_time: string
  end_time: null
  exception: null
}

export type Data = DataItem[]

export interface DataItem {
  client_task_id: string
  site_info_id?: number
  role_no: number

  description_words_num?: number
  title_words_num?: number
  keywords_num?: number
  connection_id?: number

  description: string
  title: string
  keywords: string[]

  language: string | null
}
