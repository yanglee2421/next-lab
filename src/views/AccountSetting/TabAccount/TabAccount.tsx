'use client'

import { Grid, Card, CardContent, Button } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { FormProvider } from 'react-hook-form'

import { useTranslation } from 'react-i18next'

import { SkeletonCard } from '@/components/ui'
import { ItemText } from '@/components/form'
import { ItemCountry } from '../ItemCountry'
import { ItemImgHeader } from '../ItemImgHeader'
import { ItemLang } from '../ItemLang'
import { ItemState } from '../ItemState'
import { useSubmitPost, useEditForm } from './hooks'

export function TabAccount() {
  const { t } = useTranslation()
  const formCtx = useEditForm()
  const mutation = useSubmitPost()

  const handleSubmit = formCtx.handleSubmit(async data => {
    mutation.mutate(data)
  })

  const handleReset = () => formCtx.reset()

  if (formCtx.formState.isLoading) {
    return <SkeletonCard></SkeletonCard>
  }

  return (
    <Card component={'form'} onSubmit={handleSubmit} onReset={handleReset} noValidate autoComplete='off'>
      <FormProvider {...formCtx}>
        <CardContent>
          <ItemImgHeader name={'image_1920'} />
        </CardContent>
        <CardContent>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={6}>
              <ItemText name={'name'} label='Name' />
            </Grid>

            <Grid item xs={12} sm={6}>
              <ItemText name={'street'} label='Street' />
            </Grid>
            <Grid item xs={12} sm={6}>
              <ItemText name={'street2'} label='Street2' />
            </Grid>
            <Grid item xs={12} sm={6}>
              <ItemText name={'city'} label='City' />
            </Grid>
            <Grid item xs={12} sm={6}>
              <ItemState name={'state_id'} label='State' />
            </Grid>
            <Grid item xs={12} sm={6}>
              <ItemCountry name={'country_id'} label='Country' />
            </Grid>
            <Grid item xs={12} sm={6}>
              <ItemText name={'zip'} label='Zip' />
            </Grid>
            <Grid item xs={12} sm={6}>
              <ItemText name={'vat'} label='Vat' />
            </Grid>
            <Grid item xs={12} sm={6}>
              <ItemText name={'email'} label='Contact Email' type='email' />
            </Grid>
            <Grid item xs={12} sm={6}>
              <ItemText name={'website'} label='Website' type='url' />
            </Grid>
            <Grid item xs={12} sm={6}>
              <ItemText name={'phone'} label='Phone' type='tel' />
            </Grid>
            <Grid item xs={12} sm={6}>
              <ItemText name={'mobile'} label='Mobile' type='tel' />
            </Grid>
            <Grid item xs={12} sm={6}>
              <ItemLang name={'lang'} label='Language' />
            </Grid>

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
