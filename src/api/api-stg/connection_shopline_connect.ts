// Axios Imports
import type { AxiosRequestConfig } from "axios";

import { request } from "./request";

export function connection_shopline_connect(req: Req) {
  return request<unknown, Res, Data>({
    url: "/connection/shopline/connect",
    method: "POST",
    ...req,
  });
}

export type Req = AxiosRequestConfig<Data>

interface Data {
  site_url: string;
  scopes: number[];
}

export interface Res {
  auth_url: string;
  connect_dt: string;
  connection_id: number;
  connection_status: number;
  scopes: number[];
  site_domain: string | null;
  site_id: string | null;
  site_info_id: number;
  site_name: string | null;
  site_type: number;
  site_url: string;
}
