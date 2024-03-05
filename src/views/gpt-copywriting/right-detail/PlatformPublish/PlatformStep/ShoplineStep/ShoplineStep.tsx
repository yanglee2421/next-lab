import { useForm, FormProvider } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { useStep } from '../../StepContext'
import { ShoplineList } from './ShoplineList'
import { ShoplineForm } from './ShoplineForm'

export function ShoplineStep() {
  const step = useStep()

  const formCtx = useForm({
    defaultValues: {
      // @ts-ignore
      blog: null,

      author: '',
      image_link: '',
      published: true,

      title: step.data?.output.title || '',
      tags: step.data?.output.keywords || [],
      content_html: step.data?.output.description || ''
    },

    resolver: yupResolver(
      yup.object().shape({
        author: yup.string().max(128).required(),
        image_link: yup.string().url().max(256),
        published: yup.boolean().required(),

        title: yup.string().max(256).required(),
        tags: yup.array().of(yup.string().required()).required(),
        content_html: yup.string().max(5000).required()
      })
    )
  })

  return (
    <FormProvider {...formCtx}>
      {(() => {
        switch (step.step) {
          case 1:
            return <ShoplineList></ShoplineList>
          case 2:
            return <ShoplineForm></ShoplineForm>
          default:
            return null
        }
      })()}
    </FormProvider>
  )
}
