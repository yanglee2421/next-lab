import type { Metadata } from 'next'

import Register from '@views/Register'
import { getServerMode } from '@core/server/actions'
import { GuestGuard } from '@/components/guard/GuestGuard'

export default function RegisterPage() {
  return (
    <GuestGuard>
      <Register mode={getServerMode()} />
    </GuestGuard>
  )
}

export const metadata: Metadata = {
  title: 'Register',
  description: 'Register to your account'
}
