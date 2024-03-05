import type { Metadata } from 'next'

import ForgotPassword from '@views/ForgotPassword'
import { getServerMode } from '@core/server/actions'
import { GuestGuard } from '@/components/guard/GuestGuard'

export default function ForgotPasswordPage() {
  return (
    <GuestGuard>
      <ForgotPassword mode={getServerMode()} />
    </GuestGuard>
  )
}

export const metadata: Metadata = {
  title: 'Forgot Password',
  description: 'Forgotten Password to your account'
}
