import React from 'react'

import type { DataGridProps } from '@mui/x-data-grid'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import { Paper } from '@mui/material'

import type { SelectionItem } from './SearchTable'
import type { PageState } from '../ProductOptimisation'
import { useShoplineProductSearch } from '@/hooks/api-stg/useShoplineProductSearch'
import { SkeletonCard } from '@components/ui/SkeletonCard'
import { ErrorAlert } from '@components/ui/ErrorAlert'

export function ShoplineTable(props: Props) {
  const { pageState, onRowSelectionModelChange, ...restProps } = props

  const query = useShoplineProductSearch({
    site_connection_id: pageState.siteConnectionId,
    page_limit: 20
  })

  if (query.isPending) {
    return <SkeletonCard />
  }

  if (query.isError) {
    return <ErrorAlert>{query.error.message}</ErrorAlert>
  }

  return (
    <Paper sx={{ height: '100%' }}>
      <DataGrid
        columns={[{ field: 'title', type: 'string', flex: 1 }]}
        rows={query.data.products}
        slots={{
          toolbar: GridToolbar
        }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            sx: {
              userSelect: 'none'
            }
          }
        }}
        onRowSelectionModelChange={evt => {
          onRowSelectionModelChange(
            evt.reduce<SelectionItem[]>((selections, id) => {
              const item = query.data.products.find(product => {
                return Object.is(product.id, id)
              })

              if (item) {
                selections.push({
                  id,
                  description: item.body_html || '',
                  title: item.title,
                  keywords: item.tags?.split(',') || []
                })
              }

              return selections
            }, [])
          )
        }}
        {...restProps}
      ></DataGrid>
    </Paper>
  )
}

type Props = Omit<DataGridProps, 'rows' | 'columns' | 'onRowSelectionModelChange'> & {
  onRowSelectionModelChange(evt: Array<SelectionItem>): void
  pageState: PageState
}
