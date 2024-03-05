import type { AxiosRequestConfig } from 'axios'

import { axiosNlp } from './axios-nlp'

export function gpt_active_task_info(req: AxiosRequestConfig) {
  return axiosNlp<unknown, Res>({
    url: '/gpt/active_task_info',
    ...req
  })
}

export type Res = Task[]

export interface Task {
  client_task_id: string
  task_id: string
  task_status: string
  task_progress: number
  task_label: string
  role_no: number
  start_time: string
  end_time: null
  exception: null
}
