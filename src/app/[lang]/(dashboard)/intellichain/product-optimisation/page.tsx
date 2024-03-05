'use client'

import { Alert, AlertTitle } from '@mui/material'

import { Dashboard } from '@/views/intellichain/dashboard'
import { SkeletonCard } from '@/components/ui'
import { useMyConnections } from '@/hooks/api-stg'

export default function SettingPage() {
  const eCommerceQuery = useMyConnections({
    is_list_all: false,
    site_type: 1
  })

  if (eCommerceQuery.isPending) {
    return <SkeletonCard></SkeletonCard>
  }

  if (eCommerceQuery.isError) {
    return (
      <Alert severity='error'>
        <AlertTitle>Fetch woolworlds shops failed</AlertTitle>
        {eCommerceQuery.error.message}
      </Alert>
    )
  }

  return <Dashboard eCommerceShops={eCommerceQuery.data}></Dashboard>
}
