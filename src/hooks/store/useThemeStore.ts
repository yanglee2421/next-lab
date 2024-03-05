import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export const useThemeStore = create(
  persist<ThemeStore>(
    set => {
      return {
        direction: 'ltr',
        setDirection(direction) {
          set({ direction })
        }
      }
    },
    {
      name: 'useThemeStore',
      storage: createJSONStorage(() => window.localStorage)
    }
  )
)

interface ThemeStore {
  direction: Direction
  setDirection(direction: Direction): void
}

type Direction = 'ltr' | 'rtl'
