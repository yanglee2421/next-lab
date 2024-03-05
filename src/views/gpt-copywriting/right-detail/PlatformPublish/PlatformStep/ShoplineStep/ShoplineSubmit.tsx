import { DoneAllOutlined } from '@mui/icons-material'

import { useFormContext } from 'react-hook-form'

import { toast } from 'react-toastify'

import { TLoadingButton } from '@/components'
import { useShoplineBlogCreate } from '@/hooks/api-stg/useShoplineBlogCreate'
import type { FormValues } from './types'


import { useStep } from '../../StepContext'

export function ShoplineSubmit() {
  const step = useStep()
  const mutation = useShoplineBlogCreate()
  const formCtx = useFormContext<FormValues>()

  const handleClick = formCtx.handleSubmit(data => {
    mutation.mutate(
      {
        data: {
          blog_collection_id: String(data.blog?.id || ''),

          author: data.author,
          image_link: data.image_link || '',
          published: data.published,

          title: data.title,
          content_html: data.content_html,
          tags: data.tags
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
  })

  return (
    <TLoadingButton
      onClick={handleClick}
      loading={mutation.isPending}
      variant='contained'
      startIcon={<DoneAllOutlined />}
    >
      comfirm
    </TLoadingButton>
  )
}

export interface ShoplineSubmitProps {
  onSuccess(): void
}
