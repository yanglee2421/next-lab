import React from 'react'

import { useSearchParams } from 'next/navigation'

import { RadioGroup, Radio, FormControlLabel } from '@mui/material'

import { useFormContext, useController } from 'react-hook-form'

import { ListLoader } from '@components/ui/ListLoader'
import { ErrorAlert, ScrollView } from '@/components/ui'
import { useShoplineCollections } from '@/hooks/api-stg'

export function TreeList() {
  const searchParams = useSearchParams()
  const connection_id = searchParams.get('connection_id')
  const query = useShoplineCollections(Number(connection_id))

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
    return <ErrorAlert titleNode='Fetch data failed'>{query.error.message}</ErrorAlert>
  }

  return (
    <ScrollView maxHeight={490}>
      <RadioGroup
        {...controller.field}
        value={controller.field.value || 'all'}
        onChange={(evt, v) => {
          void evt

          if (v === 'all') {
            controller.field.onChange(void 0)

            return
          }

          controller.field.onChange(v)
        }}
      >
        <FormControlLabel value='all' label='all' control={<Radio></Radio>}></FormControlLabel>
        {query.data.collections.map(item => {
          return (
            <FormControlLabel
              key={item.id}
              value={item.id}
              label={item.title}
              control={<Radio></Radio>}
            ></FormControlLabel>
          )
        })}
      </RadioGroup>
    </ScrollView>
  )
}
