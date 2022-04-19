import express from 'express';
import { planetsRouter } from './planets/router';
import { launchesRouter } from './launches/router';

const apiRouter = express.Router();

apiRouter.use(planetsRouter);
apiRouter.use(launchesRouter);

export { apiRouter };
