'use client'

import React from 'react'

import { useParams } from 'next/navigation'

import {
  Box,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  Alert,
  AlertTitle,
  TableCell,
  Button
} from '@mui/material'
import { useTranslation } from 'react-i18next'

import { HeadCell } from './HeadCell'
import { ProgressBox } from '@/components/ui'
import { BodyRow } from './BodyRow'
import { useMyCurrentPlan } from '@/hooks/api-stg/useMyCurrentPlan'
import { useGetAllPlans } from '@/hooks/api-stg/useGetAllPlans'

export function PlansTable(props: Props) {
  const { interval, onSelect } = props

  const { t } = useTranslation()

  const params = useParams()

  const plan_id = (() => {
    if (typeof params.plan_id === 'string') {
      return params.plan_id
    }

    return ''
  })()

  const plansQuery = useGetAllPlans({
    lan: (() => {
      if (typeof params.lang === 'string') {
        return params.lang.replace('-', '_')
      }

      return ''
    })(),
    plan_id
  })

  const planQuery = useMyCurrentPlan({
    plan_id
  })

  if (planQuery.isPending) {
    return <ProgressBox></ProgressBox>
  }

  if (plansQuery.isPending) {
    return <ProgressBox></ProgressBox>
  }

  if (planQuery.isError) {
    return (
      <Alert severity='error'>
        <AlertTitle>Fetch your subscription plan failed</AlertTitle>
        {planQuery.error.message}
      </Alert>
    )
  }

  if (plansQuery.isError) {
    return (
      <Alert severity='error'>
        <AlertTitle>Fetch subscriptions failed</AlertTitle>
        {plansQuery.error.message}
      </Alert>
    )
  }

  const plans = plansQuery.data.data.plans
    .flatMap(item => {
      return Object.values(item)
    })
    .filter(item => {
      if (interval === 12) {
        return item.interval_number === 12
      }

      return item.interval_number !== 12
    })

  return (
    <div>
      <Box sx={{ mb: 12, textAlign: 'center' }}>
        <Typography variant='h5' sx={{ mb: 2.5 }}>
          {t('Pick a plan that works best for you')}
        </Typography>
      </Box>
      <Box
        sx={{
          mt: 8,
          borderRadius: 1,
          border: '1px solid',
          borderColor: 'divider',
          '& .MuiTableRow-root:nth-of-type(even)': {
            backgroundColor: 'action.hover'
          }
        }}
      >
        <TableContainer>
          <Table
            sx={{
              tableLayout: 'fixed'
            }}
          >
            {/* Table head */}
            <TableHead>
              <TableRow>
                <HeadCell isFirst title={t('Features')} subtitle={t('Features included in the plan')}></HeadCell>
                {plans.map(item => {
                  return (
                    <HeadCell key={item.product_id} title={item.product_name} subtitle={item.interval_type}></HeadCell>
                  )
                })}
              </TableRow>
            </TableHead>

            {/* Table body */}
            <TableBody>
              {Array.from(
                new Set(
                  plans
                    .flatMap(item => {
                      return item.product_description_sale?.split('\n')
                    })
                    .filter(Boolean)
                ),
                item => {
                  return <BodyRow key={item} feature={item} columns={plans}></BodyRow>
                }
              )}

              {/* Subscription buttons */}
              <TableRow sx={{ '& .MuiTableCell-root': { border: 0 } }}>
                <TableCell></TableCell>
                {plans.map(item => {
                  return (
                    <TableCell key={item.product_id} align='center' sx={{ whiteSpace: 'nowrap' }}>
                      {planQuery.data.plan?.product_id === item.product_id ? (
                        <Button variant='outlined' color='success' fullWidth>
                          Current Plan
                        </Button>
                      ) : (
                        <Button
                          onClick={() => {
                            React.startTransition(() => {
                              onSelect(item.product_id)
                            })
                          }}
                          variant='outlined'
                          fullWidth
                        >
                          upgrade
                        </Button>
                      )}
                    </TableCell>
                  )
                })}
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  )
}

type Props = {
  interval: number
  onSelect(id: number): void
}
