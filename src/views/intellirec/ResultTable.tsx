'use client'

// MUI Imports
import RouterLink from 'next/link'

import { Card, CardHeader, CardContent, Link } from '@mui/material'
import type { GridColDef} from '@mui/x-data-grid';
import { DataGrid, GridToolbar } from '@mui/x-data-grid'

// NextJs Imports

// API Imports
import type { Result } from '@/api/posthog/insights_trend'
import type { Row } from '@/api/api-stg/connection_my_connections'

export function ResultTable(props: ResultTableProps) {
  // ** Props
  const { rows, store, ...restProps } = props

  return (
    <Card {...restProps}>
      <CardHeader title='Detailed results'></CardHeader>
      <CardContent>
        <DataGrid
          columns={columns(store)}
          rows={rows}
          getRowId={item => JSON.stringify(item.action)}
          autoHeight
          hideFooterPagination
          disableRowSelectionOnClick
          slots={{
            toolbar: GridToolbar
          }}
        ></DataGrid>
      </CardContent>
    </Card>
  )
}

export interface ResultTableProps {
  rows: Result[]
  store: Row
}

function columns(store: Row): GridColDef<Result>[] {
  return [
    {
      field: 'label',
      type: 'string',
      flex: 1,
      headerName: 'SERIES',
      headerAlign: 'left',
      align: 'left',
      sortable: false,
      renderCell(params) {
        return (
          <Link
            component={RouterLink}
            href={{
              pathname: '/intellirec/events',
              query: {
                event: params.value,
                connection_id: store.connection_id
              }
            }}
            underline='always'
            sx={{
              textDecorationLine: 'underline',
              textDecorationStyle: 'solid'
            }}
          >
            {params.value}
          </Link>
        )
      }
    },
    {
      field: 'count',
      type: 'string',
      flex: 1,
      headerName: 'TOTAL SUM',
      headerAlign: 'left',
      align: 'left',
      sortable: false
    }
  ]
}
