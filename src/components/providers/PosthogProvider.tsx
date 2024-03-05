'use client'

import React from 'react'

import { PostHogProvider } from 'posthog-js/react'
import { posthog } from 'posthog-js'

export function PosthogProvider(props: React.PropsWithChildren) {
  if (isEnablePosthog) {
    return <PostHogProvider client={posthog}>{props.children}</PostHogProvider>
  }

  return props.children
}

const isEnablePosthog = [
  process.env.NEXT_PUBLIC_POSTHOG_HOST,
  typeof process.env.NEXT_PUBLIC_POSTHOG_HOST === 'string',
  process.env.NEXT_PUBLIC_POSTHOG_KEY,
  typeof process.env.NEXT_PUBLIC_POSTHOG_KEY === 'string'
].every(Boolean)

if (isEnablePosthog) {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY || '', {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST
  })
}
