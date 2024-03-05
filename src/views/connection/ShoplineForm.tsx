import React from 'react'

import { CardActions, CardContent, FormControlLabel, FormGroup, Grid } from '@mui/material'
import { LanOutlined } from '@mui/icons-material'
import { useForm, FormProvider } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { toast } from 'react-toastify'

import { ShoplineUrlInput } from './ShoplineUrlInput'
import { TLoadingButton } from '@/components'
import { useConnectionShopline } from '@/hooks/api-stg/useConnectionShopline'


import { ItemCheckbox } from '@components/form'

export function ShoplineForm() {
  const formCtx = useForm({
    defaultValues: {
      handle: '',
      scopes: [1, 2]
    },
    resolver: yupResolver(
      yup.object().shape({
        handle: yup.string().max(128).required(),
        scopes: yup.array().of(yup.number().integer().required()).min(1).required()
      })
    )
  })

  const mutation = useConnectionShopline()

  const handleSubmit = formCtx.handleSubmit(data => {
    mutation.mutate(
      {
        data: {
          site_url: `${data.handle}.myshopline.com`,
          scopes: data.scopes
        }
      },
      {
        onError(error) {
          toast.error(error.message)
        },
        onSuccess(data) {
          setTimeout(() => {
            window.open(data.auth_url, '_parent')
          }, 0)
        }
      }
    )
  })

  return (
    <FormProvider {...formCtx}>
      <CardContent>
        <Grid container spacing={5}>
          <Grid item xs={6}>
            <ShoplineUrlInput name='handle'></ShoplineUrlInput>
          </Grid>
          <Grid item xs={12}>
            <FormGroup row>
              <FormControlLabel
                control={<ItemCheckbox name='scopes' value={1}></ItemCheckbox>}
                label='GPT Copywriting'
              ></FormControlLabel>
              <FormControlLabel
                control={<ItemCheckbox name='scopes' value={2}></ItemCheckbox>}
                label='Recommendation System'
              ></FormControlLabel>
              <FormControlLabel
                control={<ItemCheckbox name='scopes' value={4}></ItemCheckbox>}
                label='ERP'
              ></FormControlLabel>
            </FormGroup>
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
