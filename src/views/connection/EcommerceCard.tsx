// MUI Imports
import React from 'react'

import Image from 'next/image'

import { Card, CardContent, CardHeader, RadioGroup, Grid } from '@mui/material'

// Components Imports
import { useTranslation } from 'react-i18next'

import { ShopifyForm } from './ShopifyForm'
import { ShoplineForm } from './ShoplineForm'
import { WooForm } from './WooForm'
import { RadioCard } from '@/components/form'
import { Shopify, Shoplazza, Woo } from '@/components/logo'

// I18n Imports

// React Imports

export function EcommerceCard() {
  const { t } = useTranslation()

  const [platform, setPlatform] = React.useState(0)

  return (
    <Card>
      <CardHeader title={t('E-commerce Platform')}></CardHeader>
      <CardContent>
        <RadioGroup
          value={platform}
          onChange={(evt, value) => {
            void evt
            setPlatform(Number(value))
          }}
        >
          <Grid container spacing={5}>
            <Grid item xs={12} sm={6} md={4} xl={3}>
              <RadioCard
                value={String(1)}
                selected={platform === 1}
                avatar={<Shopify width={64} height={64}></Shopify>}
                title='Shopify'
                desc='Versatile e-commerce platform for easy online store creation and management'
              ></RadioCard>
            </Grid>
            <Grid item xs={12} sm={6} md={4} xl={3}>
              <RadioCard
                value={String(2)}
                selected={platform === 2}
                avatar={<Woo width={64} height={64}></Woo>}
                title='WooCommerce'
                desc='WordPress plugin for seamless e-commerce integration and customization'
              ></RadioCard>
            </Grid>

            <Grid item xs={12} sm={6} md={4} xl={3}>
              <RadioCard
                value={String(3)}
                selected={platform === 3}
                avatar={<Image src='/images/platform-icons/shopline.png' alt='Shopline' width={64} height={64}></Image>}
                title='Shopline'
                desc='Asian-focused e-commerce platform with user-friendly tools'
              ></RadioCard>
            </Grid>

            <Grid item xs={12} sm={6} md={4} xl={3}>
              <RadioCard
                disabled
                value={String(4)}
                selected={platform === 4}
                avatar={<Shoplazza width={64} height={64}></Shoplazza>}
                title='Shoplazza'
                desc='Simple e-commerce solution emphasizing quick setup and customization'
              ></RadioCard>
            </Grid>
          </Grid>
        </RadioGroup>
      </CardContent>
      {platformMap.get(platform)}
    </Card>
  )
}

const platformMap = new Map<number, React.ReactNode>()

platformMap.set(1, <ShopifyForm></ShopifyForm>)
platformMap.set(2, <WooForm></WooForm>)
platformMap.set(3, <ShoplineForm></ShoplineForm>)
