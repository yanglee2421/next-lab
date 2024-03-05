// Axios Imports
import type { AxiosRequestConfig } from "axios";

import { axiosPosthog } from "./axios-posthog";

export function insights_trend(req: Req, { project_id }: PathParams) {
  return axiosPosthog<unknown, Res>({
    url: `/projects/${project_id}/insights/trend/`,
    ...req,
  });
}

export interface PathParams {
  project_id: number;
  baseURL: string;
}

export interface Req extends AxiosRequestConfig {
  params: Params;
}

export interface Params {
  date_to?: string;
  date_from: string;
  interval: string;

  client_query_id: string;
  compare: string;
  display: string;
  entity_type: string;
  events: string;
  insight: string;
  session_id: string;
  refresh?: boolean;
}

export interface Event {
  id: string;
  math: string;
  name: string;
  order: number;
  type: string;
  properties?: Property[];
}

export interface Property {
  key: string;
  operator: string;
  type: string;
  value: string;
}
export interface Res {
  is_cached: boolean;
  last_refresh: string;
  next: string | null;
  timezone: string;
  result: Result[];
}

export interface Result {
  label: string;
  count: number;
  data: number[];
  labels: string[];
  action: Action;
}

export interface Action {
  id: string;
}
