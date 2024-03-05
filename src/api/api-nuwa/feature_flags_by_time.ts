// Axios Imports
import type { AxiosRequestConfig } from "axios";

import { axiosNuwa } from "./axiosNuwa";

export function feature_flags_by_time(req: Req) {
  return axiosNuwa<unknown, Res>({
    url: "/product/feature_flags_by_time",
    method: "GET",
    ...req,
  });
}

export type Req = AxiosRequestConfig & {
  params: Params;
  headers: {
    "site-connection-id": string | number;
  };
};

export interface Params {
  days: string | number;
  interval: string;
}

export type Res = Row[];

export interface Row {
  time: string;
  data: Record<string, FeatureItem[]>;
}

export interface FeatureItem {
  feature: string;
  data: Record<string, number>;
}
