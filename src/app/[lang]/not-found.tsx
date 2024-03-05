import BlankLayout from '@layouts/BlankLayout'
import NotFound from '@views/NotFound'
import { getSystemMode, getServerMode } from '@core/server/actions'

export default function NotFoundPage() {
  return (
    <BlankLayout systemMode={getSystemMode()}>
      <NotFound mode={getServerMode()} />
    </BlankLayout>
  )
}
