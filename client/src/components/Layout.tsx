import * as React from 'react';
import { Outlet } from 'react-router-dom';
import { Footer } from './Footer';
import { Navigation } from './Navigation';

export function Layout(): JSX.Element {
	return (
		<div className="app">
			<Navigation />
			<Footer />
			<Outlet />
		</div>
	);
}
