import type { AxiosRequestConfig } from 'axios'

import { axiosNlp } from './axios-nlp'

export function gpt_assistant(req: Req) {
  return axiosNlp<unknown, Res, Data>({
    url: '/gpt/assistant',
    method: 'POST',
    ...req
  })
}

export type Req = AxiosRequestConfig<Data>

export interface Data {
  client_task_id: string

  // site_info_id: number;
  system: string | null
  assistant: string | null
  user: string
}

export interface Res {
  client_task_id: string | null
  task_id: string
  task_status: string
  task_progress: number
  task_label: string
  role_no: number
  start_time: string
  end_time: null
  exception: null
}
