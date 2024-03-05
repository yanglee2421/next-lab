import React from 'react'

import { useSearchParams } from 'next/navigation'

import { RadioGroup, Radio, FormControlLabel } from '@mui/material'

import { useFormContext, useController } from 'react-hook-form'

import { ErrorAlert, ScrollView } from '@/components/ui'
import { ListLoader } from '@components/ui/ListLoader'
import { useWooProductCollection } from '@/hooks/api-stg'
import type { FormValues } from './types'

export function TreeList() {
  const searchParams = useSearchParams()
  const connection_id = searchParams.get('connection_id')

  const query = useWooProductCollection(Number(connection_id))

  const formCtx = useFormContext<FormValues>()

  const collectionIdController = useController({
    control: formCtx.control,
    name: 'collection_id',
    defaultValue: ''
  })

  if (query.isPending) {
    return <ListLoader />
  }

  if (query.isError) {
    return <ErrorAlert titleNode={'Fetch data failed'}>{query.error.message}</ErrorAlert>
  }

  return (
    <ScrollView maxHeight={490}>
      <RadioGroup
        {...collectionIdController.field}
        value={collectionIdController.field.value || 'all'}
        onChange={(evt, id) => {
          if (id === 'all') {
            collectionIdController.field.onChange('')

            return evt
          }

          collectionIdController.field.onChange(id)
        }}
      >
        <FormControlLabel value='all' label='all' control={<Radio></Radio>}></FormControlLabel>
        {query.data.map(item => {
          return (
            <FormControlLabel
              key={item.id}
              value={item.id}
              label={item.name}
              control={<Radio></Radio>}
            ></FormControlLabel>
          )
        })}
      </RadioGroup>
    </ScrollView>
  )
}
