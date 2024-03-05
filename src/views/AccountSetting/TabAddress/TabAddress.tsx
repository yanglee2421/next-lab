'use client'

import { Button, Card, CardContent, CardHeader, Grid } from '@mui/material'
import { LoadingButton } from '@mui/lab'

import { useForm, FormProvider } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'

import * as yup from 'yup'

import { ItemCountry } from '../ItemCountry'
import { ItemState } from '../ItemState'
import { SkeletonCard } from '@/components/ui'
import { ItemText } from '@/components/form'
import { useAddressPost } from '@/hooks/api-erp'
import { usr_get_invoice_address } from '@/api/api-erp'

export function TabAddress() {
  const { t } = useTranslation()
  const queryClient = useQueryClient()
  const mutation = useAddressPost()

  const formCtx = useForm({
    async defaultValues() {
      try {
        const data = await queryClient.fetchQuery({
          queryKey: ['usr_get_invoice_address'],
          queryFn: usr_get_invoice_address
        })

        return addressSchem.cast(data)
      } catch (error) {
        console.error(error)

        return addressSchem.cast({})
      }
    },

    resolver: yupResolver(addressSchem)
  })

  const handleSubmit = formCtx.handleSubmit(
    data => {
      // @ts-ignore
      mutation.mutate({ data })
    },
    error => {
      console.error(error)
    }
  )

  const handleReset = () => formCtx.reset()

  if (formCtx.formState.isLoading) {
    return <SkeletonCard></SkeletonCard>
  }

  return (
    <Card component={'form'} onSubmit={handleSubmit} onReset={handleReset} noValidate autoComplete='off'>
      <FormProvider {...formCtx}>
        <CardHeader title={t('Billing Address')} />
        <CardContent>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6}>
              <ItemText name='name' label='Name' />
            </Grid>

            <ItemText name='email' label='Contact Email' type='email' />
            <ItemText name='phone' label='Phone' />
            <ItemText name='mobile' label='Mobile' />
            <ItemCountry name='country_id' label='Country' />
            <ItemState name='state_id' label='State' />
            <ItemText name='city' label='City' />
            <ItemText name='street' label='Street' />
            <ItemText name='street2' label='Street2' />
            <Grid item xs={12}>
              <LoadingButton loading={mutation.isPending} type='submit' variant='contained' sx={{ mr: 4 }}>
                {t('save changes')}
              </LoadingButton>
              <Button type='reset' variant='outlined' color='secondary'>
                {t('reset')}
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </FormProvider>
    </Card>
  )
}

const stringNullable = yup
  .string()
  .trim()
  .nullable()
  .default(null)
  .transform((v, o) => (o ? String(v) : null))

const numberNullable = yup
  .number()
  .nullable()
  .default(null)
  .transform((v, o) => (o ? Number(v) : null))

const addressSchem = yup.object().shape({
  name: stringNullable,
  email: stringNullable,
  phone: stringNullable,
  mobile: stringNullable,
  country_id: numberNullable,
  state_id: numberNullable,
  city: stringNullable,
  street: stringNullable,
  street2: stringNullable
})
