import type { Row } from "@/api/api-stg/connection_my_connections";

export interface FormValues {
  store: Row | null;
  product: Product | null;
  role_no: number;
  title: string;
  keywords: string[];
  description: string;
}

export interface Product {
  id: number;
  title: string;
  body_html: string;
  tags: string;
  image: string;
}
