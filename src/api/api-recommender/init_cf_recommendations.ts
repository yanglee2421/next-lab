// Axios Imports
import type { AxiosRequestConfig } from "axios";

import { axiosRecommender } from "./axiosRecommender";

export function init_cf_recommendations(req: Req) {
  return axiosRecommender<unknown, Res>({
    url: "/recommender/init_cf_recommendations",
    ...req,
  });
}

export type Req = AxiosRequestConfig & {
  headers: Headers;
  params: Params;
};

export interface Headers {
  "site-connection-id": number | string;
}

export interface Params {
  top_k: number | string;
}

export interface Res {}
