import express from 'express';
import { getLaunches } from './getLaunches';

const launchesRouter = express.Router();

launchesRouter.get('/launches', getLaunches);

export { launchesRouter };
