import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import logger from 'redux-logger';
import planetsReducer from './slices/planetsSlice';
import launchesReducer from './slices/launchesSlice';

export const store = configureStore({
	reducer: {
		planets: planetsReducer,
		launches: launchesReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware()
			/** TODO some other middleware */
			.concat(logger),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type Store = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type StoreDispatch = typeof store.dispatch;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useStoreDispatch = () => useDispatch<StoreDispatch>();
export const useStoreSelector: TypedUseSelectorHook<Store> = useSelector;
