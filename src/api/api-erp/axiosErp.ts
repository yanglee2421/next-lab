// Axios Imports
import type { AxiosError } from 'axios';
import axios from 'axios'

// Utils Imports
import { addJsonWebToken } from '@/utils'

export const axiosErp = axios.create({
  baseURL: process.env.NEXT_PUBLIC_WARP_BASEURL,
  timeout: 1000 * 60
})

axiosErp.interceptors.request.use(config => {
  // ** JWT
  addJsonWebToken(config)

  return config
})
axiosErp.interceptors.response.use(
  res => {
    // ** Blob
    if (res.data instanceof Blob) {
      return new File(
        [res.data],
        String(res.headers['content-disposition']).replace('attachment; filename="', '').replace('"', ''),
        { type: res.headers['content-type'] }
      )
    }

    // ** JSON
    if (Number(res.data.code) !== 0) {
      throw new Error(res.data.message)
    }

    if (res.data.data) {
      return res.data.data
    }
  },
  (error: AxiosError) => {
    console.error(error)

    if (!error.response) {
      throw new Error(error.message)
    }

    const detail = Reflect.get(Object(error.response.data), 'detail')

    if (typeof detail === 'string') {
      throw new Error(detail)
    }

    throw new Error(detail.exception)
  }
)
