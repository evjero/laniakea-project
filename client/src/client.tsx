import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './stores/@reduxjs/store';
import AppInitializer from './AppInitializer';
import App from './App';
import './client.scss';
import { ErrorBoundary } from './features/ErrorBoundary';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

const root = createRoot(rootElement);
//Re-enable StrictMode for deterministic side-effect testing
root.render(
	// <React.StrictMode>
	<ErrorBoundary>
		<Provider store={store}>
			<AppInitializer>
				<App />
			</AppInitializer>
		</Provider>
	</ErrorBoundary>
	// </React.StrictMode>
);
