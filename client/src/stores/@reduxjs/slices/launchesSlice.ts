import type { Launch } from '@api/types/Launch';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
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
export const addLaunchThunk = createAsyncThunk<Launch, Launch, ThunkConfig>(
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
export const abortLaunchThunk = createAsyncThunk<number, number, ThunkConfig>(
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
	reducers: {
		setLaunches: (state, action: PayloadAction<Launch[]>) => {
			state.launches = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(addLaunchThunk.pending, (state) => {
				state.status = 'LOADING';
			})
			.addCase(addLaunchThunk.fulfilled, (state, action) => {
				state.status = 'READY';
				state.launches = [...state.launches, action.payload];
			})
			.addCase(addLaunchThunk.rejected, (state) => {
				state.status = 'ERRORED';
			})
			.addCase(abortLaunchThunk.pending, (state) => {
				state.status = 'LOADING';
			})
			.addCase(abortLaunchThunk.fulfilled, (state, action) => {
				const existingLaunchIndex = state.launches.findIndex(
					(launch) => launch.flightNumber === action.payload
				);
				if (existingLaunchIndex >= 0) {
					state.launches[existingLaunchIndex] = {
						...state.launches[existingLaunchIndex],
						success: false,
						upcoming: false,
					};
				}
				state.status = 'READY';
			})
			.addCase(abortLaunchThunk.rejected, (state) => {
				state.status = 'ERRORED';
			});
	},
});

export const { setLaunches } = launchesSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const getPlanets = (state: RootState) => state.launches.launches;

export default launchesSlice.reducer;
