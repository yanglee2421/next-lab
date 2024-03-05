import React from 'react'

import { Box, CircularProgress } from '@mui/material'

import { Logo } from '@/components/logo'

export function OauthLoading(props: React.PropsWithChildren) {
  return (
    <Box
      position={'fixed'}
      zIndex={theme => theme.zIndex.appBar}
      display={'flex'}
      flexDirection={'column'}
      justifyContent={'center'}
      alignItems={'center'}
      sx={{ inset: 0 }}
    >
      <Logo width={82}></Logo>
      <CircularProgress disableShrink sx={{ mt: 6 }} />
      {props.children}
    </Box>
  )
}
