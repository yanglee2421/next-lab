export interface FormValues {
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
