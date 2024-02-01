// Type Imports
import type { ChildrenType } from '@core/types'

// Component Imports
import BlankLayout from '@layouts/BlankLayout'

// Util Imports
import { getSystemMode } from '@core/server/actions'

type Props = ChildrenType

const Layout = ({ children }: Props) => {
  return <BlankLayout systemMode={getSystemMode()}>{children}</BlankLayout>
}

export default Layout
