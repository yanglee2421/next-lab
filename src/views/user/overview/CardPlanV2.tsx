'use client'

import React from 'react'

import Link from 'next/link'
import { useParams } from 'next/navigation'

import {
  Card,
  CardHeader,
  CardContent,
  Grid,
  Button,
  Box,
  Typography,
  Alert,
  AlertTitle,
  LinearProgress
} from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'

import { useAcl } from '@/hooks/useAcl'
import { useAllSubscribedPlans } from '@/hooks/api-stg/useAllSubscribedPlans'
import { useNewSubscriptionCancel } from '@/hooks/api-erp/useNewSubscriptionCancel'

export function CardPlanV2() {
  const mutation = useNewSubscriptionCancel()
  const query = useAllSubscribedPlans()
  const params = useParams()

  const { t } = useTranslation()
  const acl = useAcl()

  if (query.isPending) {
    return null
  }

  if (query.isError) {
    return null
  }

  const plan = query.data.plan

  if (!plan) {
    return null
  }

  const isAllowUp = acl.can('update', 'subscription')

  return query.data.plan.map(plan => {
    return (
      <Card key={plan.plan_id}>
        <CardHeader title={t('Current plan')} />
        <CardContent>
          <Grid container spacing={6}>
            <Grid item xs={12} md={6}>
              <Box sx={{ mb: 4 }}>
                <Typography variant='body2'>
                  {t('Your Current Plan is')}{' '}
                  <Typography component='span' sx={{ fontWeight: 600 }}>
                    {plan.plan_type_title}
                  </Typography>
                </Typography>
                <Typography variant='body2'>{plan.product_name}</Typography>
              </Box>
              <Box sx={{ mb: 4 }}>
                <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.primary' }}>
                  {t('Active until')} {t(toMonth(plan.plan_end_time))} {toDate(plan.plan_end_time)},{' '}
                  {toFullYear(plan.plan_end_time)}
                </Typography>
                <Typography variant='body2'>
                  {t('We will send you a notification upon Subscription expiration')}
                </Typography>
              </Box>
              <div>
                <Box sx={{ display: 'flex', mb: 1, alignItems: 'center' }}>
                  <Typography variant='body2' sx={{ mr: 4, fontWeight: 600, color: 'text.primary' }}>
                    ${plan.price_unit} {t('Per')} {t(toPerTime(plan.recurrence_name))}
                  </Typography>
                </Box>
                <Typography variant='body2'>{plan.product_description}</Typography>
              </div>
            </Grid>
            <Grid item xs={12} md={6} sx={{ mt: [4, 4, 0] }}>
              <Alert icon={false} severity='warning' sx={{ mb: 4, visibility: 'hidden' }}>
                <AlertTitle
                  sx={{
                    fontWeight: 600,
                    mb: theme => `${theme.spacing(1)} !important`
                  }}
                >
                  We need your attention!
                </AlertTitle>
                Your plan requires updates
              </Alert>
              <Box sx={{ display: 'flex', mb: 1.5, justifyContent: 'space-between' }}>
                <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.primary' }}>
                  {t('Credits')}
                </Typography>
                <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.primary' }}>
                  {toFormatNumber(plan.product_credit)} {t(['namespace:of', 'of'], { keySeparator: ':' })}{' '}
                  {toFormatNumber(plan.product_plan_credit)}
                </Typography>
              </Box>
              <LinearProgress
                value={(plan.product_credit / plan.product_plan_credit) * 100}
                variant='determinate'
                sx={{ height: 10, borderRadius: '5px' }}
              />
              <Typography variant='caption' sx={{ mt: 1.5, display: 'block' }}>
                {t('Credit remaining on your plan')}
              </Typography>
              <Box sx={{ display: 'flex', mb: 1.5, justifyContent: 'space-between' }}>
                <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.primary' }}>
                  {t('Days')}
                </Typography>
                <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.primary' }}>
                  {plan.quota_renewal_date_left} {t(['namespace:of', 'of'], { keySeparator: ':' })} 30{' '}
                  {t(['namespace:Days', 'Days'], { keySeparator: ':' })}
                </Typography>
              </Box>
              <LinearProgress
                value={(plan.quota_renewal_date_left / 30) * 100}
                variant='determinate'
                sx={{ height: 10, borderRadius: '5px' }}
              />
              <Typography variant='caption' sx={{ mt: 1.5, display: 'block' }}>
                {t('Your plan requires update')}
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{
                mt: 4,
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'flex-start'
              }}
            >
              {(() => {
                if (!isAllowUp) {
                  return null
                }

                return (
                  <Button
                    LinkComponent={Link}
                    href={`/${params.lang}/intellimerch/subscription`}
                    variant='contained'
                    sx={{ mr: 4, mb: [4, 0] }}
                  >
                    {t('Upgrade Plan')}
                  </Button>
                )
              })()}
              {(() => {
                if (!isAllowUp) {
                  return null
                }

                if (!plan?.plan_type) {
                  return null
                }

                const handleCancel = () => {
                  mutation.mutate(
                    { data: { subscription_id: plan.plan_id } },
                    {
                      onError(error) {
                        toast.error(error.message)
                      },
                      onSuccess(data) {
                        toast.success(`Your subscription ${data.subscription_name} cancel successlly!`)
                      }
                    }
                  )
                }

                return (
                  <LoadingButton onClick={handleCancel} loading={mutation.isPending} variant='outlined' color='error'>
                    {t('Cancel Subscription')}
                  </LoadingButton>
                )
              })()}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    )
  })
}

function toFullYear(endTime: string) {
  return new Date(endTime).getFullYear()
}

function toDate(endTime: string) {
  const month = new Date(endTime).getDate()

  return month > 9 ? month : `0${month}`
}

function toMonth(endTime: string) {
  const month = new Date(endTime).getMonth()

  const monthMap = new Map<number, string>()

  monthMap.set(0, 'Jan')
  monthMap.set(1, 'Feb')
  monthMap.set(2, 'Mar')
  monthMap.set(3, 'Apr')
  monthMap.set(4, 'May')
  monthMap.set(5, 'Jun')
  monthMap.set(6, 'Jul')
  monthMap.set(7, 'Aug')
  monthMap.set(8, 'Sep')
  monthMap.set(9, 'Oct')
  monthMap.set(10, 'Nov')
  monthMap.set(11, 'Dec')

  return monthMap.get(month) || ''
}

function toFormatNumber(num: number) {
  return Number(num).toLocaleString()
}

function toPerTime(recurrence_name: string) {
  const name = recurrence_name?.toLowerCase()

  switch (name) {
    case 'months':
      return 'Month'
    case 'years':
      return 'Year'
    default:
      return ''
  }
}
