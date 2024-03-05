import React from 'react'

import Image from 'next/image'

import { Card, CardContent, CardHeader, Grid, RadioGroup } from '@mui/material'

import { Ali1688 } from '@/components/logo'
import { RadioCard } from '@/components/form'
import { WoolworldsBuyerForm } from './WoolworldsBuyerForm'
import { WoolworldsSellerForm } from './WoolworldsSellerForm'
import { Ali1688Form } from './Ali1688Form'

export function SupplyChainCard() {
  const [platform, setPlatform] = React.useState('')

  return (
    <Card>
      <CardHeader title='Supply Chain'></CardHeader>
      <CardContent>
        <RadioGroup
          value={platform}
          onChange={(evt, v) => {
            if (!v) {
              return evt
            }

            React.startTransition(() => {
              setPlatform(v)
            })
          }}
        >
          <Grid container spacing={5}>
            <Grid item xs={12} sm={6} md={4} xl={3}>
              <RadioCard
                avatar={
                  <Image width={64} height={64} src='/images/platform-icons/icon_256x256.png' alt='Woolworlds'></Image>
                }
                title={'Woolworlds Buyer'}
                desc={'WarpDriven Intelligent Supply Chain'}
                value='woolworlds-buyer'
                selected={platform === 'woolworlds-buyer'}
              ></RadioCard>
            </Grid>
            <Grid item xs={12} sm={6} md={4} xl={3}>
              <RadioCard
                avatar={
                  <Image width={64} height={64} src='/images/platform-icons/icon_256x256.png' alt='Woolworlds'></Image>
                }
                title={'Woolworlds Seller'}
                desc={'WarpDriven Intelligent Supply Chain'}
                value='woolworlds-seller'
                selected={platform === 'woolworlds-seller'}
              ></RadioCard>
            </Grid>
            <Grid item xs={12} sm={6} md={4} xl={3}>
              <RadioCard
                avatar={<Ali1688 width={64} height={64}></Ali1688>}
                title={'Alibaba 1688'}
                desc={'Chinese B2B platform for wholesale sourcing directly from manufacturers'}
                value='1688'
                selected={platform === '1688'}
              ></RadioCard>
            </Grid>
          </Grid>
        </RadioGroup>
      </CardContent>
      {(() => {
        switch (platform) {
          case 'woolworlds-buyer':
            return <WoolworldsBuyerForm></WoolworldsBuyerForm>
          case 'woolworlds-seller':
            return <WoolworldsSellerForm></WoolworldsSellerForm>
          case '1688':
            return <Ali1688Form></Ali1688Form>
          default:
            return null
        }
      })()}
    </Card>
  )
}
