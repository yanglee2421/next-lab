import React from 'react'

import { useSearchParams } from 'next/navigation'

import { RadioGroup, FormControlLabel, Radio } from '@mui/material'

import { useFormContext, useController } from 'react-hook-form'

import { ScrollView, ErrorAlert } from '@/components/ui'
import { useShopifyCollections } from '@/hooks/api-stg'

import { ListLoader } from '@/components/ui/ListLoader'

export function TreeList() {
  const searchParams = useSearchParams()
  const connection_id = searchParams.get('connection_id')

  const query = useShopifyCollections(Number(connection_id))

  const formCtx = useFormContext()

  const controller = useController({
    name: 'collection_id',
    control: formCtx.control,
    defaultValue: void 0
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
        {...controller.field}
        value={controller.field.value || 'all'}
        onChange={(evt, v) => {
          if (v === 'all') {
            controller.field.onChange(void evt)

            return
          }

          controller.field.onChange(v)
        }}
      >
        <FormControlLabel control={<Radio value='all'></Radio>} label='all'></FormControlLabel>
        {query.data.collections.map(item => {
          return (
            <FormControlLabel
              key={item.collection_id}
              value={String(item.collection_id)}
              control={<Radio></Radio>}
              label={item.collection_title}
            ></FormControlLabel>
          )
        })}
      </RadioGroup>
    </ScrollView>
  )
}
