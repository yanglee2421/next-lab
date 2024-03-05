import React from 'react'

import { Box, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

export function Item(props: Props) {
  const { label, children, icon } = props

  const { t } = useTranslation()

  return (
    <Box
      sx={{
        display: 'flex',
        '&:not(:last-of-type)': { mb: 4 },
        '& svg': { color: 'text.secondary' }
      }}
    >
      <Box sx={{ display: 'flex', mr: 2 }}>{icon}</Box>
      <Box
        sx={{
          columnGap: 2,
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center'
        }}
      >
        <Typography
          sx={{
            fontWeight: 600,
            color: 'text.secondary',
            textTransform: 'capitalize'
          }}
        >
          {`${t(label)}:`}
        </Typography>
        <Typography sx={{ color: 'text.secondary', wordBreak: 'break-word' }}>{children}</Typography>
      </Box>
    </Box>
  )
}

type Props = React.PropsWithChildren & {
  icon: React.ReactNode
  label: string
}
