import express from 'express';
import { appendFile } from 'fs';
import { planetsRouter } from './routes/planets.router';
import cors from 'cors';
import type { CorsOptions } from 'cors';
import CONSOLE_ID from './consoleID';

const backend = express();

//CORS
type StaticOrigin = boolean | string | RegExp | (boolean | string | RegExp)[];
const corsWhitelist: Array<CorsOptions['origin']> = ['http://localhost:3000'];
backend.use(
	cors({
		origin: function (
			origin: CorsOptions['origin'],
			callback: (
				err: Error | null,
				origin?: StaticOrigin | undefined
			) => void
		) {
			if (corsWhitelist.indexOf(origin) !== -1) {
				callback(null, true);
			} else {
				const err = `[${CONSOLE_ID}] Received request from ${origin} which has not been whitelisted by the server!`;
				console.error(err, origin);
				callback(new Error(err));
			}
		},
	})
);

//Handle JSON requests/responses
backend.use(express.json());

//Routes
backend.use(planetsRouter);

export default backend;
