import React from 'react'

import type { Theme} from '@mui/material';
import { useMediaQuery, Tab, Box } from '@mui/material'


import { useTranslation } from 'react-i18next'

export function TabItem(props: Props) {
  const { value, label, icon, ...restProps } = props

  const hideText = useMediaQuery((theme: Theme) => {
    return theme.breakpoints.down('md')
  })

  const { t } = useTranslation()

  return (
    <Tab
      value={value}
      label={
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            '& svg': hideText ? undefined : { mr: 2 }
          }}
        >
          {icon}
          {!hideText && t(label)}
        </Box>
      }
      {...restProps}
    />
  )
}

type Props = {
  value: string
  label: string
  icon: React.ReactNode
}
