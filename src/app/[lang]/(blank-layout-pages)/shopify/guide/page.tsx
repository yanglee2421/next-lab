'use client'

import React from 'react'

import { Alert, AlertTitle, Box, Tab, Tabs, Slide } from '@mui/material'
import { SwitchTransition } from 'react-transition-group'
import { useImmer } from 'use-immer'

import { Guide } from '@views/shopify/Guide'
import { Introduction, CardTop, CardEmpty, SectionTabs } from '@views/intellirec'
import { SkeletonCard } from '@/components/ui/SkeletonCard'
import { useMyConnections } from '@/hooks/api-stg/useMyConnections'

export default function GuidePage() {
  const [state, updateState] = useImmer({
    tab: 'guide'
  })

  return (
    <Box>
      <Tabs
        value={state.tab}
        onChange={(evt, value) => {
          void evt

          React.startTransition(() => {
            updateState(state => {
              state.tab = value
            })
          })
        }}
      >
        <Tab label='Guide' value='guide'></Tab>
        <Tab label='Setting' value='setting'></Tab>
      </Tabs>
      <Box mt={4}>
        <SwitchTransition>
          <Slide key={state.tab} direction='left'>
            <Box>
              {(() => {
                switch (state.tab) {
                  case 'guide':
                    return (
                      <Guide
                        onLastClick={() => {
                          React.startTransition(() => {
                            updateState(state => {
                              state.tab = 'setting'
                            })
                          })
                        }}
                      ></Guide>
                    )
                  case 'setting':
                    return <SettingBoard></SettingBoard>
                  default:
                    return null
                }
              })()}
            </Box>
          </Slide>
        </SwitchTransition>
      </Box>
    </Box>
  )
}

function SettingBoard() {
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
      <CardTop></CardTop>
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
