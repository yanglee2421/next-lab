import { DoneAllOutlined } from '@mui/icons-material'

import { useFormContext } from 'react-hook-form'

import { toast } from 'react-toastify'

import { TLoadingButton } from '@/components'
import { useShopifyProductUpdate } from '@/hooks/api-stg/useShopifyProductUpdate'
import type { FormValues } from '../../../types'


import { useStep } from '../../../StepContext'

export function ShopifyUpdate() {
  const mutation = useShopifyProductUpdate()
  const formCtx = useFormContext<FormValues>()
  const step = useStep()

  return (
    <TLoadingButton
      onClick={formCtx.handleSubmit(data => {
        mutation.mutate(
          {
            data: {
              title: data.title || data.product?.title || '',
              body_html: data.description || data.product?.body_html || '',
              tags: data.keywords || data.product?.tags || []
            },
            headers: {
              'site-connection-id': step.store?.connection_id,
              'product-id': data.product?.id
            }
          },
          {
            onError(error) {
              toast.error(error.message)
            },
            onSuccess() {
              toast.success('Update product successlly!')
              formCtx.reset()
              step.setStep(0)
              step.setOpen(false)
              step.setStore(null)
            }
          }
        )
      })}
      loading={mutation.isPending}
      variant='contained'
      startIcon={<DoneAllOutlined />}
    >
      update
    </TLoadingButton>
  )
}
