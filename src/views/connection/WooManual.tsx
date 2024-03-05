import { Box, CardActions, CardContent, Grid, Link, Typography } from '@mui/material'
import { LanOutlined } from '@mui/icons-material'

import { useForm, FormProvider } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { toast } from 'react-toastify'

import { useWooConnect } from '@/hooks/api-stg/useWooConnect'
import type { Data } from '@/api/api-stg/woo_connect'
import { TLoadingButton } from '@/components'
import { ItemText } from '@components/form'

export function WooManual() {
  const formCtx = useForm<Data>({
    defaultValues: {
      site_url: '',
      consumer_key: '',
      consumer_secret: ''
    },

    resolver: yupResolver(
      yup.object().shape({
        site_url: yup.string().url().required(),
        consumer_key: yup.string().max(128).required(),
        consumer_secret: yup.string().max(128).required()
      })
    )
  })

  const mutation = useWooConnect()

  const handleSubmit = formCtx.handleSubmit(data => {
    mutation.mutate(
      { data },
      {
        onError(error) {
          toast.error(error.message)
        },
        onSuccess() {
          toast.success('Connect successlly!')
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
                href='https://wordpress.org/plugins/warp-driven-visual-search'
                target='https://wordpress.org/plugins/warp-driven-visual-search'
              >
                WarpDriven Recommender Plugin
              </Link>{' '}
              first
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <ItemText name='site_url' label={'Shop URL'} type='url' />
          </Grid>
          <Grid item xs={12} sm={6}>
            <ItemText name='consumer_key' label={'API Key'} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <ItemText name='consumer_secret' label={'Secret'} />
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        <Box
          width={'100%'}
          display={'flex'}
          flexWrap={'wrap'}
          justifyContent={'space-between'}
          alignItems={'center'}
          rowGap={3}
        >
          <TLoadingButton
            onClick={handleSubmit}
            loading={mutation.isPending}
            variant='contained'
            startIcon={<LanOutlined></LanOutlined>}
          >
            connect
          </TLoadingButton>
        </Box>
      </CardActions>
    </FormProvider>
  )
}
