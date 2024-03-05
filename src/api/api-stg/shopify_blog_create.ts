import type { AxiosRequestConfig } from "axios";

import { request } from "./request";

export function shopify_blog_create(req: Req) {
  return request<unknown, Res, Data>({
    url: "/connection/shopify/blog_create",
    method: "POST",
    ...req,
  });
}

export interface Data {
  blog_id: number;
  title: string;
  handle: string;
  author: string;
  tags: string;
  content_html: string;
  image: string;
  published: boolean;
}

export type Req = AxiosRequestConfig<Data>;
export interface Res {
  [key: symbol]: never;
}
