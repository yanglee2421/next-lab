'use client'

import type { LoadingButtonProps } from '@mui/lab';
import { LoadingButton } from '@mui/lab'
import { useTranslation } from 'react-i18next'

export function TLoadingButton(props: LoadingButtonProps) {
  const { children, ...restProps } = props

  const { t } = useTranslation()

  return (
    <LoadingButton {...restProps}>
      {(() => {
        if (typeof children === 'string') {
          return t([`button:${children}`, children], { keySeparator: ':' })
        }

        return children
      })()}
    </LoadingButton>
  )
}
