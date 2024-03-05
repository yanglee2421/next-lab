import React from 'react'

import NextJsLink from 'next/link'

import { useParams, useSearchParams } from 'next/navigation'

import type { CardProps } from '@mui/material'
import { Card, CardHeader, CardContent, Grid, Link, CardActions, Box } from '@mui/material'
import { LoadingButton } from '@mui/lab'

import { useForm, FormProvider } from 'react-hook-form'

import { yupResolver } from '@hookform/resolvers/yup'

import { useTranslation } from 'react-i18next'

import { TLink, TTypography } from '@/components'

import { toTitle, tolinkText, toItems, toSchema } from '../utils'
import type { FormValues } from '../types'
import { useCopywritingStore } from '@/hooks/store/useCopywritingStore'

import { useMyConnections } from '@/hooks/api-stg/useMyConnections'
import { toGptParams } from './to-gpt-params'

import { useGptAssistant } from '@/hooks/api-nlp/useGptAssistant'
import { useGptWrite } from '@/hooks/api-nlp/useGptWrite'

export function CardLeft(props: CardLeftProps) {
  const { hiddenShadow, ...restProps } = props

  const searchParams = useSearchParams()
  const { t } = useTranslation()
  const tab = useCopywritingStore(s => s.tab)
  const isProd = useCopywritingStore(s => s.isProd)
  const setIsProdToggle = useCopywritingStore(s => s.setIsProdToggle)

  const site_info_id = searchParams.get('site_info_id')

  const formCtx = useForm<FormValues>({
    defaultValues: {
      product: [],
      desc: '',
      lang: null,
      isTitle: true,
      isDesc: true,
      isKeywords: true,
      titleLimit: null,
      descLimit: null,
      words: null,
      system: null,
      assistant: null,
      user: ''
    },

    // @ts-ignore
    resolver: yupResolver(toSchema(tab, isProd))
  })

  const params = useParams()
  const assistantMutation = useGptAssistant()
  const writerMutation = useGptWrite()
  const storesQuery = useMyConnections({ is_list_all: false, site_type: 1 })

  if (storesQuery.isPending) {
    return null
  }

  if (storesQuery.isError) {
    return null
  }

  return (
    <Card
      component={'form'}
      onSubmit={formCtx.handleSubmit(data => {
        if (![data.isTitle, data.isDesc, data.isKeywords].some(Boolean)) {
          formCtx.setError('isTitle', {
            message: 'Please select at least one'
          })

          return
        }

        switch (tab) {
          case 0:
            return assistantMutation.mutate({
              data: {
                ...data,
                client_task_id: crypto.randomUUID()
              }
            })

          case 1:
          case 2:
          case 3:
            return writerMutation.mutate({
              data: toGptParams(data, {
                isProdMode: isProd,
                tab,
                site_info_id: Number(site_info_id)
              })
            })
        }
      })}
      onReset={() => {
        formCtx.reset()
      }}
      noValidate
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: hiddenShadow ? 'none' : void 0
      }}
      {...restProps}
    >
      <CardHeader
        title={t(toTitle(tab, isProd))}
        action={(() => {
          switch (tab) {
            case 0:
              return null

            default:
              return Boolean(storesQuery.data.length) ? (
                <Link
                  onClick={() => {
                    setIsProdToggle()
                  }}
                  component='button'
                  type='button'
                >
                  {t(tolinkText(tab, isProd))}
                </Link>
              ) : (
                <Link component={NextJsLink} href={`/${params.lang}/connection/new-connection/`}>
                  {t('Connect Your Store')}
                </Link>
              )
          }
        })()}
      ></CardHeader>
      <CardContent sx={{ flex: 1, isolation: 'isolate' }}>
        <Grid container spacing={5} overflow={'visible'}>
          <FormProvider {...formCtx}>
            {toItems(tab, isProd).map((item, idx) => {
              return (
                <Grid key={idx} item xs={12}>
                  {item}
                </Grid>
              )
            })}
          </FormProvider>
        </Grid>
      </CardContent>
      <CardActions>
        <Box width={'100%'}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'end',
              alignItems: 'center',
              gap: 4
            }}
          >
            <LoadingButton
              loading={assistantMutation.isPending || writerMutation.isPending}
              variant='contained'
              type='submit'
            >
              {t('submit')}
            </LoadingButton>
            <Link href='/ticket' component={NextJsLink}>
              {t('feedback')}
            </Link>
          </Box>
          <Box display={'flex'} gap={2} flexDirection={'row-reverse'} mt={3}>
            <TLink component={NextJsLink} href='/ticket' variant='caption' underline='hover'>
              Request Customisation
            </TLink>
            <TTypography variant='caption'>Or</TTypography>
            <TLink href='https://warp-driven.com/' variant='caption' underline='hover'>
              Check More Products
            </TLink>
          </Box>
        </Box>
      </CardActions>
    </Card>
  )
}

export type CardLeftProps = CardProps & {
  hiddenShadow?: boolean
}
