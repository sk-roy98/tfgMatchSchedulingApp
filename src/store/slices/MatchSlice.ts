import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { MatchSlot } from '../../utils/types'

interface MatchState {
	schedule: MatchSlot[]
}

const initialState: MatchState = {
	schedule: [],
}

const MatchSlice = createSlice({
	name: 'match',
	initialState,
	reducers: {
		addMatchSlot: (state, action: PayloadAction<MatchSlot>) => {
			state.schedule.push(action.payload)
		},
		loadSchedule: (state, action: PayloadAction<MatchSlot[]>) => {
			state.schedule = action.payload
		},
	},
})
export const { addMatchSlot, loadSchedule } = MatchSlice.actions
export default MatchSlice.reducer