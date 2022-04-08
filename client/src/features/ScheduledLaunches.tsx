import * as React from 'react';
import { Alert, Container, Table } from 'react-bootstrap';
import { API } from '@api/types/API';
import { connect } from 'react-redux';
import { Launch } from '@api/types/Launch';
import { Store } from 'stores/@reduxjs/store';

type StateProps = Omit<API, 'planets'>;
type Props = StateProps;
function ScheduledLaunches(props: Props): JSX.Element {
	return (
		<Container>
			<Alert variant="info">
				<Alert.Heading>Scheduled Launches</Alert.Heading>
				<p>
					Upcoming missions including both SpaceX launches and newly
					scheduled missions.
				</p>
				<hr />
				<p>
					<b>Warning! Clicking on the ✖ aborts the mission.</b>
				</p>
			</Alert>
			<Table striped hover borderless size="sm" responsive>
				<thead>
					<tr>
						<th style={{ width: '2rem' }}></th>
						<th style={{ width: '3rem' }}>No.</th>
						<th style={{ width: '9rem' }}>Date</th>
						<th>Mission</th>
						<th style={{ width: '7rem' }}>Rocket</th>
					</tr>
				</thead>
				<tbody>
					{React.useMemo(() => {
						return props.launches
							?.filter((launch) => !launch.upcoming)
							.map((launch: Launch) => {
								return (
									<tr key={String(launch.flightNumber)}>
										<td>
											<span
												style={{
													color: launch.success
														? 'greenyellow'
														: 'red',
												}}
											>
												█
											</span>
										</td>
										<td>{launch.flightNumber}</td>
										<td>
											{new Date(
												launch.launchDate
											).toDateString()}
										</td>
										<td>{launch.mission}</td>
										<td>{launch.rocket}</td>
									</tr>
								);
							});
					}, [props.launches])}
				</tbody>
			</Table>
		</Container>
	);
}

export default connect(
	(store: Store): StateProps => ({
		launches: store.launches.launches,
	})
)(ScheduledLaunches);
