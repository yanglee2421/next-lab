'use client'

import React from 'react'

import { useRouter, useSearchParams } from 'next/navigation'

import { Alert, Box, Select, AlertTitle, MenuItem } from '@mui/material'

import { CardTop, Introduction } from '@/views/intellirec'
import { EventTable } from '@views/intellirec/EventTable'
import { SkeletonCard } from '@/components/ui'

import { useMyConnections } from '@/hooks/api-stg'

export default function EventPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const query = useMyConnections({
    is_list_all: false,
    site_type: 1
  })

  const filteredStores = query.data?.filter(item => {
    return [
      item.approved_services?.includes(2),
      item.scopes.includes(2),
      item.data_server_project_api_key,
      item.data_server_project_id,
      item.data_server_query_api_key,
      typeof item.data_server_project_api_key === 'string',
      typeof item.data_server_project_id === 'string',
      typeof item.data_server_query_api_key === 'string'
    ].every(Boolean)
  })

  const fallbackId = filteredStores?.at(0)?.connection_id
  const connection_id = searchParams.get('connection_id')

  const store = filteredStores?.find(item => {
    return String(item.connection_id) === connection_id
  })

  React.useEffect(() => {
    if (store?.connection_id) {
      return
    }

    if (!fallbackId) {
      return
    }

    router.replace(
      (() => {
        const url = new URL(window.location.href)

        url.searchParams.set('connection_id', String(store?.connection_id || fallbackId))

        return url.href
      })()
    )
  }, [store?.connection_id, fallbackId, router])

  if (query.isPending) {
    return <SkeletonCard></SkeletonCard>
  }

  if (query.isError) {
    return (
      <Alert severity='error'>
        <AlertTitle>Fetch stores failed</AlertTitle>
        {query.error.message}
      </Alert>
    )
  }

  return (
    <Box display={'flex'} flexDirection={'column'} gap={4} height={'100%'}>
      <CardTop>
        <Select
          value={String(connection_id || '')}
          onChange={evt => {
            router.push(
              (() => {
                const url = new URL(window.location.href)

                url.searchParams.set('connection_id', evt.target.value)

                return url.href
              })()
            )
          }}
          size='small'
        >
          {filteredStores?.map(item => {
            return (
              <MenuItem key={item.connection_id} value={String(item.connection_id)}>
                {item.shop_alias || item.site_name}
              </MenuItem>
            )
          })}
        </Select>
      </CardTop>

      {store ? <EventTable store={store}></EventTable> : <Introduction></Introduction>}
    </Box>
  )
}
