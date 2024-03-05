import type { AxiosRequestConfig } from 'axios'

import { request } from './request'

export function connection_my_connections(req: Req) {
  return request<unknown, Res>({
    ...req,
    url: '/connection/my_connections'
  })
}

export type Req = AxiosRequestConfig & {
  params: Params
}

export interface Params {
  is_list_all: boolean

  /**
   * @field
   * 1: eCommerce Shops;
   * 2: ISC shops;
   * 3: ISC Vendor Shops;
   * 4: all possible vendors including 1 & 3;
   */
  site_type: number
}

export type Res = Row[]

export interface Row {
  approved_services: number[] | null
  auth_url: string

  connect_dt: string
  connection_id: number
  connection_status: number

  data_server_project_api_key: string | null
  data_server_project_id: string
  data_server_query_api_key: string
  data_server_url: string | null

  recommender_api_key: string

  scopes: number[]
  shop_alias: string | null

  site_domain: string | null
  site_id: string | null
  site_info_id: number
  site_name: string | null
  site_type: number
  site_url: string
}
