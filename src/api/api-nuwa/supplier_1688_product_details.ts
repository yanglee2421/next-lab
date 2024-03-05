// Axios Imports
import type { AxiosRequestConfig } from "axios";

import { axiosNuwa } from "./axiosNuwa";

export function supplier_1688_product_details(req: Req) {
  return axiosNuwa<unknown, Res>({
    url: "/supplier/alibaba/product/details",
    ...req,
  });
}

export type Req = AxiosRequestConfig & {
  params: Params;
  headers: Headers;
};

export interface Params {
  offer_id: string | number;
  language: string;
}

export interface Headers {
  "site-connection-id": string | number;
}

export interface Res {
  description: string;
  subject: string;
}
