import { configureStore } from '@reduxjs/toolkit'
import burgerSlice from './burgerSlice'
import userSlice from './userSlice'
export const store = configureStore({
    reducer: {
        burger : burgerSlice,
        user : userSlice,
    },
  })