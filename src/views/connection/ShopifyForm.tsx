import { CardActions, CardContent, FormControlLabel, Grid, FormGroup, Typography, Link } from '@mui/material'
import { LanOutlined } from '@mui/icons-material'
import { useForm, FormProvider } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { toast } from 'react-toastify'

import { TLoadingButton } from '@/components'
import { ShopifyUrlInput } from './ShopifyUrlInput'
import { useConnectionShopify } from '@/hooks/api-stg/useConnectionShopify'
import { ItemCheckbox } from '@components/form'

export function ShopifyForm() {
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

  const mutation = useConnectionShopify()

  const handleSubmit = formCtx.handleSubmit(data => {
    mutation.mutate(
      {
        data: {
          site_url: `${data.handle}.myshopify.com`,
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
          <Grid item xs={12}>
            <Typography>
              For WarpDriven Recommendation System, please install{' '}
              <Link
                href='https://apps.shopify.com/warpdriven-gpt-copywriting'
                target='https://apps.shopify.com/warpdriven-gpt-copywriting'
              >
                WarpDrivenAI eCommerce Copilot
              </Link>{' '}
              App
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <ShopifyUrlInput name='handle'></ShopifyUrlInput>
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
