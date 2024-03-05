'use client'

import React from 'react'

import NextJsLink from 'next/link'

import type { CardProps } from '@mui/material'
import { Card, CardContent, Box } from '@mui/material'

import { TLink, TTypography } from '@/components'
import { VisuallySimilar } from '@/components/logo'

export function CardTop(props: CardTopProps) {
  const { children, ...restProps } = props

  return (
    <Card {...restProps}>
      <CardContent>
        <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
          <Box display={'flex'} alignItems={'center'} gap={2}>
            <VisuallySimilar width={56} height={56} />
            <Box>
              <TTypography variant='h5' sx={{ fontSize: { xs: 22 } }}>
                WarpDriven Recommender
              </TTypography>
              <TLink
                href='/ticket'
                component={NextJsLink}
                variant='caption'
                underline='hover'
                sx={{
                  display: {
                    xs: 'none',
                    sm: 'inline'
                  }
                }}
              >
                Request Demo or Recommendation System Customisation
              </TLink>{' '}
              <TTypography
                component={'span'}
                variant='caption'
                sx={{
                  display: {
                    xs: 'none',
                    sm: 'inline'
                  }
                }}
              >
                Or
              </TTypography>{' '}
              <TLink
                href='https://warp-driven.com/'
                underline='hover'
                variant='caption'
                sx={{
                  display: {
                    xs: 'none',
                    sm: 'inline'
                  }
                }}
              >
                Check More Products
              </TLink>
            </Box>
          </Box>
          {children}
        </Box>
      </CardContent>
    </Card>
  )
}

export type CardTopProps = CardProps
