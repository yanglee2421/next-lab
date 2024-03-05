'use client'

import React from 'react'

import { useRouter, useSearchParams } from 'next/navigation'

import { Select, FormControl, MenuItem, InputLabel } from '@mui/material'

import { useMyConnections } from '@/hooks/api-stg'

export function StoreSelect() {
  const query = useMyConnections({ is_list_all: false, site_type: 1 })
  const searchParams = useSearchParams()
  const router = useRouter()

  const connection_id = searchParams.get('connection_id')

  React.useEffect(() => {
    if (!query.isSuccess) {
      return
    }

    const filteredStores = query.data.filter(item => {
      return [item.approved_services?.includes(2), item.scopes.includes(2)].every(Boolean)
    })

    if (
      filteredStores.some(item => {
        return Object.is(item.connection_id, Number(connection_id))
      })
    ) {
      return
    }

    const fallbackStore = filteredStores.at(0)

    if (!fallbackStore) {
      return
    }

    router.replace(
      (() => {
        const url = new URL(window.location.href)

        url.searchParams.set('connection_id', String(fallbackStore.connection_id))
        url.searchParams.set('site_type', String(fallbackStore.site_type))
        url.searchParams.set('data_server_project_id', String(fallbackStore.data_server_project_id))

        return url.href
      })()
    )
  }, [query.isSuccess, query.data, connection_id, router])

  if (query.isPending) {
    return null
  }

  if (query.isError) {
    return null
  }

  return (
    <FormControl size='small' sx={{ minWidth: 240 }}>
      <InputLabel>Store</InputLabel>
      <Select
        value={connection_id || ''}
        onChange={evt => {
          const nextValue = query.data?.find(item => {
            return item.connection_id === Number(evt.target.value)
          })

          if (!nextValue) {
            return
          }

          router.push(
            (() => {
              const searchParams = new URLSearchParams(window.location.search)

              searchParams.set('connection_id', String(nextValue.connection_id))
              searchParams.set('site_type', String(nextValue.site_type))
              searchParams.set('data_server_project_id', nextValue.data_server_project_id)

              const url = new URL(window.location.href)

              url.search = searchParams.toString()

              return url.href
            })()
          )
        }}
        label='Store'
      >
        {query.data
          .filter(item => {
            return [item.approved_services?.includes(2), item.scopes.includes(2)].every(Boolean)
          })
          .map(item => {
            return (
              <MenuItem key={item.connection_id} value={item.connection_id} title={toPlatformName(item.site_type)}>
                {item.shop_alias || item.site_name}
              </MenuItem>
            )
          })}
      </Select>
    </FormControl>
  )
}

function toPlatformName(site_type: number) {
  const map = new Map<number, string>()

  map.set(1, 'shopify')
  map.set(2, 'woocommerce')
  map.set(3, 'shopline')

  return map.get(site_type)
}
