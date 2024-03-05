// Axios Imports
import type { InternalAxiosRequestConfig } from 'axios'

export function addJsonWebToken(config: InternalAxiosRequestConfig) {
  if (typeof window === 'undefined') {
    return
  }

  const jwt = (() => {
    const localToken = getTokenFromStorage(localStorage)

    return localToken
  })()

  jwt && config.headers.setAuthorization(`Bearer ${jwt}`, false)
}

function getTokenFromStorage(storage: Storage): string {
  try {
    const json = storage.getItem('accessToken')

    
return JSON.parse(json || '').state.accessToken
  } catch (error) {
    console.error(error)

    return ''
  }
}
