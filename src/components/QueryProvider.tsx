'use client'
import React from 'react'

import { ReactQueryStreamedHydration } from '@tanstack/react-query-next-experimental'
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import { QueryClient } from '@tanstack/react-query'
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister'

export function QueryProvider(props: React.PropsWithChildren) {
  return (
    <PersistQueryClientProvider client={queryClient} persistOptions={{ persister }}>
      <ReactQueryStreamedHydration>{props.children}</ReactQueryStreamedHydration>
    </PersistQueryClientProvider>
  )
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60,
      gcTime: 1000 * 60 * 2,

      refetchOnMount: true,
      refetchOnReconnect: true,
      refetchOnWindowFocus: true,

      retry: 1,
      retryDelay(attemptIndex) {
        return Math.min(1000 * 2 ** attemptIndex, 1000 * 8)
      }
    }
  }
})

const persister = createAsyncStoragePersister({
  storage: globalThis.sessionStorage
})