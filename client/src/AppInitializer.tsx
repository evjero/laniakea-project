import * as React from 'react';
import { Planet } from '@api/types/Planet';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { addPlanets } from './stores/@reduxjs/slices/planetsSlice';
import { AppDispatch } from './stores/@reduxjs/store';
import { AxiosResponse } from 'axios';
import { getHabitablePlanets } from './hooks/planets/getHabitablePlanets';
import { getLaunches } from './hooks/launches/getLaunches';
import { Launch } from '../../api';
import {
	addLaunchThunk,
	setLaunches,
} from './stores/@reduxjs/slices/launchesSlice';

type DispatchProps = {
	addPlanets: (planets: Planet[]) => void;
	setLaunches: (launches: Launch[]) => void;
};
type Props = {
	children: React.ReactNode;
} & DispatchProps;

function AppInitializer(props: Props) {
	const { children, addPlanets, setLaunches } = props;

	useEffect(() => {
		getHabitablePlanets()
			.then((response: AxiosResponse<Planet[]>) => {
				addPlanets(response.data);
			})
			.catch((e: any) => {
				throw new Error('Failed to assign Habitable planets', e);
			});
		getLaunches()
			.then((response: AxiosResponse<Launch[]>) => {
				setLaunches(response.data);
			})
			.catch((e: any) => {
				throw new Error('Failed to assign launches', e);
			});
	}, []);

	return <>{children}</>;
}
export default connect(
	undefined,
	(dispatch: AppDispatch): DispatchProps => ({
		addPlanets: (planets: Planet[]) => dispatch(addPlanets(planets)),
		setLaunches: (launches: Launch[]) => dispatch(setLaunches(launches)),
	})
)(AppInitializer);
