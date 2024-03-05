// Axios Imports
import type { AxiosRequestConfig } from "axios";

import { axiosPosthog } from "./axios-posthog";

export function posthog_query(req: Req, pathParams: PathParams) {
  const { project_id } = pathParams;

  return axiosPosthog<unknown, Res, Data>({
    url: `/projects/${project_id}/query/`,
    method: "POST",
    ...req,
  });
}

export interface PathParams {
  project_id: number;
  baseURL: string;
}

export type Req = AxiosRequestConfig<Data>;

export interface Data {
  query: Query;
  refresh: boolean;
  client_query_id: string;
}

export interface Query {
  before?: string;
  after?: string;
  kind: string;
  select: string[];
  event: string;
  properties?: Property[];
}

export interface Property {
  key: string;
  value: string;
  operator: string;
  type: string;
}

export interface Res {
  columns: string[];
  hasMore: boolean;
  hogql: string;
  results: Result[];
}

export type Result = [Event, string, Person, string, string, string];

export interface Event {
  uuid: string;
  event: string;
}

export interface Person {
  uuid: string;
  distinct_id: string;
}
