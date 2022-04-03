import http, { Server } from 'http';
import { loadPlanetsFromDisk } from './utils/loadPlanetsFromDisk';
import backend from './backend';
import CONSOLE_ID from './consoleID';
import { initializeStore } from './store';

export const PORT: number = process.env.PORT
	? Number.parseInt(process.env.PORT)
	: 8080;

const server: Server = http.createServer(backend);

async function start() {
	const planets = await loadPlanetsFromDisk();
	initializeStore({
		planets,
	});

	server.listen(PORT, () => {
		console.debug(`[${CONSOLE_ID}] Started on ${PORT}...`);
	});
}

start();
