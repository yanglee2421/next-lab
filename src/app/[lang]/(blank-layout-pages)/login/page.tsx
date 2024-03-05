import type { Metadata } from 'next'

import Login from '@views/Login'
import { GuestGuard } from '@/components/guard/GuestGuard'
import { getServerMode } from '@core/server/actions'

export default function LoginPage() {
  return (
    <GuestGuard>
      <Login mode={getServerMode()} />
    </GuestGuard>
  )
}

export const metadata: Metadata = {
  title: 'Login',
  description: 'Login to your account'
}
