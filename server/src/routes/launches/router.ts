import express from 'express';
import { deleteLaunch, getLaunches, postLaunch } from './controller';

const launchesRouter = express.Router();

launchesRouter.get('/launches', getLaunches);
launchesRouter.post('/launches', postLaunch);
launchesRouter.delete('/launches', deleteLaunch);

export { launchesRouter };
