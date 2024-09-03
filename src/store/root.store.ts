import { configureStore } from '@reduxjs/toolkit'

import { usersReducer } from './slices'

export const rootStore = configureStore({
  reducer: usersReducer,
})
