// Axios Imports
import type { AxiosRequestConfig } from "axios";

import { request } from "./request";

export function shopline_product_search(req: Req) {
  return request<unknown, Res>({
    url: "/connection/shopline/product_search",
    ...req,
  });
}

export type Req = AxiosRequestConfig;

export interface Res {
  products: Product[];
  pagination: Pagination | null;
}

export interface Product {
  image: string | null;
  body_html: string | null;
  title: string;
  tags: string | null;
  id: string;
}

export interface Pagination {
  next?: string;
  previous?: string;
}

export interface Params {
  site_connection_id: number | string;
  page_limit: number;
  title?: string;
  collection_id?: number;
  page_info?: string;
}
