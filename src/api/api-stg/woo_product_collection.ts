// Axios Imports
import type { AxiosRequestConfig } from "axios";

import { request } from "./request";

export function woo_product_collection(req: Req) {
  return request<unknown, Res>({
    url: "/connection/woocommerce/collection_listing",
    ...req,
  });
}

export type Req = AxiosRequestConfig;
export type Res = Collection[];

export interface Collection {
  id: number;
  name: string;
}
