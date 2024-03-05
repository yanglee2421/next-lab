import React from 'react'

import { useTranslation } from 'react-i18next'

import { ItemText } from '@/components/form'

export function ItemTextarea(props: Props) {
  const { name, label, ...restProps } = props

  const { t } = useTranslation()

  return <ItemText name={name} fullWidth multiline minRows={5} maxRows={6} label={t(String(label))} {...restProps} />
}

type Props = React.ComponentProps<typeof ItemText> & {
  name: string
  label: React.ReactNode
}
