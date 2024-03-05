import { Box, CardActions, CardContent, Grid, Link, Typography } from '@mui/material'
import { LanOutlined } from '@mui/icons-material'
import { useForm, FormProvider } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { TLoadingButton } from '@/components'
import { useAuthLocalStore } from '@/hooks/store/useAuthLocalStore'
import { ItemText } from '@components/form'

export function WooAutomatic() {
  const formCtx = useForm({
    defaultValues: {
      site_url: ''
    },

    resolver: yupResolver(
      yup.object().shape({
        site_url: yup.string().url().max(256).required()
      })
    )
  })

  const accessToken = useAuthLocalStore(store => store.accessToken)

  const handleSubmit = formCtx.handleSubmit(data => {
    const url = new URL(data.site_url)

    url.pathname = '/wc-auth/v1/authorize'
    url.searchParams.set('app_name', 'WarpDriven AI')
    url.searchParams.set('scope', 'read_write')

    // Set access_token as user_id
    url.searchParams.set(
      'user_id',
      JSON.stringify({
        secret: accessToken,
        site_url: new URL(data.site_url).origin
      })
    )

    // Set return url
    url.searchParams.set('return_url', window.location.origin)

    // Set webhook callback url
    url.searchParams.set(
      'callback_url',
      new URL('/connection/woocommerce/auth/callback', process.env.NEXT_PUBLIC_API_SERVICE).href
    )

    // Redirect window
    window.open(url, '_parent')
  })

  return (
    <FormProvider {...formCtx}>
      <CardContent>
        <Grid container spacing={6}>
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
            <ItemText name='site_url' label='Site URL' type='url' />
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
          <TLoadingButton onClick={handleSubmit} variant='contained' startIcon={<LanOutlined></LanOutlined>}>
            connect
          </TLoadingButton>
        </Box>
      </CardActions>
    </FormProvider>
  )
}
