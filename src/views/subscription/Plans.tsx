'use client'

import React from 'react'

import { useParams } from 'next/navigation'

import { Grid } from '@mui/material'

import { PlanCard } from './PlanCard'
import type { Plan } from '@/api/api-stg/get_all_plans'
import { useGetAllPlans } from '@/hooks/api-stg/useGetAllPlans'
import { useMyCurrentPlan } from '@/hooks/api-stg/useMyCurrentPlan'

export function Plans(props: Props) {
  const { onSelect, interval } = props

  const params = useParams()

  const plan_id = (() => {
    if (typeof params.plan_id === 'string') {
      return params.plan_id
    }

    return ''
  })()

  const allPlansQuery = useGetAllPlans({
    lan: (() => {
      if (typeof params.lang === 'string') {
        return params.lang.replace('-', '_')
      }

      return ''
    })(),
    plan_id
  })

  const myPlanQuery = useMyCurrentPlan({
    plan_id
  })

  if (allPlansQuery.isPending) {
    return null
  }

  if (myPlanQuery.isPending) {
    return null
  }

  if (allPlansQuery.isError) {
    return null
  }

  if (myPlanQuery.isError) {
    return null
  }

  return (
    <Grid container spacing={6}>
      {(() => {
        const planList = allPlansQuery.data.data.plans.flatMap(item => Object.values(item))
        const myPlanId = myPlanQuery.data?.plan?.product_id

        return toDisplayedPlanList(planList, interval !== 12).map((item, index) => {
          return (
            <Grid key={item.product_id} item xs={12} sm={6} md={6} lg={4}>
              <PlanCard
                onSelect={onSelect}
                interval={interval}
                img={imgMap.get(index % 3) || ''}
                isCurr={myPlanId === item.product_id}
                productData={item}
              ></PlanCard>
            </Grid>
          )
        })
      })()}
    </Grid>
  )
}

const imgMap = new Map<number, string>()

imgMap.set(0, '/images/pages/pricing-tree-1.png')
imgMap.set(1, '/images/pages/pricing-tree-2.png')
imgMap.set(2, '/images/pages/pricing-tree-3.png')

type Props = {
  onSelect(planId: number): void
  interval: number
}

function toDisplayedPlanList(planList: Plan[], isMonth: boolean) {
  if (isMonth) {
    return planList.filter(item => item.interval_number !== 12)
  }

  return planList.filter(item => item.interval_number === 12)
}
