import React from 'react'

import { useFormContext, useController } from 'react-hook-form'

import { InputCheck } from './InputCheck'

export function ItemCheck(props: ItemCheckProps) {
  const { name, label, ...restProps } = props

  const { control } = useFormContext()
  const { field } = useController({ name, control, defaultValue: false })

  return (
    <InputCheck
      {...restProps}
      {...field}
      checked={field.value}
      onChange={evt => {
        field.onChange(evt.target.checked)
      }}
      label={label}
    />
  )
}

interface ItemCheckProps {
  label: React.ReactNode
  name: string
}
