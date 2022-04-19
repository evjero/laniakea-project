import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import type { CorsOptions } from 'cors';
import CONSOLE_ID from './consoleID';
import { rootRouter } from './routes';

const backend = express();

// Add specific headers to add security
backend.use(helmet());

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
//Logging only errors >= 400
backend.use(
	morgan('combined', {
		skip: (_req, res) => {
			return res.statusCode < 400;
		},
	})
);
backend.use(express.json()); //Handle JSON requests/responses
backend.use('/api/v1', rootRouter); //API Routes

export default backend;
