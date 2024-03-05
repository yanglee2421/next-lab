// Types Imports
import type { Blog } from "@/api/api-stg/shopline_blog_collection";

export interface FormValues {
  blog: Blog | null;

  author: string;
  image_link?: string;
  published: boolean;

  title: string;
  tags: string[];
  content_html: string;
}
