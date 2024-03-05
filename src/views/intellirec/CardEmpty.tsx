'use client'

import Link from 'next/link'

import { Box, Button, Divider, Typography } from '@mui/material'
import { StoreOutlined } from '@mui/icons-material'

export function CardEmpty() {
  return (
    <>
      <Box display={'flex'} justifyContent={'center'} pt={12} fontSize={'6rem'}>
        <StoreOutlined fontSize={'inherit'} />
      </Box>
      <Typography variant='h4' align='center' marginTop={4}>
        Please select a store first!
      </Typography>
      <Typography variant='body1' align='center' color='GrayText' marginTop={4}>
        Warp Driven Recommender needs to be connected to your store to work properly
      </Typography>
      <Typography variant='body1' align='center' color='GrayText' marginTop={4}>
        Please connect to your store via the button below
      </Typography>
      <Divider sx={{ marginY: 4 }}>or</Divider>
      <Box display={'flex'} justifyContent={'center'}>
        <Button href='/connection/new-connection' LinkComponent={Link} variant='contained'>
          connect you store
        </Button>
      </Box>
    </>
  )
}
