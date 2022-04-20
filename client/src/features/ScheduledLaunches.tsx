import * as React from 'react';
import { Alert, Container, Table } from 'react-bootstrap';
import { API } from '@api/types/API';
import { connect } from 'react-redux';
import { Launch } from '@api/types/Launch';
import { AppDispatch, RootState } from 'stores/@reduxjs/store';
import { abortLaunchThunk } from '../stores/@reduxjs/slices/launchesSlice';

type StateProps = Omit<API, 'planets'>;
type DispatchProps = {
	abortLaunch: (flightNumber: number) => void;
};
type Props = StateProps & DispatchProps;
function ScheduledLaunches(props: Props): JSX.Element {
	const { abortLaunch } = props;
	const scheduledLaunches = props.launches.filter(
		(launch) => launch.upcoming
	);

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
			{scheduledLaunches.length == 0 && (
				<Alert variant="warning">
					<Alert.Heading>No data!</Alert.Heading>
					<p>There are no launches on the upcoming schedule</p>
				</Alert>
			)}
			{scheduledLaunches.length > 0 && (
				<Table striped hover borderless size="sm" responsive>
					<thead>
						<tr>
							<th style={{ width: '2rem' }}></th>
							<th style={{ width: '3rem' }}>No.</th>
							<th style={{ width: '9rem' }}>Date</th>
							<th style={{ width: '7rem' }}>Mission</th>
							<th style={{ width: '7rem' }}>Destination</th>
							<th style={{ width: '7rem' }}>Rocket</th>
						</tr>
					</thead>
					<tbody>
						{React.useMemo(() => {
							return scheduledLaunches.map((launch: Launch) => {
								return (
									<tr key={String(launch.flightNumber)}>
										<td>
											<span
												className="abortLaunch"
												onClick={(e) => {
													e.preventDefault();
													abortLaunch(
														launch.flightNumber
													);
												}}
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
										<td
											style={{
												overflow: 'hidden',
												textOverflow: 'ellipsis',
												whiteSpace: 'nowrap',
											}}
										>
											{launch.mission}
										</td>
										<td>{launch.destination}</td>
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
			dispatch(abortLaunchThunk(flightNumber)),
	})
)(ScheduledLaunches);
