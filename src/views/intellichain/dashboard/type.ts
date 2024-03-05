export interface Res {
  total: number
  product_list: Product[]
}

export interface Product {
  id: number
  name: string
  main_image_url: string
  list_price: number
  min_order_qty: number
  create_date: string
  website_sequence: number
  variant_count: number
  website_url: string
}

export interface Data {
  page_size: number
  page: number
  category_id: number
  min_price: number
  max_price: number
  order: string[]
  keyword: string
  attrib_values: Array<[number, number]>
}
