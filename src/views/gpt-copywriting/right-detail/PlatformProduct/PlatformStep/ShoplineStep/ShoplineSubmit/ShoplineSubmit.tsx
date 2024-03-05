import { useFormContext, useWatch } from 'react-hook-form'

import type { FormValues } from '../../../types'
import { ShoplineUpdate } from './ShoplineUpdate'
import { ShoplineCreate } from './ShoplineCreate'

export function ShoplineSubmit() {
  const formCtx = useFormContext<FormValues>()

  const product_id = useWatch({
    control: formCtx.control,
    name: 'product.id'
  })

  if (product_id) {
    return <ShoplineUpdate />
  }

  return <ShoplineCreate />
}
