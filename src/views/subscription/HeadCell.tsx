'use client'

import { TableCell, Box, Typography } from '@mui/material'

export function HeadCell(props: HeadCellProps) {
  const { isFirst, title, subtitle } = props

  return (
    <TableCell>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: isFirst ? 'flex-start' : 'center'
        }}
      >
        <Typography
          noWrap
          sx={{
            fontSize: '.75rem',
            fontWeight: 600,
            letterSpacing: '.17px'
          }}
        >
          {title}
        </Typography>
        <Typography
          noWrap
          sx={{
            fontSize: '.75rem',
            letterSpacing: '.4px',
            textTransform: 'capitalize'
          }}
        >
          {subtitle}
        </Typography>
      </Box>
    </TableCell>
  )
}

export interface HeadCellProps {
  isFirst?: boolean
  title: string
  subtitle: string
}
