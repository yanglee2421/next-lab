import React from 'react'

import type { ChipProps } from '@mui/material'
import { Chip, alpha } from '@mui/material'

export function StatusCell(props: ChipProps) {
  const { label, ...restProps } = props

  if (typeof label !== 'string') {
    return label
  }

  switch (label.toUpperCase()) {
    case 'SUCCESS':
      return (
        <Chip
          label={label.toLowerCase()}
          size='small'
          sx={theme => {
            return {
              color: theme.palette.success.main,
              bgcolor: alpha(theme.palette.success.main, 0.12),
              textTransform: 'capitalize'
            }
          }}
          {...restProps}
        ></Chip>
      )

    case 'STARTED':
      return (
        <Chip
          label={label.toLowerCase()}
          size='small'
          sx={theme => {
            return {
              color: theme.palette.info.main,
              bgcolor: alpha(theme.palette.info.main, 0.12),
              textTransform: 'capitalize'
            }
          }}
          {...restProps}
        ></Chip>
      )

    default:
      return (
        <Chip
          label={label.toLowerCase()}
          size='small'
          sx={{
            textTransform: 'capitalize'
          }}
          {...restProps}
        ></Chip>
      )
  }
}
