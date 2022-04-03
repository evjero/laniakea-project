import express from 'express';
import { planetsRouter } from './planets';
import { launchesRouter } from './launches';

const apiRouter = express.Router();

apiRouter.use(planetsRouter);
apiRouter.use(launchesRouter);

export { apiRouter };
