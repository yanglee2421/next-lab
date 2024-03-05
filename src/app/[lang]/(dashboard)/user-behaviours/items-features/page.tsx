'use client'

import RouterLink from 'next/link'

import {
  Card,
  Grid,
  Typography,
  CardContent,
  Box,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  Button
} from '@mui/material'

import { useImmer } from 'use-immer'

import { GptCopywriting } from '@/components/logo'
import { ProgressBox, ErrorAlert } from '@/components/ui'
import { ApexRadarChart } from '@views/user-behaviours/items-features/ApexRadarChart'
import { LineChart } from '@views/user-behaviours/items-features/LineChart'

import { useMyConnections } from '@/hooks/api-stg'


import type { Row } from '@/api/api-stg/connection_my_connections'

export default function ApexCharts() {
  const query = useMyConnections({
    is_list_all: false,
    site_type: 1
  })

  if (query.isPending) {
    return <ProgressBox></ProgressBox>
  }

  if (query.isError) {
    return <ErrorAlert titleNode='Fetch eCommerce shops failed'>{query.error.message}</ErrorAlert>
  }

  if (!query.data.length) {
    return (
      <ErrorAlert
        severity='info'
        titleNode='Not connected to any store'
        action={
          <Button LinkComponent={RouterLink} href='/connection/new-connection'>
            add
          </Button>
        }
      >
        Please create a new connection to continue
      </ErrorAlert>
    )
  }

  return <PageContent eCommerceShops={query.data}></PageContent>
}

function PageContent(props: Props) {
  // ** Props
  const { eCommerceShops } = props

  const [state, updateState] = useImmer(() => {
    return {
      eCommerceShop: eCommerceShops[0]
    }
  })

  return (
    <Grid container spacing={6} className='match-height'>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
              <Box display={'flex'} alignItems={'center'} gap={2}>
                <GptCopywriting width={56} height={56}></GptCopywriting>
                <Box>
                  <Typography variant='h5'>Warp Driven AI</Typography>
                  <Typography variant='body2'>Let AI tell you what kind of products people like</Typography>
                </Box>
              </Box>
              <Box>
                <FormControl size='small' fullWidth sx={{ minWidth: 160 }}>
                  <InputLabel>eCommerce shop</InputLabel>
                  <Select
                    value={String(state.eCommerceShop?.connection_id)}
                    onChange={evt => {
                      const nextValue = eCommerceShops.find(item => {
                        return Object.is(item.connection_id, Number(evt.target.value))
                      })

                      if (nextValue) {
                        updateState(state => {
                          state.eCommerceShop = nextValue
                        })
                      }
                    }}
                    label='eCommerce shop'
                  >
                    {eCommerceShops.map(item => {
                      return (
                        <MenuItem key={item.connection_id} value={String(item.connection_id)}>
                          {item.shop_alias || item.site_name}
                        </MenuItem>
                      )
                    })}
                  </Select>
                </FormControl>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <ApexRadarChart eCommerceShop={state.eCommerceShop} />
      </Grid>
      <Grid item xs={12}>
        <LineChart eCommerceShop={state.eCommerceShop}></LineChart>
      </Grid>
    </Grid>
  )
}

type Props = {
  eCommerceShops: Row[]
}
