import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import type { Planet } from '../../../../../server/src/api/types/Planet';
// Define a type for the slice state
interface PlanetState {
	planets: Planet[];
}

// Define the initial state using that type
const initialState: PlanetState = {
	planets: [],
};

export const planetsSlice = createSlice({
	name: 'planets',
	// `createSlice` will infer the state type from the `initialState` argument
	initialState,
	reducers: {
		addPlanet: (state, action: PayloadAction<Planet>) => {
			state.planets = [...state.planets, action.payload];
		},
	},
});

export const { addPlanet } = planetsSlice.actions;
// Other code such as selectors can use the imported `RootState` type
export const getPlanets = (state: RootState) => state.planets.planets;

export default planetsSlice.reducer;
