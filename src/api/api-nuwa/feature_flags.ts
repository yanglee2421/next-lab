// Axios Imports
import type { AxiosRequestConfig } from "axios";

import { axiosNuwa } from "./axiosNuwa";

export function feature_flags(req: Req) {
  return axiosNuwa<unknown, Res>({
    url: "/product/feature_flags",
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
}

export type Res = Record<string, FeatureItem[]>;

export interface FeatureItem {
  feature: string;
  data: Record<string, number>;
}
