'use client'

import React from 'react'

import { useSearchParams } from 'next/navigation'

import { Alert, AlertTitle, Link, Paper, Stack, Tooltip, Typography } from '@mui/material'
import type { GridColDef } from '@mui/x-data-grid'
import { DataGrid } from '@mui/x-data-grid'
import { RefreshOutlined } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'

import { usePosthogQuery } from '@/hooks/api-posthog'
import { platformQueryMap } from '@/api/posthog'
import type { Row } from '@/api/api-stg/connection_my_connections'
import { toTimeAgo } from '@/utils'
import { DateSelectForTable } from './DateSelectForTable'
import { toolbar } from './toolbar'
import { Introduction } from './Introduction'
import { SkeletonCard } from '@/components/ui'

export function EventTable(props: Props) {
  const { store } = props

  const searchParams = useSearchParams()

  const [date, setDate] = React.useState(() => {
    return JSON.stringify({
      after: 'dStart'
    })
  })

  const event = searchParams.get('event')
  const eventQuery = platformQueryMap.get(store.site_type)?.get(event || '')

  const query = usePosthogQuery(
    {
      query: {
        ...toJsonParse(date),
        event: eventQuery?.id,
        properties: eventQuery?.properties,
        kind: 'EventsQuery',
        select: [
          '*',
          'event',
          'person',
          'coalesce(properties.$current_url, properties.$screen_name) -- Url / Screen',
          'properties.$lib',
          'timestamp'
        ]
      },
      client_query_id: '',
      refresh: true
    },
    {
      project_id: Number(store.data_server_project_id),
      baseURL: store.data_server_url ? `https://${store.data_server_url}/api` : 'https://app.posthog.com/api'
    },
    store.data_server_query_api_key
  )

  if (!eventQuery) {
    return <Introduction></Introduction>
  }

  if (query.isPending) {
    return <SkeletonCard></SkeletonCard>
  }

  if (query.isError) {
    return (
      <Alert>
        <AlertTitle>Fetch data failed</AlertTitle>
        {query.error.message}
      </Alert>
    )
  }

  return (
    <>
      <Paper sx={{ padding: 3 }}>
        <Typography variant='h5'>{event}</Typography>
        <Stack direction={'row'} spacing={3} marginTop={3}>
          <DateSelectForTable
            value={date}
            onChange={evt => {
              setDate(String(evt.target.value))
            }}
          ></DateSelectForTable>
          <LoadingButton
            onClick={() => query.refetch()}
            variant='contained'
            loading={query.isRefetching}
            startIcon={<RefreshOutlined />}
          >
            reload
          </LoadingButton>
        </Stack>
      </Paper>

      <Paper sx={{ flex: 1, overflow: 'hidden' }}>
        <DataGrid
          loading={query.isFetching}
          columns={columns()}
          rows={query.data.pages
            .flatMap(item => item.results)
            .map(item => {
              return {
                uuid: item[0].uuid,
                event: item[1],
                person: item[2].distinct_id,
                url: item[3],
                library: item[4],
                time: item[5]
              }
            })}
          getRowId={item => item.uuid}

          // ** Features
          disableRowSelectionOnClick

          // ** Sort
          slots={{ toolbar }}
          slotProps={{
            toolbar: {
              loading: query.isFetchingNextPage,
              hasNextPage: query.hasNextPage,
              onClick() {
                query.fetchNextPage()
              }
            }
          }}
        ></DataGrid>
      </Paper>
    </>
  )
}

type Props = {
  store: Row
}

function columns(): GridColDef<{
  uuid: string
  event: string
  url: string
}>[] {
  return [
    {
      field: 'event',
      type: 'string',
      headerName: 'EVENT',
      flex: 1,
      minWidth: 160,
      maxWidth: 240,
      sortable: false
    },
    {
      field: 'person',
      type: 'string',
      headerName: 'PERSON',
      flex: 1,
      sortable: false
    },
    {
      field: 'url',
      type: 'string',
      headerName: 'URL',
      flex: 1,
      sortable: false,
      renderCell(params) {
        return (
          <Tooltip title={params.value}>
            <Link href={params.value} underline='always' sx={{ textDecorationLine: 'underline' }}>
              {new URL(params.value).pathname}
            </Link>
          </Tooltip>
        )
      }
    },
    {
      field: 'library',
      type: 'string',
      headerName: 'LIBRARY',
      flex: 1,
      minWidth: 80,
      maxWidth: 120,
      sortable: false
    },
    {
      field: 'time',
      type: 'string',
      headerName: 'TIME',
      flex: 1,
      minWidth: 120,
      maxWidth: 160,
      sortable: false,
      renderCell(params) {
        return (
          <Tooltip title={new Date(params.value).toLocaleString()}>
            <span>{toTimeAgo(params.value)}</span>
          </Tooltip>
        )
      }
    }
  ]
}

function toJsonParse(json: string) {
  try {
    return JSON.parse(json)
  } catch (error) {
    return {}
  }
}
