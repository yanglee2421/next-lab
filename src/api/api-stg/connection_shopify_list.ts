// Axios Imports
import type { AxiosRequestConfig } from "axios";

import { request } from "./request";

export function connection_shopify_list(req: Req) {
  return request<unknown, Res>({
    url: "/connection/shopify/collection_listing",
    ...req,
  });
}

export interface Req extends AxiosRequestConfig {
  params: Params;
}

export interface Params {
  site_connection_id: number;
}

export interface Res {
  collections: Collections[];
}

export interface Collections {
  collection_id: number;
  collection_title: string;
}
