import React from 'react'

import BlankLayout from '@layouts/BlankLayout'
import { getSystemMode } from '@core/server/actions'

export default function Layout(props: React.PropsWithChildren) {
  return <BlankLayout systemMode={getSystemMode()}>{props.children}</BlankLayout>
}
