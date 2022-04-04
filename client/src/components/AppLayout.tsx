import { API } from '@api/types/API';
import { Planet } from '@api/types/Planet';
import * as React from 'react';
import { connect } from 'react-redux';
import { Store } from 'stores/@reduxjs/store';

type StateProps = API;
type DispatchProps = {};
type Props = StateProps &
	DispatchProps & {
		sounds: any;
		classes: any;
	};

function AppLayout(props: Props): JSX.Element {
	const { sounds, classes } = props;
	const [frameVisible, setFrameVisible] = React.useState(true);
	const animateFrame = () => {
		setFrameVisible(false);
		setTimeout(() => {
			setFrameVisible(true);
		}, 600);
	};

	const onSuccessSound = () => sounds.success && sounds.success.play();
	const onAbortSound = () => sounds.abort && sounds.abort.play();
	const onFailureSound = () => sounds.warning && sounds.warning.play();

	return (
		<div className="app">
			<h1>Planets:</h1>
			<ul style={{ maxHeight: '200px', overflow: 'auto' }}>
				{props.planets.map((planet) => (
					<li key={planet.rowid}>{planet.kepid}</li>
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
)(AppLayout);
