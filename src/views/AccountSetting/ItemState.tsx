import React from 'react'

import { FormControl, Autocomplete, TextField, FormHelperText } from '@mui/material'
import { useFormContext, useController, useWatch } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { useCommonState } from '@/hooks/api-erp'

export function ItemState(props: ItemStateProps) {
  // ** Props
  const { label, name } = props

  const query = useCommonState()
  const { t } = useTranslation()
  const formCtx = useFormContext()

  const { control } = formCtx

  const { field, fieldState } = useController({
    control,
    name,
    defaultValue: ''
  })

  const { error } = fieldState

  const country_id = useWatch({ name: 'country_id' })
  const country_state_list = query.data?.country_state_list || []

  const options = country_state_list.filter(item => {
    return item.country_id === country_id
  })

  const model = options.find(item => item.id === field.value)

  React.useEffect(() => {
    if (!field.value) {
      return
    }

    if (model) {
      return
    }

    field.onChange(null)
  }, [field, model])

  if (query.isPending) {
    return null
  }

  if (query.isError) {
    return null
  }

  return (
    <FormControl fullWidth>
      <Autocomplete
        options={options}
        getOptionLabel={item => item.name}
        renderInput={props => <TextField {...props} label={t(label)} />}
        noOptionsText='The selected country does not have any states'
        disabled={!country_id}
        {...field}
        value={model || null}
        onChange={(evt, v) => {
          return field.onChange(v?.id || null)
        }}
      />
      {error && <FormHelperText>{error.message}</FormHelperText>}
    </FormControl>
  )
}

interface ItemStateProps {
  label: string
  name: string
}
