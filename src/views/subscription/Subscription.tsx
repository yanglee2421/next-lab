'use client'

import React from 'react'

import { useParams } from 'next/navigation'

import { Chip, Typography, Switch, InputLabel, Alert, AlertTitle, useTheme, Card, CardContent } from '@mui/material'
import { useImmer } from 'use-immer'
import classnames from 'classnames'

import { ProgressBox } from '@/components/ui'
import { Plans } from './Plans'
import { PlansTable } from './PlansTable'
import DirectionalIcon from '@components/DirectionalIcon'
import { PayMethodDialog } from './PayMethodDialog'
import { useGetAllPlans } from '@/hooks/api-stg/useGetAllPlans'

export function Subscription() {
  const params = useParams()

  const query = useGetAllPlans({
    lan: (() => {
      if (typeof params.lang === 'string') {
        return params.lang
      }

      return ''
    })(),
    plan_id: (() => {
      if (typeof params.plan_id === 'string') {
        return params.plan_id
      }

      return ''
    })()
  })

  const [state, updateState] = useImmer({
    interval: 1,
    product_id: 0
  })

  const theme = useTheme()

  if (query.isPending) {
    return <ProgressBox></ProgressBox>
  }

  if (query.isError) {
    return (
      <Alert severity='error'>
        <AlertTitle>Fetch data failed</AlertTitle>
        {query.error.message}
      </Alert>
    )
  }

  const handleSelect = (id: number) => {
    updateState(state => {
      state.product_id = id
    })
  }

  return (
    <Card>
      <CardContent className='xl:!plb-16 xl:pli-[6.25rem] !pbs-10 !pbe-5 pli-5 sm:!p-16'>
        <div className='flex flex-col gap-6'>
          <div className='flex flex-col justify-center items-center gap-2'>
            <Typography variant='h4'>Pricing Plans</Typography>
            <div className='flex items-center text-center flex-col mbe-[2.8rem]'>
              <Typography>All plans include 40+ advanced tools and features to boost your product.</Typography>
              <Typography>Choose the best plan to fit your needs.</Typography>
            </div>
            <div className='flex justify-center items-center relative mbs-0.5'>
              <InputLabel htmlFor='pricing-switch' className='cursor-pointer text-textSecondary'>
                Monthly
              </InputLabel>
              <Switch
                id='pricing-switch'
                checked={state.interval === 12}
                onChange={(evt, checked) => {
                  void evt
                  updateState(state => {
                    state.interval = checked ? 12 : 1
                  })
                }}
              />
              <InputLabel htmlFor='pricing-switch' className='cursor-pointer text-textSecondary'>
                Annually
              </InputLabel>

              <div
                className={classnames('flex absolute max-sm:hidden block-start-[-41px] translate-x-[35%]', {
                  'right-full': theme.direction === 'rtl',
                  'left-1/2': theme.direction !== 'rtl'
                })}
              >
                <DirectionalIcon
                  ltrIconClass='ri-corner-left-down-line'
                  rtlIconClass='ri-corner-right-down-line'
                  className='mbs-2 mie-1 text-textDisabled'
                />
                <Chip label='Save up to 10%' size='small' color='primary' variant='tonal' />
              </div>
            </div>
          </div>
          <Plans onSelect={handleSelect} interval={state.interval}></Plans>
          <PlansTable onSelect={handleSelect} interval={state.interval}></PlansTable>
          <PayMethodDialog
            open={!!state.product_id}
            planId={state.product_id}
            onClose={() => {
              updateState(state => {
                state.product_id = 0
              })
            }}
          ></PayMethodDialog>
        </div>
      </CardContent>
    </Card>
  )
}
