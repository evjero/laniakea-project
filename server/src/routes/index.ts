import express from 'express';
import { planetsRouter } from './planets/router';
import { launchesRouter } from './launches/router';

const rootRouter = express.Router();

rootRouter.use(planetsRouter);
rootRouter.use(launchesRouter);

export { rootRouter };
