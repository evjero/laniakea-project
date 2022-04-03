import dotenv from 'dotenv';
import http, { Server } from 'http';
import { loadPlanetsFromDisk } from './utils/loadPlanetsFromDisk';
import backend from './backend';
import CONSOLE_ID from './consoleID';
import { Database } from './db';

dotenv.config();

export const PORT: number = parseInt(process.env.SERVER_PORT ?? '8080') ?? 8080;
const server: Server = http.createServer(backend);

async function start() {
	const planets = await loadPlanetsFromDisk();
	const dbInstance = Database.getInstance();
	dbInstance.planets = planets;
	dbInstance.launches = [];
	console.debug(
		`[${CONSOLE_ID}] Database populated with ${dbInstance.planets.length} planets`
	);

	server.listen(PORT, () => {
		console.debug(`[${CONSOLE_ID}] Ready`);
	});
}

start();
