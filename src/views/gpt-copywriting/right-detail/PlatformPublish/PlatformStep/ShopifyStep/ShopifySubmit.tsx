import { DoneAllOutlined } from '@mui/icons-material'

import { useFormContext } from 'react-hook-form'

import { toast } from 'react-toastify'

import { TLoadingButton } from '@/components'
import { useShopifyBlogCreate } from '@/hooks/api-stg/useShopifyBlogCreate'
import type { FormValues } from './types'


import { useStep } from '../../StepContext'

export function ShopifySubmit() {
  const step = useStep()
  const mutation = useShopifyBlogCreate()
  const formCtx = useFormContext<FormValues>()

  return (
    <TLoadingButton
      onClick={formCtx.handleSubmit(data => {
        mutation.mutate(
          {
            data: {
              blog_id: Number(data.blog?.id || 0),

              handle: data.title.toLowerCase(),
              author: data.author,
              image: data.image,
              published: data.published,

              title: data.title,
              content_html: data.content_html,
              tags: data.tags.join(', ')
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
              toast.success('Create post successlly!')
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
      comfirm
    </TLoadingButton>
  )
}
