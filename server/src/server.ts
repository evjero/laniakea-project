import dotenv from 'dotenv';
import http, { Server } from 'http';
import backend from './backend';
import CONSOLE_ID from './consoleID';
import { loadPlanetsFromDisk } from './models/planets.model';
import { mongoConnect } from './services/mongo';

dotenv.config();

export const PORT: number = parseInt(process.env.SERVER_PORT ?? '8080') ?? 8080;

const server: Server = http.createServer(backend);

async function start() {
	await mongoConnect();
	await loadPlanetsFromDisk();

	server.listen(PORT, () => {
		console.debug(`[${CONSOLE_ID}] Ready`);
	});
}

start();
