
import React from 'react'

import { useFormContext, useController } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { InputNumber } from './InputNumber'
import type { InputNumberProps } from './InputNumber';

export function ItemNumber(props: Props) {
  const { name, label, ...restProps } = props

  const { control } = useFormContext()
  const { field } = useController({ name, control, defaultValue: null })
  const { t } = useTranslation()

  return (
    <InputNumber {...restProps} {...field} value={field.value} onChange={field.onChange} label={t(String(label))} />
  )
}

type Props = Omit<InputNumberProps, 'value' | 'onChange'> & {
  name: string
  label: React.ReactNode
}
