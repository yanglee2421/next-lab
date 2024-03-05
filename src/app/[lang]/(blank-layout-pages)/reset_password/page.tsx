import { ResetPasswordV1 } from '@views/ResetPasswordV1'
import { GuestGuard } from '@/components/guard/GuestGuard'
import { getServerMode } from '@core/server/actions'

export default function Page() {
  return (
    <GuestGuard>
      <ResetPasswordV1 mode={getServerMode()}></ResetPasswordV1>
    </GuestGuard>
  )
}
