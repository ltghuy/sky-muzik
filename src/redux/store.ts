import { configureStore } from "@reduxjs/toolkit"
import audioReducer from "./features/audioSlice"
import mvReducer from "./features/mvSlice"

const store = configureStore({
  reducer: {
    audio: audioReducer,
    mv: mvReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export { store }
