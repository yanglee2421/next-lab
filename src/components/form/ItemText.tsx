import React from 'react'

import type { TextFieldProps } from '@mui/material'
import { TextField } from '@mui/material'
import { useFormContext, useController } from 'react-hook-form'

export function ItemText(props: Props) {
  const { name, disabled, onFormat, ...restProps } = props

  const formCtx = useFormContext()

  const controller = useController({
    name,
    control: formCtx.control,
    defaultValue: '',
    disabled
  })

  return (
    <TextField
      {...controller.field}
      onChange={evt => {
        controller.field.onChange(onFormat ? onFormat(evt) : evt.target.value)
      }}
      error={!!controller.fieldState.error}
      helperText={controller.fieldState.error?.message}
      fullWidth
      {...restProps}
    ></TextField>
  )
}

type Props = TextFieldProps & {
  name: string
  onFormat?(evt: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): string
}
