import type { AxiosRequestConfig } from "axios";

import { axiosNuwa } from "./axiosNuwa";

export function sync_selected(req: Req) {
  return axiosNuwa<unknown, Res, Data>({
    url: "/supplier/alibaba/product/sync_selected",
    method: "POST",
    ...req,
  });
}

export interface Data {
  product_ids: number[];
  language: string;
  month_sold_threshold: number;

  is_publish: boolean;
  is_refresh: boolean;

  is_detect_main_images: boolean;
  is_detect_description_images: boolean;
  synced_product_count_per_page: number;
  synced_total_product_count: number;
}

export type Req = AxiosRequestConfig<Data> & {
  headers: {
    "site-connection-id-source": string | number;
    "site-connection-id-target": string | number;
  };
};

export type Res = string;
