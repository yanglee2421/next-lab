'use client'

import React from 'react'

import type { BoxProps, Theme} from '@mui/material';
import { Box, useMediaQuery } from '@mui/material'


export function TabLabel(props: TabLabelProps) {
  // ** Props
  const { children, icon, ...restProps } = props

  const isExtraSmall = useMediaQuery<Theme>(theme => {
    return theme.breakpoints.down('sm')
  })

  return (
    <Box
      display={'flex'}
      alignItems={'center'}
      sx={{
        '& svg': {
          mr: isExtraSmall ? 0 : 2
        }
      }}
      {...restProps}
    >
      <>
        {icon}
        {isExtraSmall || children}
      </>
    </Box>
  )
}

export interface TabLabelProps extends BoxProps {
  icon: React.ReactNode
}
