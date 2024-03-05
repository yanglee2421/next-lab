'use client'

import React from 'react'

import { Autocomplete, TextField, FormControl, FormHelperText } from '@mui/material'
import { useFormContext, useController } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { useCommonLang } from '@/hooks/api-erp'

export function ItemLang(props: ItemLangProps) {
  // ** Props
  const { name, label } = props

  const query = useCommonLang()
  const { t } = useTranslation()

  const formCtx = useFormContext()
  const { control } = formCtx

  const { field, fieldState } = useController({
    name,
    control,
    defaultValue: ''
  })

  const { error } = fieldState

  const lang_list = query.data?.lang_list || []
  const model = lang_list.find(lang => lang.code === field.value)

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
        options={lang_list}
        getOptionLabel={item => item.name}
        renderInput={props => <TextField {...props} label={t(label)} error={!!error} />}
        {...field}
        value={model || null}
        onChange={(evt, v) => {
          void evt
          field.onChange(v?.code || null)
        }}
      ></Autocomplete>
      {error && <FormHelperText>{error.message}</FormHelperText>}
    </FormControl>
  )
}

interface ItemLangProps {
  name: string
  label: string
}
