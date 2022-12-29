import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  currentPage: 1,
  currentCount: 21,
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
  }
})

// Action creators are generated for each case reducer function
export const { 
  setCurrentPage,
  setCurrentCount,
 } = mvSlice.actions

export default mvSlice.reducer
