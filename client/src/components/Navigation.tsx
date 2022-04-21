import * as React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export function Navigation(): JSX.Element {
	return (
		<Navbar className="nav">
			<Container>
				<Navbar.Brand href="/">
					<img
						alt=""
						src="/favicon.png"
						width="30"
						height="30"
						className="inline-block align-top"
					/>{' '}
					Laniakea Project
				</Navbar.Brand>
				<Navbar.Collapse role="navigation">
					<Nav>
						<Link to="/launch">Launch</Link>
						<Link to="/schedule">Schedule</Link>
						<Link to="/records">Records</Link>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}
