import React from 'react'

import { Autocomplete, FormControl, FormHelperText, TextField } from '@mui/material'
import { useFormContext, useController } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { useCommonCountry } from '@/hooks/api-erp'

export function ItemCountry(props: ItemCountryProps) {
  // ** Props
  const { name, label } = props

  // I18n Hooks
  const { t } = useTranslation()

  const query = useCommonCountry()

  const formCtx = useFormContext()
  const { control } = formCtx
  const { field, fieldState } = useController({ control, name, defaultValue: '' })
  const { error } = fieldState

  const country_list = query.data?.country_list || []
  const model = country_list.find(item => item.id === field.value)

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
    <FormControl error={!!error} fullWidth>
      <Autocomplete
        options={country_list}
        getOptionLabel={country => country.name}
        renderInput={props => <TextField {...props} error={!!error} label={t(String(label || ''))} />}
        {...field}
        value={model || null}
        onChange={(evt, v) => {
          void evt
          field.onChange(v?.id || null)
        }}
      />
      {error && <FormHelperText>{error.message}</FormHelperText>}
    </FormControl>
  )
}

interface ItemCountryProps {
  name: string
  label: React.ReactNode
}
