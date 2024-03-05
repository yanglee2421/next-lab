import React from 'react'

import { ErrorAlert, SkeletonCard } from '@/components/ui'
import { Chart } from './Chart'
import { useFeatureFlags } from '@/hooks/api-nuwa'
import type { Row } from '@/api/api-stg/connection_my_connections'

export function ApexRadarChart(props: Props) {
  const { eCommerceShop } = props

  const query = useFeatureFlags(eCommerceShop.connection_id, {
    days: 7
  })

  if (query.isPending) {
    return <SkeletonCard />
  }

  if (query.isError) {
    return <ErrorAlert titleNode='Fetch data failed'>{query.error.message}</ErrorAlert>
  }

  const options = Object.keys(
    query.data.global.find(item => {
      return item.feature === 'product_type'
    })?.data || {}
  )

  if (!options.length) {
    return null
  }

  return <Chart data={query.data} options={options}></Chart>
}

type Props = {
  eCommerceShop: Row
}
