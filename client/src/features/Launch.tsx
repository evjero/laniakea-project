import { Launch } from '@api/types/Launch';
import { API } from '@api/types/API';
import { Planet } from '@api/types/Planet';
import * as React from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Store, StoreDispatch } from '../stores/@reduxjs/store';
import { addLaunch } from '../stores/@reduxjs/slices/launchesSlice';
import { postLaunch } from '../hooks/launches/postLaunch';

type StateProps = API;
type DispatchProps = {
	addLaunch: Function;
};
type Props = StateProps & DispatchProps;

function Launch(props: Props): JSX.Element {
	const submit = React.useCallback(
		async (e) => {
			e.preventDefault();
			const data = new FormData(e.target);
			const date = data.get('launch-day');
			const mission = data.get('mission-name');
			const rocket = data.get('rocket-name');
			const target = data.get('planets-selector');
			if (!date || !mission || !rocket || !target) {
				return;
			}
			const newLaunch: Launch = {
				launchDate: new Date(date.toString()),
				mission: mission.toString(),
				rocket: rocket.toString(),
				destination: target.toString() as Planet['kepoi_name'],
				flightNumber: Math.fround(Math.random() * 3.14159 * 42000),
				upcoming: true,
			};
			postLaunch(newLaunch).then(() => {
				addLaunch(newLaunch);
			});
		},
		[postLaunch]
	);
	const today = new Date().toISOString().split('T')[0];
	return (
		<>
			<Container>
				<Container>
					<p>
						Schedule a mission launch for interstellar travel to one
						of the Kepler Exoplanets.
					</p>
					<p>
						Only confirmed planets matching the following criteria
						are available for the earliest scheduled missions:
					</p>
					<ul>
						<li>Planetary radius &lt; 1.6 times Earth's radius</li>
						<li>
							Effective stellar flux &gt; 0.36 times Earth's value
							and &lt; 1.11 times Earth's value
						</li>
					</ul>
				</Container>
				<Form
					onSubmit={submit}
					style={{
						display: 'inline-grid',
						gridTemplateColumns: 'auto auto',
						gridGap: '10px 20px',
					}}
				>
					<Form.Label htmlFor="launch-day">Launch Date</Form.Label>
					<Form.Control
						type="date"
						id="launch-day"
						name="launch-day"
						min={today}
						max="2040-12-31"
						defaultValue={today}
					/>
					<Form.Label htmlFor="mission-name">Mission Name</Form.Label>
					<Form.Control
						type="text"
						id="mission-name"
						name="mission-name"
					/>
					<Form.Label htmlFor="rocket-name">Rocket Type</Form.Label>
					<Form.Control
						type="text"
						id="rocket-name"
						name="rocket-name"
						defaultValue="Explorer IS1"
					/>
					<Form.Label htmlFor="planets-selector">
						Destination Exoplanet
					</Form.Label>
					<Form.Select id="planets-selector" name="planets-selector">
						{React.useMemo(() => {
							return props.planets?.map((planet) => (
								<option
									value={planet.kepoi_name}
									key={planet.kepoi_name + '_' + planet.kepid}
								>
									{planet.kepler_name
										? planet.kepler_name
										: planet.kepoi_name}
								</option>
							));
						}, [props.planets])}
					</Form.Select>
				</Form>
			</Container>
			<Container>
				<Button type="submit" />
			</Container>
		</>
	);
}
export default connect(
	(store: Store): StateProps => ({
		planets: store.planets.planets,
		launches: store.launches.launches,
	}),
	(dispatch: StoreDispatch): DispatchProps => ({
		addLaunch: (launch: Launch) => dispatch(addLaunch(launch)),
	})
)(Launch);
