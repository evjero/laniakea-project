import * as React from 'react';
import { Planet } from '@api/types/Planet';
import { getPlanets } from './hooks/planets/getPlanets';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { addPlanets } from './stores/@reduxjs/slices/planetsSlice';
import { StoreDispatch } from './stores/@reduxjs/store';
import { AxiosResponse } from 'axios';

type DispatchProps = {
	setPlanets: (planets: Planet[]) => void;
};
type Props = {
	children: React.ReactNode;
} & DispatchProps;

function AppInitializer(props: Props) {
	const { children, setPlanets } = props;

	useEffect(() => {
		getPlanets()
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
	(dispatch: StoreDispatch): DispatchProps => ({
		setPlanets: (planets: Planet[]) => dispatch(addPlanets(planets)),
	})
)(AppInitializer);
