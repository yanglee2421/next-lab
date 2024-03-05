// Axios Imports
import type { AxiosRequestConfig } from "axios";

import { request } from "./request";

export function shopify_product_search(req: Req) {
  return request<unknown, Res>({
    url: "/connection/shopify/product_search",
    ...req,
  });
}

export type Req = AxiosRequestConfig;
export interface Res {
  products: Product[];
  pagination: Pagination | null;
}

export interface Pagination {
  next?: string;
  previous?: string;
}

export interface Product {
  id: number;
  title: string;
  body_html: string;
  tags: string;
  image: string;
}

export interface Params {
  site_connection_id: number;
  title: string;
  page_limit: number;
  page_info?: string;
  product_id?: string;
  published_status?: number;
  collection_id?: number;
}
