import * as React from 'react';
import { connect } from 'react-redux';
import { Store } from './stores/@reduxjs/store';
import type { API } from '@api/types/API';

type StateProps = API;
type DispatchProps = {};
type Props = StateProps & DispatchProps;
function App(props: Props): JSX.Element {
	return (
		<div>
			<h1>Planets:</h1>
			<ul style={{ maxHeight: '200px', overflow: 'auto' }}>
				{props.planets.map((planet) => (
					<li key={planet.kepid}>{planet.kepid}</li>
				))}
			</ul>
		</div>
	);
}

export default connect(
	(store: Store): StateProps => ({
		planets: store.planets.planets,
		launches: store.launches.launches,
	}),
	() => ({})
)(App);
