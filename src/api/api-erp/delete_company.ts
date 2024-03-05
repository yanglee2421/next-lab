import { axiosErp } from './axiosErp'

export function delete_company() {
  return axiosErp({
    url: '/wd/delete_company',
    method: 'POST'
  })
}
