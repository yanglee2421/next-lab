'use client'

import { useParams, useRouter } from 'next/navigation'

import { Grid, Tab } from '@mui/material'
import { TabContext } from '@mui/lab'
import { FiberNewOutlined, HubOutlined } from '@mui/icons-material'

import { TabLabel, TabList } from '@components/ui'
import { ConnectionTable } from '@views/connection/ConnectionTable'

export default function Page() {
  const router = useRouter()
  const params = useParams()

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <TabContext value='my-connection'>
          <TabList
            onChange={(evt, value) => {
              void evt
              router.push(
                (() => {
                  const url = new URL(window.location.href)

                  url.pathname = `/${params.lang}/connection/${value}`

                  return url.href
                })()
              )
            }}
            sx={{ border: 0 }}
          >
            <Tab
              value='my-connection'
              label={<TabLabel icon={<HubOutlined></HubOutlined>}>My Connection</TabLabel>}
            ></Tab>
            <Tab
              value='new-connection'
              label={<TabLabel icon={<FiberNewOutlined></FiberNewOutlined>}>New Connection</TabLabel>}
            ></Tab>
          </TabList>
        </TabContext>
      </Grid>
      <Grid item xs={12} sx={{ pt: theme => `${theme.spacing(4)} !important` }}>
        <ConnectionTable></ConnectionTable>
      </Grid>
    </Grid>
  )
}
