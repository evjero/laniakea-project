import express from 'express';
import { getAllPlanets } from './getAllPlanets';
import { getHabitablePlanets } from './getHabitablePlanets';

const planetsRouter = express.Router();

planetsRouter.get('/', getAllPlanets);
planetsRouter.get('/?habitable=true', getHabitablePlanets);

export { planetsRouter };
