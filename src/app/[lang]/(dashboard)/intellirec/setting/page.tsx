'use client'

import { Alert, AlertTitle, Box } from '@mui/material'

import { Introduction, CardTop, CardEmpty, SectionTabs } from '@/views/intellirec'
import { SkeletonCard } from '@/components/ui'
import { useMyConnections } from '@/hooks/api-stg'

export default function Page() {
  const query = useMyConnections({
    is_list_all: false,
    site_type: 1
  })

  if (query.isPending) {
    return <SkeletonCard></SkeletonCard>
  }

  if (query.isError) {
    return (
      <Alert severity='error'>
        <AlertTitle>Fetch strores failed</AlertTitle>
        {query.error.message}
      </Alert>
    )
  }

  return (
    <Box>
      <CardTop />
      <Box>
        {(() => {
          const showIntroduction = [
            !Array.isArray(query.data),
            !query.data?.length,
            !query.data?.some(item => {
              return item.approved_services?.includes(2)
            })
          ].some(Boolean)

          if (showIntroduction) {
            return <Introduction></Introduction>
          }

          // No Scope
          const hasScope = query.data?.some(item => {
            return item.scopes.includes(2)
          })

          if (!hasScope) {
            return <CardEmpty></CardEmpty>
          }

          return <SectionTabs></SectionTabs>
        })()}
      </Box>
    </Box>
  )
}
