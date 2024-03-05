export interface FormValues {
  product: Product[];
  desc: string;
  lang: string | null;

  // ** Generate
  isTitle: boolean;
  isDesc: boolean;
  isKeywords: boolean;
  titleLimit: number | null;
  descLimit: number | null;

  words: number | null;
  system: string | null;
  assistant: string | null;
  user: string;
}

export interface Product {
  id: number;
  title: string;
  body_html: string;
  tags: string;
  image: string;
  connection_id?: number;
}
