import React from 'react'

import type { BoxProps} from '@mui/material';
import { Box, Grid, Paper } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'


import { useImmer } from 'use-immer'

import { toast } from 'react-toastify'

import type { Row } from '@/api/api-stg/connection_my_connections'
import { use1688Products } from '@/hooks/api-nuwa/use1688Products'
import { useSyncAll } from '@/hooks/api-nuwa/useSyncAll'
import { useSyncSelected } from '@/hooks/api-nuwa/useSyncSelected'
import { WoolworldsForm } from './WoolworldsForm'
import { VendorForm } from './VendorForm'
import { Advertise } from '@/shared'
import { tableToolbar } from './tableToolbar'
import { tableColumns } from './tableColumns'
import type { FormValues } from './VendorForm'
import { ErrorAlert } from '@/components/ui'

export function Dashboard(props: DashboardProps) {
  const { vendorShops, woolworldsShops, ...restProps } = props

  const [state, updateState] = useImmer<{
    selection: Array<string | number>
    showOriginalLanguage: boolean
    begin_page: number
    page_size: number
  }>({
    selection: [],
    showOriginalLanguage: false,
    begin_page: 1,
    page_size: 20
  })

  const [queryParams, setQueryParams] = React.useState<FormValues>({
    vendorShop: '',
    language: 'en',
    keyword: '',
    category_id: '',
    product_filter: '',
    out_member_id: '',
    price_start: null,
    price_end: null,
    sortColumn: 'monthSold',
    sortOrder: 'desc'
  })

  const query = use1688Products(queryParams.vendorShop, {
    begin_page: state.begin_page,
    page_size: state.page_size,

    language: queryParams.language,
    keyword: queryParams.keyword,
    category_id: queryParams.category_id || void 0,
    product_filter: queryParams.product_filter || void 0,
    out_member_id: queryParams.out_member_id || void 0,
    price_start: queryParams.price_start || void 0,
    price_end: queryParams.price_end || void 0,
    sort: JSON.stringify({
      [queryParams.sortColumn]: queryParams.sortOrder
    })
  })

  const syncAllMutation = useSyncAll()
  const syncSelectedMutation = useSyncSelected()

  return (
    <Box display={'flex'} flexDirection={'column'} gap={3} height={{ xs: 'auto', sm: '100%' }} {...restProps}>
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <VendorForm
              defaultValues={{
                ...queryParams,
                vendorShop: String(vendorShops.at(0)?.connection_id || '')
              }}
              onFinish={setQueryParams}
              vendorShops={vendorShops}
              showOriginalLanguage={state.showOriginalLanguage}
              iscQuery={query}
            ></VendorForm>
          </Grid>
          <Grid item xs={12} sm={6}>
            <WoolworldsForm
              woolworldsShops={woolworldsShops}
              selection={state.selection}
              hasRow={!!query.data?.data?.length}
              onSyncAll={data => {
                const { site_connection_id_target, ...restData } = data

                syncAllMutation.mutate(
                  {
                    data: {
                      ...restData,
                      ...{
                        begin_page: state.begin_page,
                        page_size: state.page_size,

                        language: queryParams.language,
                        keyword: queryParams.keyword,
                        category_id: queryParams.category_id || void 0,
                        product_filter: queryParams.product_filter || void 0,
                        out_member_id: queryParams.out_member_id || void 0,
                        price_start: queryParams.price_start || void 0,
                        price_end: queryParams.price_end || void 0,
                        sort: JSON.stringify({
                          [queryParams.sortColumn]: queryParams.sortOrder
                        })
                      }
                    },
                    headers: {
                      'site-connection-id-source': queryParams.vendorShop,
                      'site-connection-id-target': site_connection_id_target
                    }
                  },
                  {
                    onError(error) {
                      toast.error(error.message)
                    },
                    onSuccess(data) {
                      toast.success(data)
                    }
                  }
                )
              }}
              onSyncSelected={data => {
                const { site_connection_id_target, ...restData } = data

                syncSelectedMutation.mutate(
                  {
                    data: {
                      ...restData,
                      product_ids: state.selection.map(Number)
                    },
                    headers: {
                      'site-connection-id-source': queryParams.vendorShop,
                      'site-connection-id-target': site_connection_id_target
                    }
                  },
                  {
                    onError(error) {
                      toast.error(error.message)
                    },
                    onSuccess(data) {
                      toast.success(data)
                    }
                  }
                )
              }}
              syncAllPending={syncAllMutation.isPending}
              syncSelectedPending={syncSelectedMutation.isPending}
            ></WoolworldsForm>
          </Grid>
        </Grid>
      </Box>

      <Box flex={1} overflow={'hidden'}>
        {(() => {
          if (query.isPending) {
            return <Advertise></Advertise>
          }

          if (query.isError) {
            return <ErrorAlert titleNode={'Fetch data failed'}>{query.error.message}</ErrorAlert>
          }

          return (
            <Paper
              sx={{
                height: '100%',
                minHeight: 560
              }}
            >
              <DataGrid
                loading={query.isFetching}
                rows={query.data.data || []}
                rowCount={query.data.totalRecords}
                columns={tableColumns({
                  showOriginalLanguage: state.showOriginalLanguage
                })}
                getRowId={item => item.offerId}

                // ** Pagination
                paginationMode='server'
                paginationModel={{
                  page: state.begin_page - 1,
                  pageSize: state.page_size
                }}
                pageSizeOptions={[20, 50]}
                onPaginationModelChange={evt => {
                  updateState(state => {
                    state.begin_page = evt.page + 1
                    state.page_size = evt.pageSize
                  })
                }}

                // ** Slots
                slots={{
                  toolbar: tableToolbar
                }}
                slotProps={{
                  toolbar: {
                    showOriginalLanguage: state.showOriginalLanguage,
                    onOriginalLanguageChange(checked: boolean) {
                      updateState(state => {
                        state.showOriginalLanguage = checked
                      })
                    }
                  }
                }}

                // ** Selection
                checkboxSelection
                disableRowSelectionOnClick
                rowSelectionModel={state.selection}
                onRowSelectionModelChange={evt => {
                  updateState(state => {
                    state.selection = evt
                  })
                }}
              ></DataGrid>
            </Paper>
          )
        })()}
      </Box>
    </Box>
  )
}

export type DashboardProps = BoxProps & {
  vendorShops: Row[]
  woolworldsShops: Row[]
}
