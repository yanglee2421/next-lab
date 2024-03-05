import type { Metadata } from 'next'

import { ResetPasswordV1 } from '@views/ResetPasswordV1'
import { getServerMode } from '@core/server/actions'
import { GuestGuard } from '@/components/guard/GuestGuard'

export default function Page() {
  return (
    <GuestGuard>
      <ResetPasswordV1 mode={getServerMode()}></ResetPasswordV1>
    </GuestGuard>
  )
}

export const metadata: Metadata = {
  title: 'Activate',
  description: 'Activate your account'
}
