import * as React from 'react';
import { Container, Alert } from 'react-bootstrap';

export function Home(): JSX.Element {
	return (
		<Container>
			<Alert variant="info">
				<Alert.Heading>Welcome</Alert.Heading>
				<p>
					To launch a mission, click the <b>Launch</b> link in the
					navigation bar above. To see past or future launches, click{' '}
					<b>Records</b> or <b>Schedule</b>.
				</p>
			</Alert>
		</Container>
	);
}
