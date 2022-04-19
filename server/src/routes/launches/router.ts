import express from 'express';
import { abortLaunch, getLaunches, postLaunch } from './controller';

const launchesRouter = express.Router();

launchesRouter.get('/launches', getLaunches);
launchesRouter.post('/launches', postLaunch);
launchesRouter.delete('/launches/:id', abortLaunch);

export { launchesRouter };
