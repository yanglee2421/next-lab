'use client'

import React from 'react'

import { Typography, Alert, AlertTitle } from '@mui/material'

import { OauthLoading } from './OauthLoading'
import { OauthLogin } from './OauthLogin'
import { InstallApp } from './InstallApp'
import { useShopifyOauth } from '@/hooks/api-stg/useShopifyOauth'

export function ShopifyOauth() {
  const oauthQuery = useShopifyOauth()

  if (oauthQuery.isPending) {
    return (
      <OauthLoading>
        <Typography mt={2}>get user info from shopify</Typography>
      </OauthLoading>
    )
  }

  if (oauthQuery.isError) {
    return (
      <Alert severity='error' sx={{ m: 6 }}>
        <AlertTitle>Get user failed</AlertTitle>
        {oauthQuery.error.message}
      </Alert>
    )
  }

  if (oauthQuery.data.access_token) {
    return <OauthLogin access_token={oauthQuery.data.access_token} conn_info={oauthQuery.data.conn_info}></OauthLogin>
  }

  if (oauthQuery.data.conn_info) {
    return <InstallApp conn_info={oauthQuery.data.conn_info}></InstallApp>
  }

  return (
    <Alert severity='error' sx={{ m: 6 }}>
      <AlertTitle>Oauth information exception</AlertTitle>
      Please try again later
    </Alert>
  )
}
