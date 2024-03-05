// MUI Imports
import React from 'react'

import type { TextFieldProps } from '@mui/material';
import { IconButton, InputAdornment, TextField } from '@mui/material'
import { VisibilityOutlined, VisibilityOffOutlined } from '@mui/icons-material'

// Form Imports
import { useFormContext, useController } from 'react-hook-form'

// React Imports

export function ItemPassword(props: Props) {
  // ** Props
  const { name, disabled, ...restProps } = props

  // Form Hooks
  const formCtx = useFormContext()

  const controller = useController({
    name,
    control: formCtx.control,
    defaultValue: '',
    disabled
  })

  // Show Password
  const [showPasswd, setIsShowPasswd] = React.useState(false)

  return (
    <TextField
      {...controller.field}
      error={!!controller.fieldState.error}
      helperText={controller.fieldState.error?.message}
      type={showPasswd ? 'text' : 'password'}
      InputProps={{
        endAdornment: (
          <InputAdornment position='end'>
            <IconButton
              onClick={() => {
                setIsShowPasswd(p => !p)
              }}
            >
              {showPasswd ? <VisibilityOutlined /> : <VisibilityOffOutlined />}
            </IconButton>
          </InputAdornment>
        )
      }}
      inputProps={{ inputMode: 'text' }}
      fullWidth
      {...restProps}
    ></TextField>
  )
}

type Props = TextFieldProps & { name: string }
