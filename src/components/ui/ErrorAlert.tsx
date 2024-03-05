import React from 'react'

import type { AlertProps } from '@mui/material'
import { Alert, AlertTitle } from '@mui/material'

export function ErrorAlert(props: Props) {
  const { titleNode = 'Fetch data failed', children, ...restProps } = props

  return (
    <Alert severity='error' {...restProps}>
      <AlertTitle>{titleNode}</AlertTitle>
      {children}
    </Alert>
  )
}

type Props = AlertProps & {
  titleNode?: React.ReactNode
}
