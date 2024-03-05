import type { Row } from "@/api/api-stg/connection_my_connections";

export interface FormValues {
  store: Row | null;
  blog: Blog | null;
  author: string;
  image: string;
  published: boolean;

  role_no: number;
  title: string;
  keywords: string[];
  description: string;
}

export interface Blog {
  id: string;
  title: string;
}
