import { DoneAllOutlined } from '@mui/icons-material'

import { useFormContext } from 'react-hook-form'

import { toast } from 'react-toastify'

import { TLoadingButton } from '@/components'
import { useShopifyProductCreate } from '@/hooks/api-stg/useShopifyProductCreate'
import type { FormValues } from '../../../types'


import { useStep } from '../../../StepContext'

export function ShopifyCreate() {
  const mutation = useShopifyProductCreate()
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
              'site-connection-id': step.store?.connection_id
            }
          },
          {
            onError(error) {
              toast.error(error.message)
            },
            onSuccess() {
              toast.success('Create product successlly!')
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
      create
    </TLoadingButton>
  )
}
