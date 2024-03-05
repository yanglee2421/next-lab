'use client'

import { useParams, useRouter } from 'next/navigation'

import { Grid, Tab } from '@mui/material'

import { TabContext } from '@mui/lab'

import { AccountBoxOutlined, SecurityOutlined, ReceiptLongOutlined } from '@mui/icons-material'

import { UsrHeader } from '@views/user/usr-header'

import { TabLabel, TabList } from '@components/ui'
import { CardAddress } from '@views/user/billing/CardAddress'
import { CardInvoice } from '@views/user/billing/CardInvoice'
import { CardPayment } from '@views/user/billing/CardPayment'

export default function Page() {
  const params = useParams()
  const router = useRouter()

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <UsrHeader />
      </Grid>
      <Grid item xs={12}>
        <TabContext value='billing'>
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
            sx={{ border: 0, alignItems: 'center' }}
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
        <CardAddress></CardAddress>
      </Grid>
      <Grid item xs={12}>
        <CardInvoice></CardInvoice>
      </Grid>
      <Grid item xs={12}>
        <CardPayment></CardPayment>
      </Grid>
    </Grid>
  )
}
