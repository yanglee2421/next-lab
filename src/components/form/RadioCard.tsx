// MUI Imports
import React from 'react'

import type { BoxProps } from '@mui/material'
import { Box, Typography, Radio } from '@mui/material'

// React Imports

export function RadioCard(props: RadioCardProps) {
  // ** Props
  const { disabled, value, selected, avatar, title, desc, ...restProps } = props

  return (
    <Box
      component={'label'}
      sx={{
        p: 4,
        height: '100%',
        display: 'flex',
        borderRadius: 1,
        cursor: disabled ? 'not-allowed' : 'pointer',
        filter: disabled ? 'opacity(50%);' : void 0,
        position: 'relative',
        alignItems: 'center',
        flexDirection: 'column',
        border(theme) {
          return `1px solid ${theme.palette.divider}`
        },
        borderColor: selected ? 'primary.main' : void 0,
        '&:hover': {
          borderColor(theme) {
            if (selected) return

            return `rgba(${theme.palette.primary.main}, 0.25)`
          }
        }
      }}
      {...restProps}
    >
      <Box width={64} height={64} mb={2}>
        {avatar}
      </Box>
      <Typography fontWeight={500} mb={1}>
        {title}
      </Typography>
      <Typography
        variant='body2'
        textAlign={'center'}
        sx={{
          overflow: 'hidden',
          maxHeight(theme) {
            const lineHeight = theme.typography.body2.lineHeight

            return `calc(${lineHeight}em * 2)`
          }
        }}
      >
        {desc}
      </Typography>
      <Radio size='small' value={value} disabled={disabled} sx={{ mt: 'auto', display: 'none' }}></Radio>
    </Box>
  )
}

export type RadioCardProps = BoxProps & {
  value: string
  disabled?: boolean
  selected: boolean
  title: React.ReactNode
  desc: React.ReactNode
  avatar: React.ReactNode
}
