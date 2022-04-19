import { combineReducers, configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import planetsReducer from './slices/planetsSlice';
import launchesReducer from './slices/launchesSlice';

const rootReducer = combineReducers({
	planets: planetsReducer,
	launches: launchesReducer,
});

export const store = configureStore({
	reducer: rootReducer,
	devTools: true,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware()
			/** TODO perhaps some other middleware */
			.concat(logger),
});

export type AppStore = typeof store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
// For thunk type parameters
export type ThunkConfig = { state: RootState };
