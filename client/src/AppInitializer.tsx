import * as React from 'react';
import { Planet } from '@api/types/Planet';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { addPlanets } from './stores/@reduxjs/slices/planetsSlice';
import { AppDispatch } from './stores/@reduxjs/store';
import { AxiosResponse } from 'axios';
import { getHabitablePlanets } from './hooks/planets/getHabitablePlanets';

type DispatchProps = {
	setPlanets: (planets: Planet[]) => void;
};
type Props = {
	children: React.ReactNode;
} & DispatchProps;

function AppInitializer(props: Props) {
	const { children, setPlanets } = props;

	useEffect(() => {
		getHabitablePlanets()
			.then((response: AxiosResponse<Planet[]>) => {
				setPlanets(response.data);
			})
			.catch((e: any) => {
				throw new Error(e);
			});
	}, []);

	return <>{children}</>;
}
export default connect(
	undefined,
	(dispatch: AppDispatch): DispatchProps => ({
		setPlanets: (planets: Planet[]) => dispatch(addPlanets(planets)),
	})
)(AppInitializer);
