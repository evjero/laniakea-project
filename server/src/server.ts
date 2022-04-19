import dotenv from 'dotenv';
import http, { Server } from 'http';
import backend from './backend';
import CONSOLE_ID from './consoleID';
import { Database } from './db';
import mongoose from 'mongoose';
import { loadPlanetsFromDisk } from './db/models/planets.model';

dotenv.config();

export const PORT: number = parseInt(process.env.SERVER_PORT ?? '8080') ?? 8080;

const MONGO_URL =
	'mongodb+srv://laniakea:2ZV3ABHxRUE55NO5@laniakeacluster.njuio.mongodb.net/koi?retryWrites=true&w=majority';
const server: Server = http.createServer(backend);

mongoose.connection.once('open', () => {
	console.debug('[MongoDB] Ready');
});
mongoose.connection.on('error', (error: any) => {
	console.debug('[MongoDB] Error: ', error);
});

async function start() {
	await mongoose.connect(MONGO_URL, {});
	await loadPlanetsFromDisk();

	server.listen(PORT, () => {
		console.debug(`[${CONSOLE_ID}] Ready`);
	});
}

start();
