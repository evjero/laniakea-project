import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import type { CorsOptions } from 'cors';
import CONSOLE_ID from './consoleID';
import { apiRouter } from './routes/api';

const backend = express();

//CORS
type StaticOrigin = boolean | string | RegExp | (boolean | string | RegExp)[];
const corsWhitelist: Array<CorsOptions['origin']> = [
	'http://localhost:8080',
	'http://localhost:3000',
];
backend.use(
	cors({
		origin: function (
			origin: CorsOptions['origin'],
			callback: (
				err: Error | null,
				origin?: StaticOrigin | undefined
			) => void
		) {
			if (origin !== undefined) {
				if (corsWhitelist.indexOf(origin) !== -1) {
					callback(null, true);
				} else {
					const err = `[${CONSOLE_ID}] Received request from ${origin} which has not been whitelisted by the server!`;
					console.error(err, origin);
					callback(new Error(err));
				}
			}
		},
	})
);
//Logging only errors
backend.use(
	morgan('combined', {
		skip: (_req, res) => {
			return res.statusCode < 400;
		},
	})
);
//Handle JSON requests/responses
backend.use(express.json());
//Public files
//API Routes
backend.use(apiRouter);

export default backend;
