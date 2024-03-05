import React from 'react'

import { useRouter, useSearchParams } from 'next/navigation'

import { Box, Alert, AlertTitle, Fade, Grid } from '@mui/material'

import { SwitchTransition } from 'react-transition-group'

import { CardTabs } from './card-tabs'
import { CardLeft } from './card-left'
import { RightTable } from './right-table'
import { RightDetail } from './right-detail'
import { RightError } from './right-error'
import { SkeletonCard } from '@/components/ui'
import { useCopywritingStore } from '@/hooks/store/useCopywritingStore'
import { useMyConnections } from '@/hooks/api-stg/useMyConnections'

export function GptCopywriting() {
  const error = useCopywritingStore(s => s.error)
  const showBack = useCopywritingStore(s => s.showBack)
  const task_id = useCopywritingStore(s => s.tab)
  const storesQuery = useMyConnections({ is_list_all: false, site_type: 1 })
  const router = useRouter()
  const searchParams = useSearchParams()
  const connection_id = searchParams.get('connection_id')
  const site_type = searchParams.get('site_type')

  React.useEffect(() => {
    if (connection_id && site_type) {
      return
    }

    if (!storesQuery.data) {
      return
    }

    const fallbackConnection = storesQuery.data.at(0)

    if (!fallbackConnection) {
      return
    }

    router.replace(
      (() => {
        const url = new URL(window.location.href)

        url.searchParams.set('connection_id', String(fallbackConnection.connection_id || ''))
        url.searchParams.set('site_info_id', String(fallbackConnection.site_info_id || ''))
        url.searchParams.set('site_type', String(fallbackConnection.site_type || ''))
        url.searchParams.set('shop_alias', String(fallbackConnection.shop_alias || ''))
        url.searchParams.set('site_name', String(fallbackConnection.site_name || ''))

        return url.href
      })()
    )
  }, [storesQuery.data, connection_id, site_type, router])

  if (storesQuery.isPending) {
    return <SkeletonCard sx={{ height: '100%' }}></SkeletonCard>
  }

  if (storesQuery.isError) {
    return (
      <Alert severity='error'>
        <AlertTitle>Fetch stores failed</AlertTitle>
        {storesQuery.error.message}
      </Alert>
    )
  }

  return (
    <Box position={'relative'} display={'flex'} flexDirection={'column'} gap={4} height={'100%'}>
      <CardTabs></CardTabs>
      <Grid container spacing={6}>
        <Grid item xs={12} sm={6} md={5} xl={4}>
          <CardLeft></CardLeft>
        </Grid>
        <Grid item xs={12} sm={6} md={7} xl={8}>
          {error ? (
            <RightError></RightError>
          ) : (
            <SwitchTransition>
              <Fade key={showBack ? 'back' : 'front'} unmountOnExit>
                <Box height={'100%'} minHeight={560}>
                  {showBack ? <RightDetail key={task_id}></RightDetail> : <RightTable></RightTable>}
                </Box>
              </Fade>
            </SwitchTransition>
          )}
        </Grid>
      </Grid>
    </Box>
  )
}
