'use client'

import { useParams, useRouter } from 'next/navigation'

import { Grid, Tab } from '@mui/material'

import { TabContext } from '@mui/lab'

import { AccountBoxOutlined, SecurityOutlined, ReceiptLongOutlined } from '@mui/icons-material'

import { UsrHeader } from '@views/user/usr-header'

import { TabLabel, TabList } from '@components/ui'
import { CardPasswd } from '@views/user/security/CardPasswd'

export default function Page() {
  const params = useParams()
  const router = useRouter()

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <UsrHeader />
      </Grid>
      <Grid item xs={12}>
        <TabContext value='security'>
          <TabList
            onChange={(evt, value) => {
              void evt
              router.push(
                (() => {
                  const url = new URL(window.location.href)

                  url.pathname = `/${params.lang}/user/${value}`

                  return url.href
                })()
              )
            }}
            sx={{ border: 0 }}
          >
            <Tab
              value='overview'
              label={<TabLabel icon={<AccountBoxOutlined></AccountBoxOutlined>}>overview</TabLabel>}
            ></Tab>
            <Tab
              value={'security'}
              label={<TabLabel icon={<SecurityOutlined></SecurityOutlined>}>security</TabLabel>}
            ></Tab>
            <Tab
              value={'billing'}
              label={<TabLabel icon={<ReceiptLongOutlined></ReceiptLongOutlined>}>billing</TabLabel>}
            ></Tab>
          </TabList>
        </TabContext>
      </Grid>
      <Grid item xs={12}>
        <CardPasswd></CardPasswd>
      </Grid>
    </Grid>
  )
}
