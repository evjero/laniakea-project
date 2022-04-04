import * as React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppLayout from './components/AppLayout';

export function App(): JSX.Element {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<AppLayout />} />
				<Route path="*" element={<p>404</p>} />
			</Routes>
		</BrowserRouter>
	);
}
