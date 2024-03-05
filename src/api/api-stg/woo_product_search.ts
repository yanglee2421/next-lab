// Axios Imports
import type { AxiosRequestConfig } from "axios";

import { request } from "./request";

export function woo_product_search(req: Req) {
  return request<unknown, Res>({
    url: "/connection/woocommerce/product_search",
    ...req,
  });
}

export type Req = AxiosRequestConfig;

export interface Res {
  products: Product[];
  total_pages: number;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  tags: Tag[];
  images: Image[];
}

export interface Image {
  id: number;
  src: string;
}

export interface Tag {
  id: number;
  name: string;
  slug: string;
}
