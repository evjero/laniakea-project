import express from 'express';
import { getAllPlanets } from './getAllPlanets';
import { getHabitablePlanets } from './getHabitablePlanets';

const planetsRouter = express.Router();

planetsRouter.get('/planets', getAllPlanets);
planetsRouter.get('/planets?habitable=true', getHabitablePlanets);

export { planetsRouter };
