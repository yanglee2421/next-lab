import React from 'react'

import type { BoxProps } from '@mui/material';
import { Box, Grid } from '@mui/material'
import { GridToolbar } from '@mui/x-data-grid'


import { keepPreviousData, useQuery } from '@tanstack/react-query'

import type { Row } from '@/api/api-stg/connection_my_connections'
import { iscAxios } from './iscAxios'
import { ECommerceForm } from './ECommerceForm'
import { SearchForm } from './SearchForm'
import { QueryTable } from './QueryTable'
import { tableColumns } from './tableColumns'
import type { FormValues } from './SearchForm'
import type { Res, Data } from './type'

export function Dashboard(props: DashboardProps) {
  // ** Props
  const { eCommerceShops, ...restProps } = props

  const [page, setPage] = React.useState(1)
  const [page_size, setPageSize] = React.useState(20)

  const [queryParams, setQueryParams] = React.useState<FormValues>({
    category: null,
    min_price: null,
    max_price: null,
    sortColumn: 'list_price',
    sortOrder: 'desc',
    keyword: '',
    attrib_values: []
  })

  const [selection, setSelection] = React.useState<Array<string | number>>([])

  const data = {
    page,
    page_size,
    category_id: queryParams.category || void 0,
    min_price: typeof queryParams.min_price === 'number' ? queryParams.min_price : void 0,
    max_price: typeof queryParams.max_price === 'number' ? queryParams.max_price : void 0,
    order: [`${queryParams.sortColumn} ${queryParams.sortOrder}`],
    keyword: queryParams.keyword,
    attrib_values: queryParams.attrib_values.length ? queryParams.attrib_values : void 0
  }

  const query = useQuery({
    queryKey: ['get_product_list', data],
    queryFn({ signal }) {
      return iscAxios<unknown, Res, Partial<Data>>({
        signal,
        url: '/get_product_list',
        method: 'POST',
        data
      })
    },

    enabled: true,

    placeholderData: keepPreviousData,

    refetchOnWindowFocus: false
  })

  return (
    <Box display={'flex'} flexDirection={'column'} gap={3} {...restProps}>
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <SearchForm
              query={query}
              onFinish={evt => {
                setQueryParams(evt)
              }}
              defaultValues={{
                category: null,
                min_price: null,
                max_price: null,
                sortColumn: 'list_price',
                sortOrder: 'desc',
                keyword: '',
                attrib_values: []
              }}
            ></SearchForm>
          </Grid>
          <Grid item xs={12} sm={6}>
            <ECommerceForm eCommerceShops={eCommerceShops} selection={selection} query={query}></ECommerceForm>
          </Grid>
        </Grid>
      </Box>

      <Box>
        <QueryTable
          query={query}
          columns={tableColumns()}

          // ** Pagination
          paginationMode='server'
          pageSizeOptions={[20, 50, 100]}
          paginationModel={{
            page: page - 1,
            pageSize: page_size
          }}
          onPaginationModelChange={evt => {
            setPage(evt.page + 1)
            setPageSize(evt.pageSize)
          }}

          // ** Slots
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
          disableRowSelectionOnClick
          checkboxSelection
          rowSelectionModel={selection}
          onRowSelectionModelChange={setSelection}
          sx={{ height: 780 }}
        ></QueryTable>
      </Box>
    </Box>
  )
}

export type DashboardProps = BoxProps & {
  eCommerceShops: Row[]
}
