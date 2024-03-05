'use client'
import { useParams, useRouter } from 'next/navigation'

import { Grid, Tab } from '@mui/material'
import { TabContext } from '@mui/lab'
import { AccountBoxOutlined, LocationCityOutlined, LocationOnOutlined } from '@mui/icons-material'

import { TabLabel, TabList } from '@components/ui'
import { TabCompany } from '@/views/AccountSetting/TabCompany'

export default function Page() {
  const params = useParams()
  const router = useRouter()

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <TabContext value='company'>
          <TabList
            onChange={(evt, value) => {
              void evt
              router.push(
                (() => {
                  const url = new URL(window.location.href)

                  url.pathname = `/${params.lang}/account-setting/${value}`

                  return url.href
                })()
              )
            }}
            sx={{ border: 0, alignItems: 'center' }}
          >
            <Tab
              value='account'
              label={<TabLabel icon={<AccountBoxOutlined></AccountBoxOutlined>}>Account</TabLabel>}
            ></Tab>
            <Tab
              value={'company'}
              label={<TabLabel icon={<LocationCityOutlined></LocationCityOutlined>}>Company</TabLabel>}
            ></Tab>
            <Tab
              value={'address'}
              label={<TabLabel icon={<LocationOnOutlined></LocationOnOutlined>}>Address</TabLabel>}
            ></Tab>
          </TabList>
        </TabContext>
      </Grid>
      <Grid item xs={12}>
        <TabCompany></TabCompany>
      </Grid>
    </Grid>
  )
}
