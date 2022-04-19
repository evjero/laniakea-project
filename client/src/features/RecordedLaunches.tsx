import * as React from 'react';
import { Alert, Container, Table } from 'react-bootstrap';
import { API } from '@api/types/API';
import { connect } from 'react-redux';
import { Launch } from '@api/types/Launch';
import { AppDispatch, RootState } from 'stores/@reduxjs/store';
import { abortLaunch } from '../stores/@reduxjs/slices/launchesSlice';

type StateProps = Omit<API, 'planets'>;
type DispatchProps = {
	abortLaunch: (flightNumber: number) => void;
};
type Props = StateProps & DispatchProps;
function RecordedLaunches(props: Props): JSX.Element {
	const previousLaunches = props.launches.filter(
		(launch) => !launch.upcoming
	);
	return (
		<Container>
			<Alert variant="info">
				<Alert.Heading>Historical Launches</Alert.Heading>
				<p>
					History of mission launches including SpaceX launches
					starting from the year 2006.
				</p>
			</Alert>
			{previousLaunches.length == 0 && (
				<Alert variant="warning">
					<Alert.Heading>No data!</Alert.Heading>
					<p>There are no launches in the records list</p>
				</Alert>
			)}
			{previousLaunches.length > 0 && (
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
							return previousLaunches.map((launch: Launch) => {
								return (
									<tr key={String(launch.flightNumber)}>
										<td>
											<span
												style={{
													color: 'red',
												}}
												onClick={() =>
													abortLaunch(
														launch.flightNumber
													)
												}
											>
												✖
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
			)}
		</Container>
	);
}

export default connect(
	(store: RootState): StateProps => ({
		launches: store.launches.launches,
	}),
	(dispatch: AppDispatch): DispatchProps => ({
		abortLaunch: (flightNumber: number) =>
			dispatch(abortLaunch(flightNumber)),
	})
)(RecordedLaunches);
