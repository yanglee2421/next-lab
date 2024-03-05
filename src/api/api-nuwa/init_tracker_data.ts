// Axios Imports
import type { AxiosRequestConfig } from "axios";

import { axiosNuwa } from "./axiosNuwa";

export function init_tracker_data(req: Req) {
  return axiosNuwa<unknown, Res>({
    url: "/posthog/init_tracker_data",
    ...req,
  });
}

export type Req = AxiosRequestConfig & {
  headers: Headers;
  params: Params;
};

export interface Params {
  project_id: number | string;
}

export interface Headers {
  "site-connection-id": number | string;
}

export interface Res {}
