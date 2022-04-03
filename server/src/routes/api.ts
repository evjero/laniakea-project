import express from 'express';
import { planetsRouter } from './planets';
import { launchesRouter } from './launches';

const basePath = '/api/v1';
const apiRouter = express.Router();

apiRouter.use(`${basePath}/planets`, planetsRouter);
apiRouter.use(`${basePath}/launches`, launchesRouter);

export { apiRouter };
