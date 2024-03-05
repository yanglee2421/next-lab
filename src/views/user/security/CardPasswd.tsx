'use client'

import { Card, CardHeader, CardContent, Grid, Typography, Box, Button } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { useTranslation } from 'react-i18next'

import { toast } from 'react-toastify'

import { useSetpdPost } from '@/hooks/api-erp/useSetpdPost'
import { ItemPassword } from '@/components/form'

export function CardPasswd() {
  const { t } = useTranslation()

  const formCtx = useForm({
    defaultValues: {
      old_passwd: '',
      new_passwd: '',
      confrimPasswd: ''
    },

    resolver: zodResolver(schema)
  })

  const mutation = useSetpdPost()

  return (
    <Card
      component={'form'}
      onSubmit={formCtx.handleSubmit(
        data => {
          return new Promise<void>(resolve => {
            mutation.mutate(data, {
              onSettled() {
                resolve()
              },
              onError(error) {
                toast.error(error.message)
              },
              onSuccess() {
                toast.success('Reset new password success, Please login with new password')
              }
            })
          })
        },
        error => {
          console.error(error)
        }
      )}
      onReset={() => {
        formCtx.reset()
      }}
    >
      <FormProvider {...formCtx}>
        <CardHeader title={t('Change Password')}></CardHeader>
        <CardContent>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={6}>
              <ItemPassword name='old_passwd' label={t('Password')} />
            </Grid>
          </Grid>
          <Grid container spacing={5} marginTop={1}>
            <Grid item xs={12} sm={6}>
              <ItemPassword name='new_passwd' label={t('New Password')} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <ItemPassword name='confrimPasswd' label={t('Confirm Password')} />
            </Grid>
            <Grid item xs={12}>
              <Typography sx={{ mt: 1, color: 'text.secondary' }}>{t('Password Requirements')}:</Typography>
              <Box
                component='ul'
                sx={{
                  pl: 4,
                  mb: 0,
                  '& li': {
                    mb: 4,
                    color: 'text.secondary',
                    '&::marker': { fontSize: '1.25rem' }
                  }
                }}
              >
                <li>{t('Minimum 8 characters long - the more, the better')}</li>
                <li>{t('At least one lowercase & one uppercase character')}</li>
                <li>{t('At least one number, symbol, or whitespace character')}</li>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <LoadingButton loading={mutation.isPending} variant='contained' sx={{ mr: 3 }} type='submit'>
                {t('save changes')}
              </LoadingButton>
              <Button variant='outlined' color='secondary' type='reset'>
                {t('reset')}
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </FormProvider>
    </Card>
  )
}

const schema = z
  .object({
    old_passwd: z.string().min(8).max(64),
    new_passwd: z.string().min(8).max(64),
    confrimPasswd: z.string().min(8).max(64)
  })
  .refine(value => value.new_passwd === value.confrimPasswd, {
    message: 'The two entered passwords do not match',
    path: ['confrimPasswd']
  })
