// Types Imports
import type { BlogCollectioin } from "@/api/api-stg/shopify_blog_collection";

export interface FormValues {
  blog: BlogCollectioin | null;

  handle: string;
  author: string;
  image: string;
  published: boolean;

  title: string;
  tags: string[];
  content_html: string;
}
