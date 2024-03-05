import { create } from 'zustand'

export const useCopywritingStore = create<CopywritingStore>((set, get) => {
  return {
    tasks: [],
    tab: 1,
    isProd: true,
    showBack: false,
    error: null,
    task: null,
    isPolling: false,
    setTab(tab) {
      set({
        tab,
        showBack: false
      })
    },
    setIsProd(isProd) {
      set({ isProd })
    },
    setIsProdToggle() {
      set({ isProd: !get().isProd })
    },
    setShowBack(showBack) {
      set({ showBack })

      if (!showBack) {
        set({ error: null })
      }
    },
    setError(error) {
      set({ error })
    },
    setTask(task) {
      set({ task, showBack: Boolean(task) })
    },
    setIsPolling(isPolling) {
      set({ isPolling })
    },
    setIsPollingToggle() {
      set({ isPolling: !get().isPolling })
    }
  }
})

interface CopywritingStore {
  tasks: []
  tab: number
  isProd: boolean
  showBack: boolean
  error: null | Error
  task: null | string
  isPolling: boolean
  setTab(v: number): void
  setIsProd(isProd: boolean): void
  setIsProdToggle(): void
  setShowBack(v: boolean): void
  setError(v: null | Error): void
  setTask(v: string | null): void
  setIsPolling(v: boolean): void
  setIsPollingToggle(): void
}
