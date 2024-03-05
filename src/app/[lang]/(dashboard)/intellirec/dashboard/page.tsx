'use client'

import React from 'react'

import { useRouter, useSearchParams } from 'next/navigation'

import { Alert, AlertTitle, MenuItem, Select } from '@mui/material'

import { SkeletonCard } from '@/components/ui'
import { CardTop, Introduction, Dashboard } from '@/views/intellirec'
import { useMyConnections } from '@/hooks/api-stg'

export default function Page() {
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

  const fallbackStore = filteredStores?.at(0)

  const store = filteredStores?.find(item => {
    return String(item.connection_id) === searchParams.get('connection_id')
  })

  React.useEffect(() => {
    if (store?.connection_id) {
      return
    }

    if (!fallbackStore) {
      return
    }

    router.replace(
      (() => {
        const searchParams = new URLSearchParams(window.location.search)

        searchParams.set('connection_id', String(fallbackStore.connection_id))
        searchParams.set('site_type', String(fallbackStore.site_type))
        searchParams.set('data_server_project_id', fallbackStore.data_server_project_id)

        const url = new URL(window.location.href)

        url.search = searchParams.toString()

        return url.href
      })()
    )
  }, [store?.connection_id, fallbackStore, router])

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
    <>
      <CardTop>
        {!!filteredStores?.length && (
          <Select
            value={searchParams.get('connection_id') || ''}
            onChange={evt => {
              const nextStore = query.data.find(item => {
                return (item.connection_id = Number(evt.target.value))
              })

              if (!nextStore) {
                return
              }

              router.replace(
                (() => {
                  const searchParams = new URLSearchParams(window.location.search)

                  searchParams.set('connection_id', String(nextStore.connection_id))
                  searchParams.set('site_type', String(nextStore.site_type))
                  searchParams.set('data_server_project_id', String(nextStore.data_server_project_id))

                  const url = new URL(window.location.href)

                  url.search = searchParams.toString()

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
        )}
      </CardTop>
      {store ? <Dashboard store={store} sx={{ mt: 0 }}></Dashboard> : <Introduction></Introduction>}
    </>
  )
}
