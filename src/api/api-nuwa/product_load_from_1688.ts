import type { AxiosRequestConfig } from "axios";

import { axiosNuwa } from "./axiosNuwa";

export function product_load_from_1688(req: Req) {
  return axiosNuwa<unknown, Res, Data>({
    url: "/supplier/alibaba/product/load",
    method: "POST",
    ...req,
  });
}

export interface Data {
  keyword: string;

  //"begin_page":1,
  //"end_page":40,
  // "language":en,
  month_sold_threshold: number;

  //"product_filter":,
  //"price_start":,
  //"price_end":,
  //"category_ids":[201372301],
  //"is_publish":true,
  is_refresh: boolean;

  //"max_count":365,
  //"start_product_loc":380,
  is_detect_main_images: boolean;
  is_detect_description_images: boolean;
  [key: string]: unknown;
}

export type Req = AxiosRequestConfig<Data> & {
  headers: {
    "site-connection-id-source": string | number;
    "site-connection-id-target": string | number;
  };
};

export type Res = string;
