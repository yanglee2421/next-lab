import React from 'react'

import { Autocomplete, TextField } from '@mui/material'

import { useController, useFormContext, useWatch } from 'react-hook-form'

import { useCollectionList } from '@/hooks/api-nuwa/useCollectionList'

import type { FormValues } from '@/views/intellimerch/SearchForm'

export function CategoryAutocomplete() {
  const formCtx = useFormContext<FormValues>()

  const controller = useController({
    control: formCtx.control,
    name: 'categoryId',
    defaultValue: ''
  })

  const siteConnectionId = useWatch({
    control: formCtx.control,
    name: 'siteConnectionId',
    defaultValue: ''
  })

  const query = useCollectionList(siteConnectionId)

  if (!siteConnectionId) {
    return null
  }

  return (
    <Autocomplete
      value={
        query.data?.collections.find(item => {
          return Object.is(item.collection_id, Number(controller.field.value))
        }) || null
      }
      onChange={(evt, value) => {
        void evt
        controller.field.onChange(value ? String(value.collection_id) : '')
      }}
      loading={query.isPending}
      options={query.data?.collections || []}
      renderInput={params => <TextField {...params} label='Category' size='small'></TextField>}
      getOptionKey={option => option.collection_id}
      getOptionLabel={value => value.collection_title}
      isOptionEqualToValue={(option, value) => Object.is(option.collection_id, value?.collection_id)}
    ></Autocomplete>
  )
}
