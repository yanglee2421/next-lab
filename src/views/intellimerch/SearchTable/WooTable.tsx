import React from 'react'

import type { DataGridProps } from '@mui/x-data-grid'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import { Paper } from '@mui/material'

import type { SelectionItem } from './SearchTable'
import type { PageState } from '../ProductOptimisation'
import { useWooProductSearch } from '@/hooks/api-stg/useWooProductSearch'
import { ErrorAlert } from '@components/ui/ErrorAlert'
import { SkeletonCard } from '@components/ui/SkeletonCard'

export function WooTable(props: Props) {
  const { pageState, onRowSelectionModelChange, ...restProps } = props

  const query = useWooProductSearch({
    site_connection_id: Number(pageState.siteConnectionId),
    title: '',
    page: 0,
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
        columns={[{ field: 'name', type: 'string', flex: 1 }]}
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
                  description: item.description,
                  title: item.name,
                  keywords: item.tags.map(item => item.name)
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
