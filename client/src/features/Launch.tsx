import { Launch } from '@api/types/Launch';
import { API } from '@api/types/API';
import * as React from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { RootState, AppDispatch } from '../stores/@reduxjs/store';
import { addLaunchThunk } from '../stores/@reduxjs/slices/launchesSlice';

type StateProps = API;
type DispatchProps = {
	addLaunch: (launch: Launch) => void;
};
type Props = StateProps & DispatchProps;

function Launch(props: Props): JSX.Element {
	const { addLaunch } = props;
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
			const request: Launch = {
				launchDate: new Date(date.toString()).toDateString(),
				mission: mission.toString(),
				rocket: rocket.toString(),
				destination: target.toString(),
				flightNumber: 0, //determined by server
				upcoming: true,
			};
			addLaunch(request);
		},
		[addLaunch]
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
						<li>
							Planetary radius &lt; 1.6 times Earth&#39;s radius
						</li>
						<li>
							Effective stellar flux &gt; 0.36 times Earth&#39;s
							value and &lt; 1.11 times Earth&#39;s value
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
									value={planet.kepler_name}
									key={planet.kepler_name}
								>
									{planet.kepler_name}
								</option>
							));
						}, [props.planets])}
					</Form.Select>
					<Button type="submit">Submit</Button>
				</Form>
			</Container>
		</>
	);
}
export default connect(
	(store: RootState): StateProps => ({
		planets: store.planets.planets,
		launches: store.launches.launches,
	}),
	(dispatch: AppDispatch): DispatchProps => ({
		addLaunch: (launch: Launch) => dispatch(addLaunchThunk(launch)),
	})
)(Launch);
