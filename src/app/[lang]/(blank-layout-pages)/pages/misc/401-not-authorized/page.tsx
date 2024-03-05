// Component Imports
import NotAuthorized from '@views/NotAuthorized'

// Server Action Imports
import { getServerMode } from '@core/server/actions'

const Error401 = () => {
  // Vars
  const mode = getServerMode()

  return <NotAuthorized mode={mode} />
}

export default Error401
