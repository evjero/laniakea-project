import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './stores/@reduxjs/store';
import AppInitializer from './AppInitializer';
import 'bootstrap/dist/css/bootstrap.min.css';
import './client.scss';
import { ErrorBoundary } from './features/ErrorBoundary';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './features/Home';
import { Launch } from './features/Launch';
import { ScheduledLaunches } from './features/ScheduledLaunches';
import { RecordedLaunches } from './features/RecordedLaunches';
import { NotFound } from './features/NotFound';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

const root = createRoot(rootElement);
//Re-enable StrictMode for deterministic side-effect testing
root.render(
	// <React.StrictMode>
	<ErrorBoundary>
		<Provider store={store}>
			<BrowserRouter>
				<AppInitializer>
					<Routes>
						<Route path="/" element={<Layout />}>
							<Route index element={<Home />} />
							<Route path="launch" element={<Launch />} />
							<Route
								path="schedule"
								element={<ScheduledLaunches />}
							/>
							<Route
								path="records"
								element={<RecordedLaunches />}
							/>
						</Route>
						<Route path="*" element={<NotFound />} />
					</Routes>
				</AppInitializer>
			</BrowserRouter>
		</Provider>
	</ErrorBoundary>
	// </React.StrictMode>
);
