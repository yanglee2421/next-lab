import React from 'react'

export function InstallApp(props: InstallAppProps) {
  const { conn_info } = props

  React.useEffect(() => {
    const timer = setTimeout(() => {
      window.open(conn_info.auth_url, '_parent')
    }, 0)

    return () => {
      clearTimeout(timer)
    }
  }, [conn_info])

  return null
}

export interface InstallAppProps {
  conn_info: Connection
}

export interface Connection {
  auth_url: string
}
