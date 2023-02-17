import { create } from 'zustand'

interface MVState {
  currentPage: number,
  currentCount: number,
  isShowMV: boolean,
  mvID: string,
  setCurrentPage: (currentPage: number) => void,
  setCurrentCount: (currentCount: number) => void,
  setShowMV: (isShow: boolean) => void,
  setMVID: (mvID: string) => void
}

export const useMVStore = create<MVState>((set) => ({
  currentPage: 1,
  currentCount: 21,
  isShowMV: false,
  mvID: '',
  setCurrentCount: (payload: number) => set((state) => ({ currentCount: state.currentCount = payload })),
  setCurrentPage: (payload: number) => set((state) => ({ currentPage: state.currentPage = payload })),
  setShowMV: (payload: boolean) => set((state) => ({ isShowMV: state.isShowMV = payload })),
  setMVID: (payload: string) => set((state) => ({ mvID: state.mvID = payload })),
}))
