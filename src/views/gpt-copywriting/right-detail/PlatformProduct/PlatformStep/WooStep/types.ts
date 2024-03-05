// Types Imports
import type { Product } from "@/api/api-stg/woo_product_search";

export interface FormValues {
  product: Product | null;

  role_no: number;
  title: string;
  keywords: string[];
  description: string;
}
