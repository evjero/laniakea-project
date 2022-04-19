import type { Launch } from '@api/types/Launch';
import {
	createAction,
	createAsyncThunk,
	createSlice,
	PayloadAction,
} from '@reduxjs/toolkit';
import { deleteLaunch } from '../../../hooks/launches/deleteLaunch';
import { postLaunch } from '../../../hooks/launches/postLaunch';
import type { RootState, ThunkConfig } from '../store';
// Define a type for the slice state
interface LaunchState {
	launches: Launch[];
	status: 'LOADING' | 'READY' | 'ERRORED';
}
// Define the initial state using that type
const initialState: LaunchState = {
	launches: [],
	status: 'READY',
};

/** Add a new launch to schedule */
export const addLaunch = createAsyncThunk<Launch, Launch, ThunkConfig>(
	'addLaunch',
	async (launch, thunkApi) => {
		try {
			await postLaunch(launch);
			return launch;
		} catch (error: any) {
			return thunkApi.rejectWithValue(error);
		}
	}
);

/** Abort a launch from schedule */
export const abortLaunch = createAsyncThunk<number, number, ThunkConfig>(
	'abortLaunch',
	async (flightNumber, thunkApi) => {
		try {
			await deleteLaunch(flightNumber);
			return flightNumber;
		} catch (error: any) {
			return thunkApi.rejectWithValue(error);
		}
	}
);

export const launchesSlice = createSlice({
	name: 'launches',
	// `createSlice` will infer the state type from the `initialState` argument
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(addLaunch.fulfilled, (state, action) => {
				state.launches = [...state.launches, action.payload];
			})
			.addCase(abortLaunch.fulfilled, (state, action) => {
				const existingLaunchIndex = state.launches.findIndex(
					(launch) => launch.flightNumber === action.payload
				);
				if (existingLaunchIndex >= 0) {
					state.launches.splice(existingLaunchIndex, 1);
				}
			});
	},
});

// Other code such as selectors can use the imported `RootState` type
export const getPlanets = (state: RootState) => state.launches.launches;

export default launchesSlice.reducer;
