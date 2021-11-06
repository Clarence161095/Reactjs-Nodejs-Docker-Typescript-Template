import { configureStore } from '@reduxjs/toolkit'
import UserReducer from './slice/UserSlice'

export const Store = configureStore({
  reducer: {
    user: UserReducer
  },
})

export type RootState = ReturnType<typeof Store.getState>
export type AppDispatch = typeof Store.dispatch