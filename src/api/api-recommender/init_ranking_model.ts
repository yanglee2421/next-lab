// Axios Imports
import type { AxiosRequestConfig } from "axios";

import { axiosRecommender } from "./axiosRecommender";

export function init_ranking_model(req: Req) {
  return axiosRecommender<unknown, Res>({
    url: "/recommender/init_ranking_model",
    ...req,
  });
}

export type Req = AxiosRequestConfig & {
  headers: Headers;
};

export interface Headers {
  "site-connection-id": number | string;
}

export interface Res {}
