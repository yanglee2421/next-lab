import { FormControl, Select, MenuItem, InputLabel } from '@mui/material'
import { useController, useFormContext } from 'react-hook-form'

import { z } from 'zod'

import { useListPrice } from '@/hooks/api-nuwa/useListPrice'

export function CurrencySelect() {
  const formCtx = useFormContext()

  const controller = useController({
    control: formCtx.control,
    name: 'target_currency',
    defaultValue: ''
  })

  const query = useListPrice({
    source_currency: 'AUD'
  })

  if (query.isPending) {
    return null
  }

  if (query.isError) {
    console.error(query.error)

    return null
  }

  const parseRes = schema.safeParse(query.data)

  if (!parseRes.success) {
    console.error(parseRes.error)

    return null
  }

  return (
    <FormControl fullWidth size='small'>
      <InputLabel>Currency</InputLabel>
      <Select {...controller.field} label='Currency'>
        {Object.entries(parseRes.data).map(([key, value]) => {
          return <MenuItem key={key} value={key}>{`${key} (${value})`}</MenuItem>
        })}
      </Select>
    </FormControl>
  )
}

const schema = z.record(z.string())
