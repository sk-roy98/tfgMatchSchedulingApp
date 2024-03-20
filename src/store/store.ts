import { configureStore } from '@reduxjs/toolkit'
import MatchSlice from './slices/MatchSlice'

const store = configureStore({
	reducer: {
		match: MatchSlice
	},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
