'use client'

import React from 'react'

import type { BoxProps } from '@mui/material'
import { Box, Typography, styled, alpha, Button } from '@mui/material'
import { CircleOutlined } from '@mui/icons-material'

import type { Plan } from '@/api/api-stg/get_all_plans'
import { useAcl } from '@/hooks/useAcl'

export function PlanCard(props: Props) {
  const { isCurr = false, img, interval, onSelect, productData } = props

  const acl = useAcl()

  return (
    <BoxWrapper
      sx={{
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor(theme) {
          if (isCurr) {
            return theme.palette.success.main
          }

          return theme.palette.divider
        }
      }}
    >
      <Box sx={{ mb: 5, display: 'flex', justifyContent: 'center' }}>
        <img src={img} alt='' />
      </Box>
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant='h5' sx={{ mb: 1.5 }}>
          {productData.product_name}
        </Typography>
        <Typography variant='body2'>{productData.interval_type_title}</Typography>
        <Box sx={{ my: 7, position: 'relative' }}>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Typography variant='body2' sx={{ mt: 1.6, fontWeight: 600, alignSelf: 'flex-start' }}>
              $
            </Typography>
            <Typography
              variant='h3'
              sx={{
                fontWeight: 600,
                color: 'primary.main',
                lineHeight: 1.17
              }}
            >
              {productData.price_unit}
            </Typography>
            <Typography variant='body2' sx={{ mb: 1.6, fontWeight: 600, alignSelf: 'flex-end' }}>
              /{interval === 12 ? 'year' : 'month'}
            </Typography>
          </Box>
        </Box>
        <BoxFeature>
          {(() => {
            return productData.product_description_sale
              ?.split('\n')
              .filter(Boolean)
              .map(item => {
                return <FeaturesItem key={item}>{item}</FeaturesItem>
              })
          })()}
        </BoxFeature>
        {(() => {
          if (isCurr) {
            return (
              <Button
                variant='outlined'
                color='success'
                fullWidth
                sx={{
                  cursor: 'default',
                  '&:hover': {
                    backgroundColor: 'transparent',
                    borderColor(theme) {
                      const color = theme.palette.success.main

                      return alpha(color, 0.5)
                    }
                  }
                }}
              >
                your current plan
              </Button>
            )
          }

          if (acl.can('update', 'subscription')) {
            return (
              <Button
                onClick={() => {
                  onSelect(productData.product_id)
                }}
                fullWidth
                color={'primary'}
                variant={'outlined'}
              >
                upgrade
              </Button>
            )
          }

          return null
        })()}
      </Box>
    </BoxWrapper>
  )
}

function FeaturesItem(props: React.PropsWithChildren) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box
        component='span'
        fontSize={'0.75rem'}
        sx={{
          display: 'inline-flex',
          color: 'text.secondary',
          mr: 2
        }}
      >
        <CircleOutlined fontSize='inherit'></CircleOutlined>
      </Box>
      <Typography variant='body2' overflow={'hidden'} whiteSpace={'nowrap'} textOverflow={'ellipsis'}>
        {props.children}
      </Typography>
    </Box>
  )
}

type Props = {
  isCurr?: boolean
  interval: number
  img: string
  onSelect(planId: number): void
  productData: Plan
}

// ** Styled Component for the wrapper of whole component
const BoxWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  position: 'relative',
  padding: theme.spacing(6),
  paddingTop: theme.spacing(14.75),
  borderRadius: theme.shape.borderRadius
}))

const BoxFeature = styled(Box)<BoxProps>(({ theme }) => ({
  marginBottom: theme.spacing(5),
  '& > :not(:first-of-type)': {
    marginTop: theme.spacing(4)
  }
}))
