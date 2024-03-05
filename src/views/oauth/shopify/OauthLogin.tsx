import React from 'react'

import { Typography, Alert, AlertTitle } from '@mui/material'

import { useRefreshToken } from '@/hooks/api-erp/useRefreshToken'
import { OauthLoading } from './OauthLoading'
import { Navitate } from './Navigate'
import { InstallApp } from './InstallApp'


import { useAuthLocalStore } from '@/hooks/store/useAuthLocalStore'

export function OauthLogin(props: OauthLoginProps) {
  const { access_token, conn_info, ...restProps } = props

  const accessToken = useAuthLocalStore(store => store.accessToken)
  const setAccessToken = useAuthLocalStore(store => store.setAccessToken)
  const refreshQuery = useRefreshToken(accessToken)

  React.useEffect(() => {
    setAccessToken(access_token)
  }, [access_token, setAccessToken])

  if (refreshQuery.isPending) {
    return (
      <OauthLoading {...restProps}>
        <Typography mt={2}>Login...</Typography>
      </OauthLoading>
    )
  }

  if (refreshQuery.isError) {
    return (
      <Alert severity='error' sx={{ m: 6 }}>
        <AlertTitle>Login failed</AlertTitle>
        {refreshQuery.error.message}
      </Alert>
    )
  }

  if (conn_info) {
    return <InstallApp conn_info={conn_info}></InstallApp>
  }

  return <Navitate></Navitate>
}

export interface OauthLoginProps {
  access_token: string
  conn_info: Connection | null
}

export interface Connection {
  auth_url: string
}
