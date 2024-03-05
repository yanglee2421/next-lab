'use client'

import React from 'react'

import { Alert, AlertTitle } from '@mui/material'

import { Dashboard } from '@/views/intellivendor/dashboard'
import { SkeletonCard } from '@/components/ui'
import { useMyConnections } from '@/hooks/api-stg'

export default function DashboardPage() {
  const vendorQuery = useMyConnections({
    is_list_all: false,
    site_type: 4
  })

  const woolworldsQuery = useMyConnections({
    is_list_all: false,
    site_type: 2
  })

  if (vendorQuery.isPending) {
    return <SkeletonCard></SkeletonCard>
  }

  if (woolworldsQuery.isPending) {
    return <SkeletonCard></SkeletonCard>
  }

  if (vendorQuery.isError) {
    return (
      <Alert severity='error'>
        <AlertTitle>Fetch vendor shops failed</AlertTitle>
        {vendorQuery.error.message}
      </Alert>
    )
  }

  if (woolworldsQuery.isError) {
    return (
      <Alert severity='error'>
        <AlertTitle>Fetch woolworlds shops failed</AlertTitle>
        {woolworldsQuery.error.message}
      </Alert>
    )
  }

  return <Dashboard vendorShops={vendorQuery.data} woolworldsShops={woolworldsQuery.data}></Dashboard>
}
