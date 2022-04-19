import { Container } from 'react-bootstrap';
import { API } from '@api/types/API';
import { Planet } from '@api/types/Planet';
import * as React from 'react';
import { connect } from 'react-redux';
import { RootState } from 'stores/@reduxjs/store';
import { Navigation } from './Navigation';
import { Footer } from './Footer';
import { Outlet } from 'react-router-dom';

// type StateProps = API;
// type DispatchProps = {};
// type Props = StateProps & DispatchProps;

export function Layout(): JSX.Element {
	return (
		<div className="app">
			<Navigation />
			<Footer />
			<Outlet />
		</div>
	);
}

// export default connect(
// 	(store: Store): StateProps => ({
// 		planets: store.planets.planets,
// 		launches: store.launches.launches,
// 	}),
// 	() => ({})
// )(Layout);
