// Axios Imports
import type { AxiosRequestConfig } from "axios";

import { request } from "./request";

export function woo_connect(req: Req) {
  return request<unknown, Res, Data>({
    url: "/connection/woocommerce/connect",
    method: "POST",
    ...req,
  });
}

export interface Data {
  site_url: string;
  consumer_key: string;
  consumer_secret: string;
}

export type Req = AxiosRequestConfig<Data>;
export interface Res {
  [key: string]: never;
}
