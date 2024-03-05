import { FormControl, InputLabel, MenuItem, Select, FormHelperText } from '@mui/material'
import { useController, useFormContext, useWatch } from 'react-hook-form'

import { useCollectionList } from '@/hooks/api-nuwa/useCollectionList'
import type { FormValues } from './ECommerceForm'

export function CollectionSelect() {
  const formCtx = useFormContext<FormValues>()

  const controller = useController({
    control: formCtx.control,
    name: 'collection_id',
    defaultValue: 0
  })

  const eCommerceShop = useWatch({
    control: formCtx.control,
    name: 'eCommerceShop'
  })

  const query = useCollectionList(eCommerceShop)

  return (
    <FormControl fullWidth size='small'>
      <InputLabel>Collection</InputLabel>
      <Select
        {...controller.field}
        value={String(controller.field.value || '')}
        onChange={evt => {
          controller.field.onChange(Number(evt.target.value))
        }}
        label='Collection'
      >
        {query.data?.collections.map(item => {
          return (
            <MenuItem key={item.collection_id} value={item.collection_id}>
              {item.collection_title}
            </MenuItem>
          )
        })}
      </Select>
      {controller.fieldState.error && (
        <FormHelperText error={!!controller.fieldState.error}>{controller.fieldState.error.message}</FormHelperText>
      )}
    </FormControl>
  )
}
