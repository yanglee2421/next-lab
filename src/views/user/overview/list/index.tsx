import React from 'react'

import { Box, Typography } from '@mui/material'

import { useTranslation } from 'react-i18next'

import { Item } from './item'

export interface ListProps extends React.PropsWithChildren {
  label?: string
}

List.Item = Item

export function List(props: ListProps) {
  const { label, children } = props

  const { t } = useTranslation()

  return (
    <Box sx={{ mb: 6 }}>
      <Typography variant='caption' sx={{ mb: 5, display: 'block', textTransform: 'uppercase' }}>
        {t(label || '')}
      </Typography>
      {children}
    </Box>
  )
}
