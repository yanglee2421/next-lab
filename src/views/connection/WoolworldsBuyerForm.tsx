import { CardActions, CardContent, Grid } from '@mui/material'
import { LanOutlined } from '@mui/icons-material'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { toast } from 'react-toastify'

import { ItemPassword, ItemText } from '@/components/form'
import { TLoadingButton } from '@/components'
import { useIscConnect } from '@/hooks/api-stg/useIscConnect'

export function WoolworldsBuyerForm() {
  const formCtx = useForm<FormValues>({
    defaultValues: {
      user_type: 1,
      email: '',
      password: ''
    },

    resolver: zodResolver(schema)
  })

  const mutation = useIscConnect()

  const handleSubmit = formCtx.handleSubmit(data => {
    return new Promise<void>(resolve => {
      mutation.mutate(
        { data },
        {
          onSettled() {
            resolve()
          },
          onError(error) {
            toast.error(error.message)
          },
          onSuccess(data) {
            console.log(data)
          }
        }
      )
    })
  })

  return (
    <FormProvider {...formCtx}>
      <CardContent>
        <Grid container spacing={6}>
          <Grid item xs={12} sm={6}>
            <ItemText name='email' label='Email' autoComplete='off' inputMode='email'></ItemText>
          </Grid>
          <Grid item xs={12} sm={6}>
            <ItemPassword name='password' label='Password' autoComplete='off' inputMode='text'></ItemPassword>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        <TLoadingButton
          onClick={handleSubmit}
          loading={formCtx.formState.isSubmitting}
          variant='contained'
          startIcon={<LanOutlined></LanOutlined>}
        >
          connect
        </TLoadingButton>
      </CardActions>
    </FormProvider>
  )
}

const schema = z.object({
  user_type: z.number(),
  email: z.string().email(),
  password: z.string().min(1)
})

type FormValues = z.infer<typeof schema>
