import { DoneAllOutlined } from '@mui/icons-material'
import { useController, useFormContext } from 'react-hook-form'

import { toast } from 'react-toastify'

import type { FormValues } from './types'
import { useWooProductCreate } from '@/hooks/api-stg/useWooProductCreate'
import { useWooProductUpdate } from '@/hooks/api-stg/useWooProductUpdate'
import { TLoadingButton } from '@/components'
import { useStep } from '../../StepContext'

export function WooSubmit() {
  const formCtx = useFormContext<FormValues>()

  const productController = useController({
    control: formCtx.control,
    name: 'product.id'
  })

  if (productController.field.value) {
    return <WooUpdate />
  }

  return <WooCreate />
}

function WooCreate() {
  const step = useStep()
  const mutation = useWooProductCreate()
  const formCtx = useFormContext<FormValues>()

  return (
    <TLoadingButton
      onClick={formCtx.handleSubmit(data => {
        mutation.mutate(
          {
            data: {
              title: data.title || data.product?.name || '',
              body_html: data.description || data.product?.description || '',
              images: data.product?.images || [],
              tags: data.keywords
                ? data.keywords.map((keyword, idx) => {
                    return {
                      id: idx,
                      name: keyword,
                      slug: keyword.toLowerCase()
                    }
                  })
                : data.product?.tags || []
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

function WooUpdate() {
  const step = useStep()
  const mutation = useWooProductUpdate()
  const formCtx = useFormContext<FormValues>()

  return (
    <TLoadingButton
      onClick={formCtx.handleSubmit(data => {
        mutation.mutate(
          {
            data: {
              title: data.title || data.product?.name || '',
              body_html: data.description || data.product?.description || '',
              images: data.product?.images || [],
              tags: data.keywords
                ? data.keywords.map((keyword, idx) => {
                    return {
                      id: idx,
                      name: keyword,
                      slug: keyword.toLowerCase()
                    }
                  })
                : data.product?.tags || []
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
