// Axios Imports
import type { AxiosRequestConfig } from "axios";

import { request } from "./request";

// Type Imports
import type { Row } from "./connection_my_connections";

export function connection_update(req: Req) {
  return request<unknown, Res, Data>({
    method: "POST",
    url: "/connection/update_connection",
    ...req,
  });
}

export type Res = string | Row;

export type Req = AxiosRequestConfig<Data>;

export interface Data {
  shop_alias?: string;
  scopes?: number[];
}
