'use client'

import { Button, Card, CardContent, CardHeader, Grid, InputAdornment, Typography } from '@mui/material'
import { AccountBoxOutlined, EmailOutlined, SendOutlined, RefreshOutlined, TitleOutlined } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { ItemText } from '@/components/form'
import { useTicketCreate } from '@/hooks/api-erp/useTicketCreate'

export function Ticket() {
  const formCtx = useForm<FormValues>({
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      description: ''
    },

    resolver: zodResolver(schema)
  })

  const mutation = useTicketCreate()

  const handleReset = () => {
    formCtx.reset()
  }

  const handleSubmit = formCtx.handleSubmit(data => {
    mutation.mutate({ data })
  })

  return (
    <Card>
      <CardHeader
        title='Create Ticket'
        subheader={
          <>
            <Typography variant='body2'>Contact us about anything related to our company or services.</Typography>
            <Typography variant='body2'>We'll do our best to get back to you as soon as possible.</Typography>
          </>
        }
      />
      <CardContent component={'form'} onSubmit={handleSubmit} onReset={handleReset} noValidate autoComplete='off'>
        <FormProvider {...formCtx}>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <ItemText
                name='name'
                label='Name'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <AccountBoxOutlined></AccountBoxOutlined>
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <ItemText
                name='email'
                label='Email'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <EmailOutlined></EmailOutlined>
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <ItemText
                name='subject'
                label='Subject'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <TitleOutlined></TitleOutlined>
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <ItemText name='description' label='Description' multiline minRows={8} maxRows={12} />
            </Grid>
            <Grid item xs={12} display={'flex'} gap={3}>
              <LoadingButton
                loading={mutation.isPending}
                type='submit'
                variant='contained'
                startIcon={<SendOutlined></SendOutlined>}
              >
                submit
              </LoadingButton>
              <Button type='reset' variant='outlined' startIcon={<RefreshOutlined></RefreshOutlined>}>
                reset
              </Button>
            </Grid>
          </Grid>
        </FormProvider>
      </CardContent>
    </Card>
  )
}

const schema = z.object({
  name: z.string().min(1).max(256),
  email: z.string().email().max(256),
  subject: z.string().min(1).max(256),
  description: z.string().min(1).max(1000)
})

type FormValues = z.infer<typeof schema>
