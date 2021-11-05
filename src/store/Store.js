import { configureStore } from '@reduxjs/toolkit'
import UserReducer from './slice/UserSlice'

export const Store = configureStore({
  reducer: {
    user: UserReducer
  },
})