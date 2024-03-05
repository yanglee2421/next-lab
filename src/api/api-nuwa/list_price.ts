// Axios Imports
import type { AxiosRequestConfig } from "axios";

import { axiosNuwa } from "./axiosNuwa";

export function list_price(req: Req) {
  return axiosNuwa<unknown, Res>({
    url: "/list-price",
    method: "GET",
    ...req,
  });
}

export type Req = AxiosRequestConfig & {
  params: Params;
};

export interface Params {
  source_currency: string;
}

export type Res = Record<string, string>;
