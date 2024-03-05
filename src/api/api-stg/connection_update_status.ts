// Axios Imports
import type { AxiosRequestConfig } from "axios";

import { request } from "./request";

export function connection_update_status(req: Req) {
  return request<unknown, Res, Data>({
    method: "POST",
    url: "/connection/update_status",
    ...req,
  });
}

export type Req = AxiosRequestConfig<Data>;

export interface Data {
  status?: number;
}

export interface Res {
  status: number;
}
