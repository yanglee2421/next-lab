'use client'

import type React from 'react'

import { useAllSubscribedPlans } from '@/hooks/api-stg/useAllSubscribedPlans'

export function PlanGuard(props: Props) {
  const { fallback } = props

  const query = useAllSubscribedPlans()

  if (query.isPending) {
    return fallback
  }

  if (query.isError) {
    return fallback
  }

  if (query.data.plan.some(item => item.plan_id === props.role)) {
    return props.children
  }

  return fallback
}

export type Props = {
  children: React.ReactNode
  role: number
  fallback?: React.ReactNode
}
