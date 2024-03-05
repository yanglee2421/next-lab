import { axiosErp } from './axiosErp'

export function reset_password(data: Req) {
  return axiosErp<unknown, void>({
    method: 'POST',
    url: '/wd/reset_password_by_email',
    data
  })
}

export type Req = {
  email: string
}
