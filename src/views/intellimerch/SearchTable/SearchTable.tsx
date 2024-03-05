import type { DataGridProps } from '@mui/x-data-grid'

import type { PageState } from '../ProductOptimisation'
import { ShopifyTable } from './ShopifyTable'
import { ShoplineTable } from './ShoplineTable'
import { WooTable } from './WooTable'
import { Advertise } from '@/shared'

export function SearchTable(props: Props) {
  const { pageState, ...restProps } = props

  switch (pageState.siteType) {
    case 1:
      return <ShopifyTable pageState={pageState} {...restProps} />
    case 2:
      return <WooTable pageState={pageState} {...restProps} />
    case 3:
      return <ShoplineTable pageState={pageState} {...restProps} />
    default:
      return <Advertise />
  }
}

type Props = Omit<DataGridProps, 'rows' | 'columns' | 'onRowSelectionModelChange'> & {
  onRowSelectionModelChange(evt: Array<SelectionItem>): void
  pageState: PageState
}
export interface SelectionItem {
  id: string | number
  description: string
  title: string
  keywords: string[]
}
