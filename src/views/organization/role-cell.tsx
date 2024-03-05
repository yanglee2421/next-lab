import React from 'react'

import { Box, Typography } from '@mui/material'
import { PersonOutline } from '@mui/icons-material'

export function RoleCell(props: RoleCellProps) {
  const { iconColor, text } = props

  return (
    <Box display={'flex'} alignItems={'center'}>
      <PersonOutline sx={{ mr: 3 }} color={iconColor} />
      <Typography color={'secondary'} textTransform={'capitalize'} noWrap>
        {text}
      </Typography>
    </Box>
  )
}

export interface RoleCellProps {
  iconColor: Color
  text: React.ReactNode
}

type Color = 'disabled' | 'action' | 'inherit' | 'success' | 'primary' | 'secondary' | 'error' | 'info' | 'warning'
