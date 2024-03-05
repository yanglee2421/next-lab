import { CardContent, CardActions, Grid } from '@mui/material'
import { LanOutlined } from '@mui/icons-material'
import { useForm, FormProvider } from 'react-hook-form'

import { toast } from 'react-toastify'

import { z } from 'zod'

import { zodResolver } from '@hookform/resolvers/zod'

import { TLoadingButton } from '@/components'
import { ItemText } from '@components/form'
import { useAli1688Connect } from '@/hooks/api-stg/useAli1688Connect'

export function Ali1688Form() {
  const formCtx = useForm<FormValues>({
    defaultValues: {
      app_key: '',
      app_secret: ''
    },

    resolver: zodResolver(schema)
  })

  const mutation = useAli1688Connect()

  const handleSubmit = formCtx.handleSubmit(data => {
    mutation.mutate(
      {
        data
      },
      {
        onError(error) {
          toast.error(error.message)
        },
        onSuccess(data) {
          setTimeout(() => {
            window.open(data.auth_url, '_parent')
          }, 16)
        }
      }
    )
  })

  return (
    <FormProvider {...formCtx}>
      <CardContent>
        <Grid container spacing={6}>
          <Grid item xs={12} sm={6}>
            <ItemText name='app_key' label='App Key'></ItemText>
          </Grid>
          <Grid item xs={12} sm={6}>
            <ItemText name='app_secret' label='App Secret'></ItemText>
          </Grid>
        </Grid>
      </CardContent>

      <CardActions>
        <TLoadingButton
          onClick={handleSubmit}
          loading={mutation.isPending}
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
  app_key: z.string().min(1).max(256),
  app_secret: z.string().min(1).max(256)
})

type FormValues = z.infer<typeof schema>
