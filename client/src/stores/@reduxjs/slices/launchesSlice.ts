import { Launch } from '@api/types/Launch';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
// Define a type for the slice state
interface LaunchState {
	launches: Launch[];
}
// Define the initial state using that type
const initialState: LaunchState = {
	launches: [],
};

export const launchesSlice = createSlice({
	name: 'launches',
	// `createSlice` will infer the state type from the `initialState` argument
	initialState,
	reducers: {
		addLaunch: (state, action: PayloadAction<Launch>) => {
			state.launches = [...state.launches, action.payload];
		},
	},
});

export const { addLaunch } = launchesSlice.actions;
// Other code such as selectors can use the imported `RootState` type
export const getPlanets = (state: RootState) => state.launches.launches;

export default launchesSlice.reducer;
