import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  currentPage: 1,
  currentCount: 21,
  isShowMV: false,
  mvID: ''
}

export const mvSlice = createSlice({
  name: 'mv',
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload
    },
    setCurrentCount: (state, action: PayloadAction<number>) => {
      state.currentCount = action.payload
    },
    setShowMV: (state, action: PayloadAction<boolean>) => {
      state.isShowMV = action.payload
    },
    setMVID: (state, action: PayloadAction<string>) => {
      state.mvID = action.payload
    }
  }
})

// Action creators are generated for each case reducer function
export const { 
  setCurrentPage,
  setCurrentCount,
  setShowMV,
  setMVID
 } = mvSlice.actions

export default mvSlice.reducer
