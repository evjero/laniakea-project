import * as React from 'react';
import { Alert, Container, Table } from 'react-bootstrap';
import { API } from '@api/types/API';
import { connect } from 'react-redux';
import { Launch } from '@api/types/Launch';
import { RootState } from 'stores/@reduxjs/store';

type StateProps = Omit<API, 'planets'>;
type Props = StateProps;
function RecordedLaunches(props: Props): JSX.Element {
	return (
		<Container>
			<Alert variant="info">
				<Alert.Heading>Historical Launches</Alert.Heading>
				<p>
					History of mission launches including SpaceX launches
					starting from the year 2006.
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
	(store: RootState): StateProps => ({
		launches: store.launches.launches,
	})
)(RecordedLaunches);
