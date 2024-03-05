import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export const useAuthLocalStore = create(
  persist<AuthStore>(
    (set, get) => {
      return {
        accessToken: '',
        setAccessToken(action) {
          const accessToken = (() => {
            if (typeof action === 'function') {
              return action(get().accessToken)
            }

            return action
          })()

          return set({ accessToken })
        },
        updateAccessToken(action) {
          const prev = get().accessToken

          if (!prev) {
            return
          }

          const accessToken = (() => {
            if (typeof action === 'function') {
              return action(prev)
            }

            return action
          })()

          if (!accessToken) return

          return set({ accessToken })
        },
        clearAccessToken() {
          return set({ accessToken: '' })
        }
      }
    },
    {
      name: 'accessToken',
      storage: createJSONStorage(() => localStorage)
    }
  )
)

interface AuthStore {
  accessToken: string
  setAccessToken(action: Action): void
  updateAccessToken(action: Action): void
  clearAccessToken(): void
}

type Action = string | FunctionAction
type FunctionAction = (prev: string) => string
