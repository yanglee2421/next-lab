// Axios Imports
import type { AxiosRequestConfig } from "axios";

import { request } from "./request";

export function connection_shopline_collection_listing(req: Req) {
  return request<unknown, Res>({
    url: "/connection/shopline/collection_listing",
    ...req,
  });
}

export interface Req extends AxiosRequestConfig {
  params: {
    site_connection_id: number;
  };
}

export interface Res {
  collections: Collection[];
}

export interface Collection {
  handle: string;
  id: string;
  title: string;
}
