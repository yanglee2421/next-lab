import type { SelectProps } from '@mui/material';
import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material'
import { useController, useFormContext } from 'react-hook-form'

import { useCommonLang } from '@/hooks/api-erp'

export function LangSelect(props: Props) {
  const { name, disabled, ...restProps } = props

  const query = useCommonLang()
  const formCtx = useFormContext()

  const controller = useController({
    control: formCtx.control,
    name,
    disabled,
    defaultValue: ''
  })

  if (query.isPending) {
    return null
  }

  if (query.isError) {
    return null
  }

  return (
    <FormControl error={!!controller.fieldState.error}>
      <InputLabel>{restProps.label}</InputLabel>
      <Select {...controller.field} {...restProps}>
        {query.data.lang_list.map(item => {
          return (
            <MenuItem key={item.code} value={item.code}>
              {item.name}
            </MenuItem>
          )
        })}
      </Select>
      {!!controller.fieldState.error && <FormHelperText>{controller.fieldState.error.message}</FormHelperText>}
    </FormControl>
  )
}

type Props = SelectProps & {
  name: string
}
