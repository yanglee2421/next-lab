// Axios Imports
import type { AxiosRequestConfig } from "axios";

import { axiosNuwa } from "./axiosNuwa";

export function supplier_1688_product_keyword(req: Req) {
  return axiosNuwa<unknown, Res>({
    url: "/supplier/alibaba/product/keyword",
    ...req,
  });
}

export type Req = AxiosRequestConfig & {
  headers: Headers;
  params: Params;
};

export interface Headers {
  "site-connection-id": string | number;
}

export interface Params {
  keyword: string;
  begin_page: number;
  page_size: number;
  language: string;
  sort: string;
  category_id?: string | number;
  price_start?: string | number;
  price_end?: string | number;
  out_member_id?: string | number;
  product_filter?: string | number;
}

export type Sort = Record<string, string | null | void>;

export interface Res {
  totalRecords: number;
  totalPage: number;
  pageSize: number;
  currentPage: number;
  data?: Product[];
}

export interface Product {
  imageUrl: string;
  subject: string;
  subjectTrans: string;
  offerId: number;
  isJxhy: boolean;
  priceInfo: {
    price: string;
  };
  repurchaseRate: string;
  monthSold: number;
  traceInfo: string;
  isOnePsale: boolean;
  sellerIdentities: string[];
}
