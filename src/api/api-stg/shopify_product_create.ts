// Axios Imports
import type { AxiosRequestConfig } from "axios";

import { request } from "./request";

export function shopify_product_create(req: Req) {
  return request<unknown, Res, Data>({
    url: "/connection/shopify/product_create",
    method: "POST",
    ...req,
  });
}

export type Req = AxiosRequestConfig<Data>;
export interface Data {
  title: string;
  tags: string[];
  body_html: string;

  // images: [];
}
export interface Res {
  id: number;
  title: string;
  body_html: string;
  tags: string;
}
